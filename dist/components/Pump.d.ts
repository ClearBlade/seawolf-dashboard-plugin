/// <reference types="react" />
import { core } from '@clearblade/ia-mfe-core'
import { EventBackendWithRuleLabel } from '../types';
export default function Pump({ asset, openEvents, }: {
    asset: types.Asset['frontend'];
    openEvents?: EventBackendWithRuleLabel[];
}): JSX.Element;
