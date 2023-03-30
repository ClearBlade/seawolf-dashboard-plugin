import { types } from '@clearblade/ia-mfe';
import { QueryFunctionContext } from 'react-query';
export declare const assetTreeFetcherFn: ({ queryKey: [{ params: { treeId }, },], }: QueryFunctionContext<ReturnType<typeof assetTreeQueryKeys.detail>>) => Promise<{
    DATA: types.AssetTreeSchema['frontend'] | undefined;
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
        tree: {
            rootID: string;
            treeID: string;
            nodes: {
                [x: string]: {
                    id: string;
                    children: string[];
                    parentID: string;
                };
                [x: number]: {
                    id: string;
                    children: string[];
                    parentID: string;
                };
                [x: symbol]: {
                    id: string;
                    children: string[];
                    parentID: string;
                };
            };
        };
        item_id: string;
    };
    COUNT: number;
}, unknown>;
