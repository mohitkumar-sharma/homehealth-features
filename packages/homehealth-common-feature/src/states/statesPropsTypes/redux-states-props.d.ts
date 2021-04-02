import { BoardDataStateProps } from './board-state-props';
import { ScheduleDataStateProps } from './schedule-state-props';
import { PatientListDataStateProps } from './patient-list-state-props';
import { NewFullfillmentsListDataStateProps } from './new-fullfillment-list-state-props';
import { AppointmentsDataStateProps } from './appointments-state-props';
import { AvailabilityDataStateProps } from './availability-state-props';

export interface ReduxStateProps {
  board?: BoardDataStateProps;
  schedule?: ScheduleDataStateProps;
  patientList?: PatientListDataStateProps;
  newFullfillmentsList?: NewFullfillmentsListDataStateProps;
  appointments?: AppointmentsDataStateProps;
  availability?: AvailabilityDataStateProps;
}
