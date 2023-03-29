import React from 'react';
import { EventBackendWithRuleLabel } from '../types';
import { types } from '@clearblade/ia-mfe';
export default function WidgetShell({ children, loading, error, asset, onClickCharts, openEvents, overrideIcon, }: {
    children: React.ReactNode;
    loading?: boolean;
    error?: boolean;
    asset: types.Asset['frontend'];
    onClickCharts: () => void;
    openEvents?: EventBackendWithRuleLabel[];
    overrideIcon?: JSX.Element;
}): JSX.Element;
