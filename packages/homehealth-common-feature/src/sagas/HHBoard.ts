import { Api } from '../services';
import { takeLatest, call, put } from 'redux-saga/effects';
import { saveBoardData } from '../states/BoardState';
import { UI } from '../states';

const { ApiService, apiCallTypes } = Api;

/**
 * board list generator function for api calling for board list in app
 * @param {Object} action - contains type and payload
 */
export function* getBoardList(action: any): any {
  if (!action.isListRefreshing) {
    yield put(UI.showLoader(true));
  }
  const data = yield call(ApiService.callApiService, apiCallTypes.BOARD_LIST, action.payload);
  if (data.isSucceded && data.response.status && data.response.status === 200) {
    yield put(saveBoardData({ boardData: data.response.data }));
    yield put(UI.showLoader(false));
    return;
  }
  yield put(UI.showLoader(false));
}

/**
 * Watch getBoardList function
 */
export function* watchGetBoardList(): any {
  yield takeLatest('GET_BOARD_LIST', getBoardList);
}
