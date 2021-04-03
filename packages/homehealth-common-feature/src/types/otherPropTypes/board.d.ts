import { enumUtils } from '../../utils';

export interface BoardFullfillmentMetricsProps {
  title?: string | null;
  pk?: number | null;
}

export interface BoardFullfillmentProps {
  title?: string | null;
  pk?: number | null;
  metrics?: BoardFullfillmentMetricsProps[] | [] | null;
}

export interface BoardPatientPersonalProfileProps {
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

export interface BoardPatientProps {
  first_name?: string | null;
  last_name?: string | null;
  personalprofile?: BoardPatientPersonalProfileProps | null;
}

export interface BoardPracticeProfileProps {
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

export interface BoardPracticeProps {
  name?: string | null;
  profile?: BoardPracticeProfileProps | null;
}

export interface BoardResultsProps {
  pk?: number | null;
  worker?: any | null;
  patient?: BoardPatientProps | null;
  practice?: BoardPracticeProps | null;
  date_from?: any | null;
  date_to?: any | null;
  description?: string | null;
  fullfillments?: BoardFullfillmentProps[] | [] | null;
  status?: enumUtils.scheduleStatus | null;
  practice_status?: enumUtils.practiceStatus | null;
}

export interface BoardProps {
  count?: number | null;
  next?: any | null;
  previous?: any | null;
  results?: BoardResultsProps[] | [] | null;
}
