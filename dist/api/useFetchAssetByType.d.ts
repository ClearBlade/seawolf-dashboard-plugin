import { types } from '@clearblade/ia-mfe';
import { QueryFunctionContext } from 'react-query';
export declare const assetByTypeFetcherFn: ({ queryKey: [{ params: { type }, },], }: QueryFunctionContext<ReturnType<typeof assetByTypeQueryKeys.detail>>) => Promise<{
    DATA: undefined | types.Asset['frontend'][];
    COUNT: number;
}>;
export declare const assetByTypeQueryKeys: {
    detail: (params: {
        type?: string;
    }) => readonly [{
        readonly scope: "assetByType";
        readonly params: {
            type?: string;
        };
    }];
};
export declare function useFetchAssetByType(type?: string): import("react-query").UseQueryResult<{
    DATA: rt.Static<Thing["frontend"]>[];
    COUNT: number;
}, unknown>;
