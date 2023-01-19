export type MockAsset = {
  id: string;
  label: string;
  type: string;
  tree_id: string;
  custom_data: Record<string, unknown>;
  custom_id_1: string;
  custom_id_2: string;
  latitude: number;
  longitude: number;
  location_x: number;
  location_y: number;
  location_z: number;
};

export type MockAssetType = {
  id: string;
  label: string;
  schema: MockAttrSchema[];
  controls_schema: {
    uuid: string;
    id: string;
    type: string;
    widget_type: string;
    widget_settings: unknown;
  }[];
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
