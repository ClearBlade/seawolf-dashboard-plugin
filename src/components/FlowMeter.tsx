import React from 'react';
import { MockAsset, MockEventBackendWithRuleLabel } from '../mocks/types';
import WidgetShell from './WidgetShell';
import OpenEventIndicator from './OpenEventIndicator';

export default function FlowMeter({
  asset,
  openEvents,
}: {
  asset: MockAsset;
  openEvents?: MockEventBackendWithRuleLabel[];
}) {
  return (
    <WidgetShell
      asset={asset}
      openEvents={openEvents}
      onClickCharts={() => console.log('charts')}
    >
      hi
    </WidgetShell>
  );
}
