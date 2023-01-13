import { Card } from '@mui/material';
import React from 'react';
import { MockAsset } from '../mocks/types';
import WidgetShell from './WidgetShell';

export default function PitLevel({ asset }: { asset: MockAsset }) {
  return <WidgetShell>{asset.label}</WidgetShell>;
}
