import { Api } from '../services';
import { takeLatest, call, put } from 'redux-saga/effects';
import { savePatientListData } from '../states/PatientListState';
import { UI } from '../states';

const { ApiService, apiCallTypes } = Api;

/**
 * upcoming patient list generator function for api calling for upcoming patient list in app
 * @param {Object} action - contains type and payload
 */
export function* getUpcomingPatientList(action: any): any {
  if (!action.isListRefreshing) {
    yield put(UI.showLoader(true));
  }
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.UPCOMING_PATIENT_LIST,
    action.payload,
  );
  if (data.isSucceded && data.response.status && data.response.status === 200) {
    yield put(savePatientListData({ patientListData: data.response.data }));
    yield put(UI.showLoader(false));
    return;
  }
  yield put(UI.showLoader(false));
}

/**
 * Watch getUpcomingPatientList function
 */
export function* watchGetUpcomingPatientList(): any {
  yield takeLatest('GET_UPCOMING_PATIENT_LIST', getUpcomingPatientList);
}
