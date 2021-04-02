import { Api } from '../services';
import { takeLatest, call, put } from 'redux-saga/effects';
import { saveScheduleData, saveAcceptRejectApiResponse } from '../states/ScheduleState';
import { UI } from '../states';
import config from '../config';

const { ApiService, apiCallTypes } = Api;

/**
 * schedule list generator function for api calling for schedule list in app
 * @param {Object} action - contains type and payload
 */
export function* getScheduleList(action: any): any {
  if (!action.isListRefreshing) {
    yield put(UI.showLoader(true));
  }
  const data = yield call(ApiService.callApiService, apiCallTypes.SCHEDULE_LIST, action.payload);
  if (data.isSucceded && data.response.status && data.response.status === 200) {
    yield put(saveScheduleData({ scheduleData: data.response.data }));
    yield put(UI.showLoader(false));
    return;
  }
  yield put(UI.showLoader(false));
}

/**
 * accept Pending Schedule appointment generator function for api calling for accepting pending appointment
 * in app
 * @param {Object} action - contains type and payload
 */
export function* acceptPendingScheduleAppointment(action: any): any {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.SCHEDULE_APPOINTMENT_ACCEPT,
    action.payload,
  );

  let pendingScheduleAcceptRejectResponse: any = {
    isCompleted: true,
    isSucceeded: false,
    actionType: 'accept',
    message: config.customMessages.GENERIC_ERROR,
  };
  if (data.isSucceded && data.response.status && data.response.status === 200) {
    pendingScheduleAcceptRejectResponse = {
      isCompleted: true,
      isSucceeded: true,
      actionType: 'accept',
      message: config.customMessages.ACCEPT_SCHEDULE_APPOINTMENT_SUCCESS,
    };
  }
  yield put(saveAcceptRejectApiResponse({ pendingScheduleAcceptRejectResponse }));
  yield put(UI.showLoader(false));
}

/**
 * reject Pending Schedule appointment generator function for api calling for reject pending appointment
 * in app
 * @param {Object} action - contains type and payload
 */
export function* rejectPendingScheduleAppointment(action: any): any {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.SCHEDULE_APPOINTMENT_REJECT,
    action.payload,
  );

  let pendingScheduleAcceptRejectResponse: any = {
    isCompleted: true,
    isSucceeded: false,
    actionType: 'reject',
    message: config.customMessages.GENERIC_ERROR,
  };
  if (data.isSucceded && data.response.status && data.response.status === 200) {
    pendingScheduleAcceptRejectResponse = {
      isCompleted: true,
      isSucceeded: true,
      actionType: 'reject',
      message: config.customMessages.REJECT_SCHEDULE_APPOINTMENT_SUCCESS,
    };
  }
  yield put(saveAcceptRejectApiResponse({ pendingScheduleAcceptRejectResponse }));
  yield put(UI.showLoader(false));
}

/**
 * Watch getScheduleList function
 */
export function* watchGetScheduleList(): any {
  yield takeLatest('GET_SCHEDULE_LIST', getScheduleList);
}

/**
 * Watch acceptPendingScheduleAppointment function
 */
export function* watchAcceptPendingAppointment(): any {
  yield takeLatest('ACCEPT_PENDING_SCHEDULE_APPOINTMENT', acceptPendingScheduleAppointment);
}

/**
 * Watch rejectPendingScheduleAppointment function
 */
export function* watchRejectPendingAppointment(): any {
  yield takeLatest('REJECT_PENDING_SCHEDULE_APPOINTMENT', rejectPendingScheduleAppointment);
}
