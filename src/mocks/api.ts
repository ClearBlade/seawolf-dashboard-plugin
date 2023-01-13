import { MockAsset } from './types';

export const useClients = (): { data: MockAsset[] } => {
  // Will need to fetch all assets with type of "client"
  return {
    data: [
      { id: 'client1', label: 'Client 1', type: 'client' },
      { id: 'client2', label: 'Client 2', type: 'client' },
    ],
  };
};

export const useChildrenAssets = (parent: MockAsset): { data: MockAsset[] } => {
  // Look at "children" list within parent
  // Fetch all assets from that list in the order of that list
  return {
    data: [
      { id: 'fakepump', label: 'Fake Pump', type: 'pump' },
      { id: 'fakelevel', label: 'Fake Level', type: 'level' },
      { id: 'fakeflow', label: 'Fake Flow', type: 'flow' },
    ],
  };
};
