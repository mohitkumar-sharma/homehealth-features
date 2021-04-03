import {
  GeneralAvailabilityProps,
  CommonAvailabilityProps,
  UpcomingAvailabilityProps,
} from '../../types/otherPropTypes/availability';
import { ApiErrorResponseProps } from '../../types/otherPropTypes/api-common-responses';

export interface AvailabilityDataStateProps {
  /* as a type of CommonAvailabilityProps or null */
  generalAvailabilityData?: GeneralAvailabilityProps | null;
  /* as a type of CommonAvailabilityProps or null */
  parsedGeneralAvailabilityData?: CommonAvailabilityProps[] | null;
  /* as a type of UpcomingAvailabilityProps or null */
  upcomingAvailabilityData?: UpcomingAvailabilityProps | null;
  /* as a type of ApiErrorResponseProps or null */
  generalAvailabilityDataErrorResponse?: ApiErrorResponseProps | null;
  /* as a type of ApiErrorResponseProps or null */
  upcomingAvailabilityDataErrorResponse?: ApiErrorResponseProps | null;
}
