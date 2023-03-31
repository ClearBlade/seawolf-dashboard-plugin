/// <reference types="react" />
import { EventBackendWithRuleLabel } from '../../types';
import { Asset } from '@clearblade/ia-mfe-core';
export default function Pump({ asset, openEvents, }: {
    asset: Asset['frontend'];
    openEvents?: EventBackendWithRuleLabel[];
}): JSX.Element;
