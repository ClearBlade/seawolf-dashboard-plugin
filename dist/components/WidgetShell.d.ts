import React from 'react';
import { EventBackendWithRuleLabel } from '../types';
import { types } from '@clearblade/ia-mfe';
export default function WidgetShell({ children, loading, error, asset, onClickPlots, onClickCharts, openEvents, }: {
    children: React.ReactNode;
    loading?: boolean;
    error?: boolean;
    asset: types.Asset['frontend'];
    onClickPlots: () => void;
    onClickCharts?: () => void;
    openEvents?: EventBackendWithRuleLabel[];
}): JSX.Element;
