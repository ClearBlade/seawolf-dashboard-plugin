// @ts-ignore
import * as utils from '@ia/mfe';
import { useEffect } from 'react';
// @ts-ignore
import { QueryFunctionContext, useQuery, useQueryClient } from 'react-query';
import { MockAsset } from '../mocks/types';

export const assetByTypeFetcherFn = ({
  queryKey: [
    {
      params: { type },
    },
  ],
}: QueryFunctionContext<
  ReturnType<typeof assetByTypeQueryKeys.detail>
>): Promise<{
  DATA: undefined | MockAsset[];
  COUNT: number;
}> => {
  if (!type) {
    return new Promise(() => ({
      DATA: undefined,
      COUNT: 0,
    }));
  }
  const query = utils.createFrontendAssetsQuery({
    Filters: [
      [{ type: 'default', operator: '=', field: 'type', value: type ?? '' }],
    ],
  });
  return utils.fetchAssets(new AbortController(), { query });
};

export const assetByTypeQueryKeys = {
  detail: (params: { type?: string }) =>
    [{ scope: 'assetByType', params }] as const,
};

export function useFetchAssetByType(type?: string) {
  const queryclient = useQueryClient();

  useEffect(() => {
    if (!type) {
      queryclient.setQueryData(assetByTypeQueryKeys.detail({ type }), {
        DATA: undefined,
        COUNT: 0,
      });
    }
  }, [type, queryclient]);

  return useQuery(assetByTypeQueryKeys.detail({ type }), assetByTypeFetcherFn, {
    refetchOnMount: false,
    keepPreviousData: true,
  });
}
