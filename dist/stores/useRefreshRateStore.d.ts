export interface RefreshRateSlice {
    refreshRate?: number;
    setRefreshRate: (refreshRate: number) => void;
    lastFetchTime?: Date;
    setLastFetchTime: (lastFetchTime: Date) => void;
}
declare const useRefreshRateStore: import("zustand").UseBoundStore<import("zustand").StoreApi<RefreshRateSlice>>;
export default useRefreshRateStore;
