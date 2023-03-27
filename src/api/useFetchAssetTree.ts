import { utils, types } from '@clearblade/ia-mfe';
import { QueryFunctionContext, useQuery } from 'react-query';

export const assetTreeFetcherFn = ({
  queryKey: [
    {
      params: { treeId },
    },
  ],
}: QueryFunctionContext<
  ReturnType<typeof assetTreeQueryKeys.detail>
>): Promise<{
  DATA: types.AssetTreeSchema['frontend'] | undefined;
  COUNT: number;
}> => {
  if (treeId && treeId.length > 0) {
    return utils
      .fetchAssetTrees(new AbortController(), {
        query: utils
          .createPlatformQuery()
          .setPage(1000, 1)
          .equalTo('id', treeId),
      })
      .then((resp) => ({
        DATA: resp.DATA[0],
        COUNT: resp.COUNT,
      }));
  }
  return new Promise(() => ({
    COUNT: 0,
    DATA: undefined,
  }));
};

export const assetTreeQueryKeys = {
  detail: (params: { treeId?: string }) =>
    [{ scope: 'assetTree', params }] as const,
};

export function useFetchAssetTree({ treeId }: { treeId?: string }) {
  return useQuery(assetTreeQueryKeys.detail({ treeId }), assetTreeFetcherFn, {
    refetchOnMount: false,
    keepPreviousData: true,
  });
}
