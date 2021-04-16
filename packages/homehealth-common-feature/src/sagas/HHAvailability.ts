import { Api } from '../services';
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  saveGeneralAvailabilityData,
  saveUpcomingAvailabilityData,
  savePostGeneralAvailabilityApiCompletion,
} from '../states/AvailabilityState';
import { UI } from '../states';
import config from '../config';

const { ApiService, apiCallTypes } = Api;

/**
 * general availability generator function for api calling for general availability data in app
 * @param {Object} action - contains type and payload
 */
export function* getGeneralAvailabilityData(action: any): any {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.GET_GENERAL_AVAILABILITY,
    action.payload,
  );
  if (data && data.isSucceded && data.response.status && data.response.status === 200) {
    yield put(saveGeneralAvailabilityData({ generalAvailabilityData: data.response.data }));
    yield put(UI.showLoader(false));
    return;
  }
  yield put(UI.showLoader(false));
}

/**
 * upcoming availability generator function for api calling for upcoming availability data in app
 * @param {Object} action - contains type and payload
 */
export function* getUpcomingAvailabilityData(action: any): any {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.GET_UPCOMING_AVAILABILITY,
    action.payload,
  );
  if (data && data.isSucceded && data.response.status && data.response.status === 200) {
    yield put(saveUpcomingAvailabilityData({ generalAvailabilityData: data.response.data }));
    yield put(UI.showLoader(false));
    return;
  }
  yield put(UI.showLoader(false));
}

/**
 * general availability generator function for api calling for post general availability data in app
 * @param {Object} action - contains type and payload
 */
export function* postGeneralAvailabilityData(action: any): any {
  yield put(UI.showLoader(true));
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.POST_GENERAL_AVAILABILITY,
    action.payload,
  );
  let postGeneralAvailabilityApiResult = {
    isCompleted: true,
    isSucceeded: false,
    message: config.customMessages.POST_GENERAL_AVAIL_ERROR,
  };
  if (data.isSucceded && data.response.status && data.response.status === 200) {
    postGeneralAvailabilityApiResult = {
      isCompleted: true,
      isSucceeded: true,
      message: config.customMessages.POST_GENERAL_AVAIL_SUCCESS,
    };
  }
  yield put(
    savePostGeneralAvailabilityApiCompletion({
      postGeneralAvailabilityApiCompletionResult: postGeneralAvailabilityApiResult,
    }),
  );
  yield put(UI.showLoader(false));
}

/**
 * Watch getGeneralAvailabilityData function
 */
export function* watchGetGeneralAvailabilityData(): any {
  yield takeLatest('GET_GENERAL_AVAILABILITY_DATA', getGeneralAvailabilityData);
}

/**
 * Watch getUpcomingAvailabilityData function
 */
export function* watchGetUpcomingAvailabilityData(): any {
  yield takeLatest('GET_UPCOMING_AVAILABILITY_DATA', getUpcomingAvailabilityData);
}

/**
 * Watch postGeneralAvailabilityData function
 */
export function* watchPostGeneralAvailabilityData(): any {
  yield takeLatest('POST_GENERAL_AVAILABILITY_DATA', postGeneralAvailabilityData);
}
