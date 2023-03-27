import { types, utils } from '@clearblade/ia-mfe';
import { Grid, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useFetchAssetsByIds } from '../api/useFetchAssetsByIds';
import { useFetchAssetTree } from '../api/useFetchAssetTree';
import { EventBackendWithRuleLabel } from '../types';
import FlowMeter from './FlowMeter';
import PitLevel from './PitLevel';
import Pump from './Pump';
import RefreshRateSetting from './RefreshRateSetting';

const useWidgetsStyles = makeStyles((theme) => ({
  widgetContainer: {
    padding: theme.spacing(2),
  },
}));

export default function Widgets({
  parent,
}: {
  parent?: types.Asset['frontend'];
}) {
  const classes = useWidgetsStyles();
  const {
    data: selectedTree,
    isLoading: loadingSelectedTree,
    error: errorSelectedTree,
  } = useFetchAssetTree({
    treeId: parent?.tree_id,
  });
  const children = selectedTree?.DATA?.tree?.nodes[parent.id]?.children ?? [];

  const {
    data: childAssets,
    isLoading: loadingChildAssets,
    error: errorChildAssets,
  } = useFetchAssetsByIds(children);
  const [openEvents, setOpenEvents] = React.useState<
    Record<string, EventBackendWithRuleLabel[]>
  >({});

  const {
    data: events,
    error: eventsError,
    loading: eventsLoading,
  } = utils.useDbAndLiveDataForEvents(
    () => utils.useOpenEventsForAssets(),
    [
      {
        topics: [
          '_dbupdate/_monitor/_events',
          `_dbupdate/_monitor/_events/_platform`,
        ],
        updater: utils.eventUpdater,
      },
    ]
  );

  React.useEffect(() => {
    if (events) {
      setOpenEvents(
        events.DATA.reduce((acc, event) => {
          const eventAssets = utils.tryParse(event.assets, {});
          Object.keys(eventAssets).forEach((assetId) => {
            acc[assetId] !== undefined
              ? acc[assetId].push(event)
              : (acc[assetId] = [event]);
          });
          return acc;
        }, {})
      );
    }
  }, [events]);

  if (loadingSelectedTree || eventsLoading || loadingChildAssets)
    return <Skeleton />;
  if (!parent || eventsError || errorSelectedTree || errorChildAssets)
    return <div>Error</div>;
  return (
    <Grid
      container
      spacing={2}
      direction='column'
      className={classes.widgetContainer}
    >
      <Grid item container justifyContent='flex-end' alignItems='center'>
        <Grid item>
          <RefreshRateSetting assetIds={children} />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        {childAssets?.DATA?.map((childAsset) => {
          const openEventsOnAsset = openEvents[childAsset.id];
          if (
            childAsset.type === 'pump' ||
            childAsset.type === 'electricPump'
          ) {
            return <Pump asset={childAsset} openEvents={openEventsOnAsset} />;
          } else if (childAsset.type === 'flowMeter') {
            return (
              <FlowMeter asset={childAsset} openEvents={openEventsOnAsset} />
            );
          }
          return <PitLevel asset={childAsset} openEvents={openEventsOnAsset} />;
        })}
      </Grid>
    </Grid>
  );
}
