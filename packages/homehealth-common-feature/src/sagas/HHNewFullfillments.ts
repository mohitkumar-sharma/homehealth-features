import { Api } from '../services';
import { takeLatest, call, put } from 'redux-saga/effects';
import { saveSearchedFullfillmentsListData } from '../states/NewFullfillmentsState';
import { UI } from '../states';

const { ApiService, apiCallTypes } = Api;

/**
 * new fullfillments search query generator function for api calling for new fullfillments list in
 * app
 * @param {Object} action - contains type and payload
 */
export function* getSearchedFullfillmentsList(action: any): any {
  if (!action?.payload?.searchText) {
    yield put(UI.showLoader(true));
  }
  const data = yield call(
    ApiService.callApiService,
    apiCallTypes.NEW_FULLFILLMENTS_SEARCH_QUERY,
    action.payload,
  );
  if (data.isSucceded && data.response.status && data.response.status === 200) {
    yield put(
      saveSearchedFullfillmentsListData({
        newFullfillmentsListData: data.response.data,
        previousFullfillmentArr: action?.payload?.previousFullfillmentArr,
      }),
    );
    yield put(UI.showLoader(false));
    return;
  }
  yield put(UI.showLoader(false));
}

/**
 * Watch getSearchedFullfillmentsList function
 */
export function* watchGetSearchedFullfillmentsList(): any {
  yield takeLatest('GET_SEARCHED_FULLFILLMENTS_LIST', getSearchedFullfillmentsList);
}
