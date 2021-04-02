import { Api } from '../services';
import { takeLatest, call, put } from 'redux-saga/effects';
import { saveUserLogin, saveLoginErrorResponse } from '../states/User';
import config from '../config';
import { UI } from '../states';

const { ApiService, apiCallTypes } = Api;

/**
 * login generator function for api calling for user login in app
 * @param {Object} action - contains type and payload
 */
export function* login(action: any): any {
  yield put(UI.showLoader(true));
  const data = yield call(ApiService.callApiService, apiCallTypes.LOGIN, action.payload);

  if (data.isSucceded && data.response.data.token !== undefined) {
    yield put(saveUserLogin(data.response.data));
    yield put(UI.showLoader(false));
    return;
  }

  const loginErrorResponse = {
    status: false,
    message: config.customMessages.LOGIN_WRONG_CREDENTIALS,
  };
  yield put(saveLoginErrorResponse({ loginErrorResponse }));
  yield put(UI.showLoader(false));
}

/**
 * Watch login function
 */
export function* watchLogin(): any {
  yield takeLatest('LOGIN', login);
}
