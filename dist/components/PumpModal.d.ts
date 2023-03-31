/// <reference types="react" />
import { core } from '@clearblade/ia-mfe-core'
export default function PumpModal({ open, onClose, asset, assetType, }: {
    open: boolean;
    onClose: () => void;
    asset: types.Asset['frontend'];
    assetType?: types.AssetType['frontend'];
}): JSX.Element;
