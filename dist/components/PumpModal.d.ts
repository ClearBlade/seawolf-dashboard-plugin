/// <reference types="react" />
import { types } from '@clearblade/ia-mfe';
export default function PumpModal({ open, onClose, asset, assetType, }: {
    open: boolean;
    onClose: () => void;
    asset: types.Asset['frontend'];
    assetType?: types.AssetType['frontend'];
}): JSX.Element;
