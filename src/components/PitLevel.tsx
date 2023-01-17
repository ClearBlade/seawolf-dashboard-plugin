import { Card } from '@material-ui/core';
import React from 'react';
import { MockAsset } from '../mocks/types';
import WidgetShell from './WidgetShell';

export default function PitLevel({ asset }: { asset: MockAsset }) {
  console.log('pit asset', asset);
  return <WidgetShell>{asset.label}</WidgetShell>;
}
