import { Grid } from '@mui/material';
import React from 'react';
import { useChildrenAssets } from '../mocks/api';
import { MockAsset } from '../mocks/types';
import FlowMeter from './FlowMeter';
import PitLevel from './PitLevel';
import Pump from './Pump';
import WidgetShell from './WidgetShell';

export default function Widgets({ parent }: { parent?: MockAsset }) {
  const { data } = useChildrenAssets(parent);

  if (!parent) return <div>loading parents or no parents</div>;

  return (
    <Grid container spacing={2}>
      {data.map((childAsset) => {
        if (childAsset.type === 'pump') {
          return <Pump asset={childAsset} />;
        } else if (childAsset.type === 'flow') {
          return <FlowMeter asset={childAsset} />;
        }
        return <PitLevel asset={childAsset} />;
      })}
    </Grid>
  );
}
