// @ts-ignore
import * as utils from 'microfrontendUtils';
import { Grid } from '@material-ui/core';
import React from 'react';
import { useFetchAssetByIds } from '../api/useFetchAssetByIds';
import { MockAsset, MockEventBackendWithRuleLabel } from '../mocks/types';
import FlowMeter from './FlowMeter';
import PitLevel from './PitLevel';
import Pump from './Pump';
import { useFetchAssetTree } from '../api/useFetchAssetTree';

export default function Widgets({ parent }: { parent?: MockAsset }) {
  const { data: selectedTree, isLoading: loadingSelectedTree } =
    useFetchAssetTree({
      treeId: parent?.tree_id,
    });
  const children = selectedTree?.DATA?.tree?.nodes[parent.id]?.children ?? [];

  const { data } = useFetchAssetByIds(children);
  const [openEvents, setOpenEvents] = React.useState<
    Record<string, MockEventBackendWithRuleLabel[]>
  >({});

  const {
    fetchData: fetchEventsData,
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
        events.DATA.reduce<Record<string, MockEventBackendWithRuleLabel[]>>(
          (acc, event) => {
            const eventAssets = utils.tryParse(event.assets, {});
            Object.keys(eventAssets).forEach((assetId) => {
              acc[assetId] !== undefined
                ? acc[assetId].push(event)
                : (acc[assetId] = [event]);
            });
            return acc;
          },
          {}
        )
      );
    }
  }, [events]);

  if (!parent || loadingSelectedTree) return <div>loading or error state</div>;
  return (
    <Grid container spacing={2}>
      {data?.DATA?.map((childAsset) => {
        const openEventsOnAsset = openEvents[childAsset.id];
        if (childAsset.type === 'pump' || childAsset.type === 'electricPump') {
          return <Pump asset={childAsset} openEvents={openEventsOnAsset} />;
        } else if (childAsset.type === 'flowMeter') {
          return (
            <FlowMeter asset={childAsset} openEvents={openEventsOnAsset} />
          );
        }
        return <PitLevel asset={childAsset} openEvents={openEventsOnAsset} />;
      })}
    </Grid>
  );
}
