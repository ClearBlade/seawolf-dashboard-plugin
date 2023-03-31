import {
  Asset,
  createFrontendAssetsQuery,
  fetchAssets,
} from '@clearblade/ia-mfe-core';
import { useEffect } from 'react';
import { QueryFunctionContext, useQuery, useQueryClient } from 'react-query';
import useRefreshRateStore from '../stores/useRefreshRateStore';

export const assetByIdsFetcherFn = ({
  queryKey: [
    {
      params: { ids },
    },
  ],
}: QueryFunctionContext<
  ReturnType<typeof assetByIdsQueryKeys.detail>
>): Promise<{
  DATA: undefined | Asset['frontend'][];
  COUNT: number;
}> => {
  if (!ids || !ids.length) {
    return new Promise(() => ({
      DATA: [],
      COUNT: 0,
    }));
  }
  const query = createFrontendAssetsQuery({
    Filters: [
      [{ type: 'default', operator: 'IN', field: 'id', value: ids ?? [] }],
    ],
    // I wanted to order the array by the order of the "IN" values, but all solutions either involve editing how the query is built within createFrontendAssetsQuery. Even passing multiple values within the Order array doesn't work because currently assetsV2.read is only using Order[0]
    //https://stackoverflow.com/questions/866465/order-by-the-in-value-list
  });
  return fetchAssets(new AbortController(), { query });
};

export const assetByIdsQueryKeys = {
  detail: (params: { ids?: string[] }) =>
    [{ scope: 'assetsByIds', params }] as const,
};

export function useFetchAssetsByIds(ids?: string[]) {
  const queryclient = useQueryClient();
  const refreshRate = useRefreshRateStore((state) => state.refreshRate);

  useEffect(() => {
    if (!ids) {
      queryclient.setQueryData(assetByIdsQueryKeys.detail({ ids }), {
        DATA: [],
        COUNT: 0,
      });
    }
  }, [ids, queryclient]);

  return useQuery(assetByIdsQueryKeys.detail({ ids }), assetByIdsFetcherFn, {
    refetchOnMount: false,
    keepPreviousData: true,
    refetchInterval: refreshRate ? convertSecondsToMS(refreshRate) : false,
    refetchIntervalInBackground: false,
  });
}

const convertSecondsToMS = (seconds: number) => seconds * 1000;
