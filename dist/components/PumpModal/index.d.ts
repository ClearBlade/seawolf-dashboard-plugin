/// <reference types="react" />
import { Asset, AssetType } from '@clearblade/ia-mfe-core';
export default function PumpModal({ open, onClose, asset, assetType, }: {
    open: boolean;
    onClose: () => void;
    asset: Asset['frontend'];
    assetType?: AssetType['frontend'];
}): JSX.Element;
