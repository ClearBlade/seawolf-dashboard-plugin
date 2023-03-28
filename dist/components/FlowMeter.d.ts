/// <reference types="react" />
import { types } from '@clearblade/ia-mfe';
import { EventBackendWithRuleLabel } from '../types/index';
export default function FlowMeter({ asset, openEvents, }: {
    asset: types.Asset['frontend'];
    openEvents?: EventBackendWithRuleLabel[];
}): JSX.Element;
