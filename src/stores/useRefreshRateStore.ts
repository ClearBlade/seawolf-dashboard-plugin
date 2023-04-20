import create from 'zustand';
import { TimeUnitMultiplier } from '../constants.ts/refreshRate';

export interface RefreshRateSlice {
  refreshRate?: number;
  setRefreshRate: (refreshRate: number) => void;
  lastFetchTime?: Date;
  setLastFetchTime: (lastFetchTime: Date) => void;
}

const useRefreshRateStore = create<RefreshRateSlice>((set) => ({
  refreshRate: TimeUnitMultiplier.SECONDS * 5,
  setRefreshRate: (refreshRate) => {
    set({ refreshRate });
  },
  lastFetchTime: undefined,
  setLastFetchTime: (lastFetchTime) => {
    set({ lastFetchTime });
  },
}));

export default useRefreshRateStore;
