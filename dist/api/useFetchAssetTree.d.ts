import { AssetTreeSchema } from '@clearblade/ia-mfe-core';
import { QueryFunctionContext } from 'react-query';
export declare const assetTreeFetcherFn: ({ queryKey: [{ params: { treeId }, },], }: QueryFunctionContext<ReturnType<typeof assetTreeQueryKeys.detail>>) => Promise<{
    DATA: AssetTreeSchema['frontend'] | undefined;
    COUNT: number;
}>;
export declare const assetTreeQueryKeys: {
    detail: (params: {
        treeId?: string;
    }) => readonly [{
        readonly scope: "assetTree";
        readonly params: {
            treeId?: string;
        };
    }];
};
export declare function useFetchAssetTree({ treeId }: {
    treeId?: string;
}): import("react-query").UseQueryResult<{
    DATA: {
        id: string;
        item_id: string;
        tree: {
            rootID: string;
            treeID: string;
            nodes: {
                [x: string]: {
                    id: string;
                    parentID: string;
                    children: string[];
                };
                [x: number]: {
                    id: string;
                    parentID: string;
                    children: string[];
                };
                [x: symbol]: {
                    id: string;
                    parentID: string;
                    children: string[];
                };
            };
        };
    };
    COUNT: number;
}, unknown>;
