/// <reference types="react" />
import { types } from '@clearblade/ia-mfe';
import { EventBackendWithRuleLabel } from '../types';
export default function PitLevel({ asset, openEvents, }: {
    asset: types.Asset['frontend'];
    openEvents?: EventBackendWithRuleLabel[];
}): JSX.Element;
