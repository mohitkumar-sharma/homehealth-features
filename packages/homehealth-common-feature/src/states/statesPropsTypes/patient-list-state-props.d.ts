import { UpcomingPatientListProps } from '../../types/otherPropTypes/upcoming-patient-list';
import { ApiErrorResponseProps } from '../../types/otherPropTypes/api-common-responses';

export interface PatientListDataStateProps {
  /* as a type of UpcomingPatientListProps or null */
  patientListData?: UpcomingPatientListProps | null;
  /* as a type of ApiErrorResponseProps or null */
  patientListDataErrorResponse?: ApiErrorResponseProps | null;
}
