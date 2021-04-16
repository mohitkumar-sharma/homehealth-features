import {
  GeneralAvailabilityProps,
  CommonAvailabilityProps,
  UpcomingAvailabilityProps,
} from '../../types/otherPropTypes/availability';
import {
  ApiErrorResponseProps,
  ApiCompletionResultProps,
} from '../../types/otherPropTypes/api-common-responses';

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
  /* as a type of number */
  selectedGeneralAvailabilityDayCardIndex: number;
  /* as a type of ApiCompletionResultProps or null */
  postGeneralAvailabilityApiCompletionResult: ApiCompletionResultProps | null;
}
