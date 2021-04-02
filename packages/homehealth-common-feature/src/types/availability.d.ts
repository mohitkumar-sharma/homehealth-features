import { enumUtils } from '../utils';

// Common Availability

export interface CommonAvailabilitySlotsProps {
  time?: string;
  slot?: string;
  appointment?: enumUtils.availabilityStatus;
}

export interface CommonAvailabilityProps {
  date?: string;
  weekday?: string;
  slots?: CommonAvailabilitySlotsProps[] | [];
}

// General Availability

export interface GeneralAvailabilitySlotsProps {
  slot?: string;
  weekday?: string;
}

export interface GeneralAvailabilityProps {
  dt_slots?: GeneralAvailabilitySlotsProps[] | [];
}

// Upcoming Availability

export interface UpcomingAvailabilitySlotsProps {
  time?: string;
  isAppointment?: enumUtils.availabilityStatus;
}

export interface UpcomingAvailabilityResultProps {
  date?: string;
  slots?: UpcomingAvailabilitySlotsProps[] | [];
}

export interface UpcomingAvailabilityProps {
  count?: number | null;
  next?: any | null;
  previous?: any | null;
  results?: UpcomingAvailabilityResultProps[] | [] | null;
}
