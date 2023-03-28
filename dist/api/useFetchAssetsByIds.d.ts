import { types } from '@clearblade/ia-mfe';
import { QueryFunctionContext } from 'react-query';
export declare const assetByIdsFetcherFn: ({ queryKey: [{ params: { ids }, },], }: QueryFunctionContext<ReturnType<typeof assetByIdsQueryKeys.detail>>) => Promise<{
    DATA: undefined | types.Asset['frontend'][];
    COUNT: number;
}>;
export declare const assetByIdsQueryKeys: {
    detail: (params: {
        ids?: string[];
    }) => readonly [{
        readonly scope: "assetsByIds";
        readonly params: {
            ids?: string[];
        };
    }];
};
export declare function useFetchAssetsByIds(ids?: string[]): import("react-query").UseQueryResult<{
    DATA: types.Asset[];
    COUNT: number;
}, unknown>;
