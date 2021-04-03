import { enumUtils } from '../../utils';

export interface ScheduleListFullfillmentMetricsProps {
  title?: string | null;
  pk?: number | null;
}

export interface ScheduleListFullfillmentProps {
  title?: string | null;
  pk?: number | null;
  metrics?: ScheduleListFullfillmentMetricsProps[] | [] | null;
}

export interface ScheduleListPatientPersonalProfileProps {
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

export interface ScheduleListPatientProps {
  first_name?: string | null;
  last_name?: string | null;
  personalprofile?: ScheduleListPatientPersonalProfileProps | null;
}

export interface ScheduleListPracticeProfileProps {
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

export interface ScheduleListPracticeProps {
  name?: string | null;
  profile?: ScheduleListPracticeProfileProps | null;
}

export interface ScheduleListResultsProps {
  pk?: number | null;
  worker?: any | null;
  patient?: ScheduleListPatientProps | null;
  practice?: ScheduleListPracticeProps | null;
  date_from?: any | null;
  date_to?: any | null;
  description?: string | null;
  fullfillments?: ScheduleListFullfillmentProps[] | null;
  status?: enumUtils.scheduleStatus | null;
}

export interface ScheduleListProps {
  count?: number | null;
  next?: any | null;
  previous?: any | null;
  results?: ScheduleListResultsProps[] | [] | null;
}
