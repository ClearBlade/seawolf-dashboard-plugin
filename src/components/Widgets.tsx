import { Asset, eventUpdater, tryParse } from '@clearblade/ia-mfe-core';
import {
  useDbAndLiveDataForEvents,
  useOpenEventsForAssets,
} from '@clearblade/ia-mfe-react';
import { Grid, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useFetchAssetsByIds } from '../api/useFetchAssetsByIds';
import { useFetchAssetTree } from '../api/useFetchAssetTree';
import {
  DieselPumpTypeId,
  ElectricPumpTypeId,
  FlowMeterTypeId,
} from '../constants.ts/typeNames';
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

export default function Widgets({ parent }: { parent?: Asset['frontend'] }) {
  const classes = useWidgetsStyles();
  const {
    data: selectedTree,
    isLoading: loadingSelectedTree,
    error: errorSelectedTree,
  } = useFetchAssetTree({
    treeId: parent?.tree_id,
  });

  const childrenIds =
    selectedTree?.DATA?.tree?.nodes?.[parent?.id]?.children ?? [];

  const {
    data: childAssets,
    isLoading: loadingChildAssets,
    error: errorChildAssets,
  } = useFetchAssetsByIds(childrenIds);
  const [openEvents, setOpenEvents] = React.useState<
    Record<string, EventBackendWithRuleLabel[]>
  >({});

  // See comment within useFetchAssetsByIds about why this sort occurs on the client side right now in order to maintain the same order for assets that would show in the asset tree on the asset details
  const sortedChildAssets = childAssets?.DATA?.sort(
    (assetA, assetB) =>
      childrenIds.indexOf(assetA.id) - childrenIds.indexOf(assetB.id)
  );

  const {
    data: events,
    error: eventsError,
    loading: eventsLoading,
  } = useDbAndLiveDataForEvents(
    () => useOpenEventsForAssets(),
    [
      {
        topics: [
          '_dbupdate/_monitor/_events',
          `_dbupdate/_monitor/_events/_platform`,
        ],
        updater: eventUpdater,
      },
    ]
  );

  React.useEffect(() => {
    if (events) {
      setOpenEvents(
        events.DATA.reduce((acc, event) => {
          const eventAssets = tryParse(event.assets, {});
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
          <RefreshRateSetting assetIds={childrenIds} />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        {sortedChildAssets?.map((childAsset) => {
          const openEventsOnAsset = openEvents[childAsset.id];
          if (
            childAsset.type === DieselPumpTypeId ||
            childAsset.type === ElectricPumpTypeId
          ) {
            return <Pump asset={childAsset} openEvents={openEventsOnAsset} />;
          } else if (childAsset.type === FlowMeterTypeId) {
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
