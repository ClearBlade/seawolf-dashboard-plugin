// @ts-ignore
import * as utils from 'microfrontendUtils';
import { useEffect } from 'react';
import { QueryFunctionContext, useQuery, useQueryClient } from 'react-query';
import shallow from 'zustand/shallow';
import { MockAsset } from '../mocks/types';
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
  DATA: undefined | MockAsset[];
  COUNT: number;
}> => {
  if (!ids || !ids.length) {
    return new Promise(() => ({
      DATA: [],
      COUNT: 0,
    }));
  }
  const query = utils.createFrontendAssetsQuery({
    Filters: [
      [{ type: 'default', operator: 'IN', field: 'id', value: ids ?? [] }],
    ],
  });
  return utils.fetchAssets(new AbortController(), { query });
};

export const assetByIdsQueryKeys = {
  detail: (params: { ids?: string[] }) =>
    [{ scope: 'assetsByIds', params }] as const,
};

export function useFetchAssetsByIds(ids?: string[]) {
  const queryclient = useQueryClient();
  const [refreshRate, setLastFetchTime] = useRefreshRateStore(
    (state) => [state.refreshRate, state.setLastFetchTime],
    shallow
  );

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
