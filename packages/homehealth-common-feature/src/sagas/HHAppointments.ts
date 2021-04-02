import { Api } from '../services';
import { takeLatest, call, put } from 'redux-saga/effects';
import { saveCompleteAppointmentApiResponse } from '../states/AppointmentsState';
import { UI } from '../states';
import config from '../config';

const { ApiService, apiCallTypes } = Api;

/**
 * complete scheduled appointment generator function for api calling for complete appointment
 * in app
 * @param {Object} action - contains type and payload
 */
export function* completeAppointment(action: any): any {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.COMPLETE_APPOINTMENT,
    action.payload,
  );
  let completeAppointmentApiResult = {
    isCompleted: true,
    isSucceeded: false,
    message: config.customMessages.GENERIC_ERROR,
  };
  if (data.isSucceded && data.response.status && data.response.status === 200) {
    completeAppointmentApiResult = {
      isCompleted: true,
      isSucceeded: true,
      message: config.customMessages.COMPLETED_APPOINTMENT_SUCCESS,
    };
  }
  yield put(saveCompleteAppointmentApiResponse({ completeAppointmentApiResult }));
  yield put(UI.showLoader(false));
}

/**
 * Watch completeAppointment function
 */
export function* watchCompleteAppointment(): any {
  yield takeLatest('COMPLETE_APPOINTMENT', completeAppointment);
}
