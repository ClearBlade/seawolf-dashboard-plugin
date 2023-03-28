/// <reference types="react" />
import { TimeUnitMultiplier } from '../constants.ts/refreshRate';
export default function RefreshRateSetting({ assetIds, }: {
    assetIds: string[];
}): JSX.Element;
export declare const getLabelForRefreshRate: (rate: {
    count: number;
    units: TimeUnitMultiplier;
}, abbrev?: boolean) => string;
