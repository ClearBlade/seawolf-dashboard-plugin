import React from 'react';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import { MockAsset, MockEventBackendWithRuleLabel } from '../mocks/types';
import WidgetShell from './WidgetShell';

export default function PitLevel({
  asset,
  openEvents,
}: {
  asset: MockAsset;
  openEvents?: MockEventBackendWithRuleLabel[];
}) {
  return (
    <WidgetShell>
      {asset.label} {openEvents.length > 0 && <NotificationImportantIcon />}
    </WidgetShell>
  );
}
