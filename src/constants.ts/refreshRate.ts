export enum TimeUnitMultiplier {
  // Value is the multiplier needed to multiply a second by
  SECONDS = 1,
  MINUTES = 60,
  HOURS = 3600,
  DAYS = 86400,
  WEEKS = 604800,
  MONTHS = 2592000,
  YEARS = 31104000,
}

export const RefreshRateOptions: {
  count: number;
  units: TimeUnitMultiplier;
}[] = [
  {
    count: 0,
    units: TimeUnitMultiplier.SECONDS,
  },
  {
    count: 5,
    units: TimeUnitMultiplier.SECONDS,
  },
  {
    count: 30,
    units: TimeUnitMultiplier.SECONDS,
  },
  {
    count: 1,
    units: TimeUnitMultiplier.MINUTES,
  },
  {
    count: 5,
    units: TimeUnitMultiplier.MINUTES,
  },
  {
    count: 30,
    units: TimeUnitMultiplier.MINUTES,
  },
  {
    count: 1,
    units: TimeUnitMultiplier.HOURS,
  },
  {
    count: 12,
    units: TimeUnitMultiplier.HOURS,
  },
  {
    count: 1,
    units: TimeUnitMultiplier.DAYS,
  },
];

export const TimeUnitLabels = (abbrev?: boolean) => [
  {
    id: TimeUnitMultiplier.SECONDS,
    plural: abbrev ? 'sec' : 'seconds',
    singular: abbrev ? 'sec' : 'second',
  },
  {
    id: TimeUnitMultiplier.MINUTES,
    plural: abbrev ? 'min' : 'minutes',
    singular: abbrev ? 'min' : 'minute',
  },
  {
    id: TimeUnitMultiplier.HOURS,
    plural: abbrev ? 'h' : 'hours',
    singular: abbrev ? 'h' : 'hour',
  },
  {
    id: TimeUnitMultiplier.DAYS,
    plural: abbrev ? 'd' : 'days',
    singular: abbrev ? 'd' : 'day',
  },
  {
    id: TimeUnitMultiplier.WEEKS,
    plural: abbrev ? 'wk' : 'weeks',
    singular: abbrev ? 'wk' : 'week',
  },
  {
    id: TimeUnitMultiplier.MONTHS,
    plural: abbrev ? 'mo' : 'months',
    singular: abbrev ? 'mo' : 'month',
  },
  {
    id: TimeUnitMultiplier.YEARS,
    plural: abbrev ? 'yr' : 'years',
    singular: abbrev ? 'yr' : 'year',
  },
];
