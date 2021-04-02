export enum boardRequestStatus {
  REQUEST = 0,
  REQUESTED = 1,
}

export enum toastTypes {
  DEFAULT = 0,
  SUCCESS = 1,
  ERROR = 2,
  INFO = 3,
  WARNING = 4,
}

export enum practiceStatus {
  PENDING = 'Pending',
  REQUESTED = 'Requested',
}

export enum scheduleStatus {
  ACCEPT = 'Accept',
  PENDING = 'Pending',
  SCHEDULE = 'Schedule',
}

export enum upcomingPatientStatus {
  ACCEPT = 'Accept',
  PENDING = 'Pending',
}

export enum availabilityStatus {
  AVAILABLE = 1,
  NOT_AVAILABLE = 2,
  SCHEDULED = 3,
}

export enum datesComparisonStatus {
  NONE = 1,
  EQUAL = 2,
  LESSER = 3,
  GREATER = 4,
}

export enum fromNavTypesForUpcomingAvailability {
  DRAWER = 1,
  SCHEDULE = 2,
}
