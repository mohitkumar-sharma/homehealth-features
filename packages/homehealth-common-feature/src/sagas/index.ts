import { all, fork } from 'redux-saga/effects';
import { watchLogin } from './HHLogin';
import { watchSignup } from './HHSignup';
import { watchGetBoardList } from './HHBoard';
import {
  watchGetScheduleList,
  watchAcceptPendingAppointment,
  watchRejectPendingAppointment,
} from './HHSchedule';
import { watchGetUpcomingPatientList } from './HHUpcomingPatientList';
import { watchGetSearchedFullfillmentsList } from './HHNewFullfillments';
import { watchCompleteAppointment } from './HHAppointments';
import {
  watchGetGeneralAvailabilityData,
  watchGetUpcomingAvailabilityData,
  watchPostGeneralAvailabilityData,
} from './HHAvailability';

export default function* rootSaga(): any {
  return yield all([
    fork(watchLogin),
    fork(watchSignup),
    fork(watchGetBoardList),
    fork(watchGetScheduleList),
    fork(watchGetUpcomingPatientList),
    fork(watchAcceptPendingAppointment),
    fork(watchRejectPendingAppointment),
    fork(watchGetSearchedFullfillmentsList),
    fork(watchCompleteAppointment),
    fork(watchGetGeneralAvailabilityData),
    fork(watchGetUpcomingAvailabilityData),
    fork(watchPostGeneralAvailabilityData),
  ]);
}
