import { Card } from '@mui/material';
import React from 'react';
import { MockAsset } from '../mocks/types';
import WidgetShell from './WidgetShell';

export default function Pump({ asset }: { asset: MockAsset }) {
  return <WidgetShell>{asset.label}</WidgetShell>;
}
