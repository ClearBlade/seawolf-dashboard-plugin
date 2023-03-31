/// <reference types="react" />
import { Asset } from '@clearblade/ia-mfe-core';
import { EventBackendWithRuleLabel } from '../types';
export default function PitLevel({ asset, openEvents, }: {
    asset: Asset['frontend'];
    openEvents?: EventBackendWithRuleLabel[];
}): JSX.Element;
