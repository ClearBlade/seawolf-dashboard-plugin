/// <reference types="react" />
import { types } from '@clearblade/ia-mfe';
import { EventBackendWithRuleLabel } from '../../types';
export default function Pump({ asset, openEvents, }: {
    asset: types.Asset['frontend'];
    openEvents?: EventBackendWithRuleLabel[];
}): JSX.Element;
