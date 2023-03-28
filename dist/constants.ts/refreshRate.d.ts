export declare enum TimeUnitMultiplier {
    SECONDS = 1,
    MINUTES = 60,
    HOURS = 3600,
    DAYS = 86400,
    WEEKS = 604800,
    MONTHS = 2592000,
    YEARS = 31104000
}
export declare const RefreshRateOptions: {
    count: number;
    units: TimeUnitMultiplier;
}[];
export declare const TimeUnitLabels: (abbrev?: boolean) => {
    id: TimeUnitMultiplier;
    plural: string;
    singular: string;
}[];
