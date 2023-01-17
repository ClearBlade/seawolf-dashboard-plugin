// @ts-ignore
import * as utils from 'microfrontendUtils';
import { useEffect } from 'react';
import { QueryFunctionContext, useQuery, useQueryClient } from 'react-query';
import { MockAsset } from '../mocks/types';

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
    [{ scope: 'assetByIds', params }] as const,
};

export function useFetchAssetByIds(ids?: string[]) {
  const queryclient = useQueryClient();

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
  });
}
