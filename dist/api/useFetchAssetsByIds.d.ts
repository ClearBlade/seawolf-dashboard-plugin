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
    DATA: {
        description: string;
        type: string;
        id: string;
        label: string;
        image: string;
        parent: string;
        item_id: string;
        owners: string[];
        latitude: number;
        longitude: number;
        last_updated: string;
        location_updated: string;
        custom_data: {
            [x: string]: string | number | boolean;
            [x: number]: string | number | boolean;
            [x: symbol]: string | number | boolean;
        };
        attributes_last_updated: {
            [x: string]: string;
            [x: number]: string;
            [x: symbol]: string;
        };
        location_x: number;
        location_y: number;
        location_z: number;
        location_type: string;
        location_unit: string;
        custom_id_1: string;
        custom_id_2: string;
        last_location_updated: string;
        group_id: string;
        tree_id: string;
        is_root: boolean;
    }[];
    COUNT: number;
}, unknown>;
