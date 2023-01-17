export type MockAsset = {
  id: string;
  label: string;
  type: string;
  tree_id: string;
  custom_data: Record<string, unknown>;
};

export type MockAssetWithChildre = MockAsset & { children: string[] };

export type MockAssetTreeParsed = {
  item_id: string;
  id: string;
  tree: MockAssetTreeFrontend;
};

export interface MockAssetTreeFrontend {
  nodes: Record<string, { children: string[] }>;
}

export type MockEventBackendWithRuleLabel = MockEventBackend & {
  rule_label: string;
};

type MockEventBackend = {
  assets: string[];
};
