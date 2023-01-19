import create from 'zustand';

export interface RefreshRateSlice {
  refreshRate?: number;
  setRefreshRate: (refreshRate: number) => void;
  lastFetchTime?: Date;
  setLastFetchTime: (lastFetchTime: Date) => void;
}

const useRefreshRateStore = create<RefreshRateSlice>((set) => ({
  refreshRate: undefined,
  setRefreshRate: (refreshRate) => {
    set({ refreshRate });
  },
  lastFetchTime: undefined,
  setLastFetchTime: (lastFetchTime) => {
    set({ lastFetchTime });
  },
}));

export default useRefreshRateStore;
