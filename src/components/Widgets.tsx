import { Grid } from '@material-ui/core';
import React from 'react';
import { useFetchAssetByIds } from '../api/useFetchAssetByIds';
import { MockAsset } from '../mocks/types';
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

  if (!parent || loadingSelectedTree) return <div>loading or error state</div>;

  return (
    <Grid container spacing={2}>
      {data?.DATA?.map((childAsset) => {
        if (childAsset.type === 'pump' || childAsset.type === 'electricPump') {
          return <Pump asset={childAsset} />;
        } else if (childAsset.type === 'flow') {
          return <FlowMeter asset={childAsset} />;
        }
        return <PitLevel asset={childAsset} />;
      })}
    </Grid>
  );
}
