import { enumUtils } from '../utils';

export interface UpcomingPatientListFullfillmentMetricsProps {
  title?: string | null;
  pk?: number | null;
}

export interface UpcomingPatientListFullfillmentProps {
  title?: string | null;
  pk?: number | null;
  metrics?: UpcomingPatientListFullfillmentMetricsProps[] | [] | null;
}

export interface UpcomingPatientListPatientPersonalProfileProps {
  dob?: any | null;
  address_1?: string | null;
  address_2?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  post_code?: string | null;
  latitude?: any | null;
  longitude?: any | null;
  sex?: string | '' | null;
}

export interface UpcomingPatientListPatientProps {
  first_name?: string | null;
  last_name?: string | null;
  personalprofile?: UpcomingPatientListPatientPersonalProfileProps | null;
}

export interface UpcomingPatientListPracticeProfileProps {
  email?: string | null;
  image?: string | '' | null;
  phone?: string | '' | null;
  address_1?: string | '' | null;
  address_2?: string | '' | null;
  city?: string | '' | null;
  state?: string | '' | null;
  country?: string | '' | null;
  post_code?: string | '' | null;
  latitude?: string | '' | null;
  longitude?: string | '' | null;
  travel_distance?: number | null;
  allowed_list_publicly?: boolean | null;
  url?: string | '' | null;
  tag_line?: string | '' | null;
}

export interface UpcomingPatientListPracticeProps {
  name?: string | null;
  profile?: UpcomingPatientListPracticeProfileProps | null;
}

export interface UpcomingPatientListTimeSlotProps {
  slot?: string | null;
  date?: string | null;
}

export interface UpcomingPatientListResultsProps {
  pk?: number | null;
  worker?: any | null;
  patient?: UpcomingPatientListPatientProps | null;
  practice?: UpcomingPatientListPracticeProps | null;
  date_from?: any | null;
  date_to?: any | null;
  description?: string | null;
  fullfillments?: UpcomingPatientListFullfillmentProps[] | null;
  status?: enumUtils.upcomingPatientStatus | null;
  timeslot?: UpcomingPatientListTimeSlotProps | null;
}

export interface UpcomingPatientListProps {
  count?: number | null;
  next?: any | null;
  previous?: any | null;
  results?: UpcomingPatientListResultsProps[] | [] | null;
}

export interface UpcomingPatientSectionedListResultProps {
  title: string;
  data: UpcomingPatientListResultsProps[] | [];
}
