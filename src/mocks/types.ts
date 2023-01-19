export type MockAsset = {
  id: string;
  label: string;
  type: string;
  tree_id: string;
  custom_data: Record<string, unknown>;
};

export type MockAssetType = {
  id: string;
  label: string;
  schema: MockAttrSchema[];
};

type MockAttrSchema = {
  attribute_name: string;
  attribute_label?: string;
  custom_view_settings?: { units?: string };
  hide_attribute: boolean;
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
