import {
  createFrontendAssetsQuery,
  fetchAssets,
  Asset,
} from "@clearblade/ia-mfe-core";
import { useEffect } from "react";
import { QueryFunctionContext, useQuery, useQueryClient } from "react-query";

export const assetByTypeFetcherFn = ({
  queryKey: [
    {
      params: { type },
    },
  ],
}: QueryFunctionContext<
  ReturnType<typeof assetByTypeQueryKeys.detail>
>): Promise<{
  DATA: undefined | Asset["frontend"][];
  COUNT: number;
}> => {
  if (!type) {
    return new Promise(() => ({
      DATA: undefined,
      COUNT: 0,
    }));
  }
  const query = createFrontendAssetsQuery({
    filters: {
      types: type ? [type] : [],
    },
  });
  return fetchAssets(new AbortController(), query);
};

export const assetByTypeQueryKeys = {
  detail: (params: { type?: string }) =>
    [{ scope: "assetByType", params }] as const,
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
