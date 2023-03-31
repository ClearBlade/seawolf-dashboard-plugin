import React from 'react';
import { EventBackendWithRuleLabel } from '../types';
import { Asset } from '@clearblade/ia-mfe-core';
export default function WidgetShell({ children, loading, error, asset, onClickPlots, onClickCharts, openEvents, }: {
    children: React.ReactNode;
    loading?: boolean;
    error?: boolean;
    asset: Asset['frontend'];
    onClickPlots: () => void;
    onClickCharts?: () => void;
    openEvents?: EventBackendWithRuleLabel[];
}): JSX.Element;
