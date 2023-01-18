import React from 'react';
import { MockAsset, MockEventBackendWithRuleLabel } from '../mocks/types';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import WidgetShell from './WidgetShell';

export default function FlowMeter({
  asset,
  openEvents,
}: {
  asset: MockAsset;
  openEvents?: MockEventBackendWithRuleLabel[];
}) {
  return (
    <WidgetShell>
      {asset.label}
      {openEvents.length > 0 && <NotificationImportantIcon />}
    </WidgetShell>
  );
}
