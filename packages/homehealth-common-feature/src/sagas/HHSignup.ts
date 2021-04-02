import { takeLatest, call, put } from 'redux-saga/effects';
import { Api } from '../services';
import { saveUserLogin, saveSignupErrorResponse } from '../states/User';
import config from '../config';
import { UI } from '../states';

const { ApiService, apiCallTypes } = Api;

/**
 * signup generator function for api calling for user signup in app
 * @param {Object} action - contains type and payload
 */
export function* signup(action: any): any {
  yield put(UI.showLoader(true));
  const data = yield call(ApiService.callApiService, apiCallTypes.SIGNUP, action.payload);

  if (data.isSucceded && data.response.data.token !== undefined) {
    yield put(saveUserLogin(data.response.data));
    yield put(UI.showLoader(false));
    return;
  }

  const signupErrorResponse = {
    status: false,
    message: config.customMessages.SIGNUP_FAILED,
  };
  yield put(saveSignupErrorResponse({ signupErrorResponse }));
  yield put(UI.showLoader(false));
}

/**
 * Watch signup function
 */
export function* watchSignup(): any {
  yield takeLatest('SIGNUP', signup);
}
