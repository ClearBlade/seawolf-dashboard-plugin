/// <reference types="react" />
import { Asset } from '@clearblade/ia-mfe-core';
import { EventBackendWithRuleLabel } from '../types/index';
export default function FlowMeter({ asset, openEvents, }: {
    asset: Asset['frontend'];
    openEvents?: EventBackendWithRuleLabel[];
}): JSX.Element;
