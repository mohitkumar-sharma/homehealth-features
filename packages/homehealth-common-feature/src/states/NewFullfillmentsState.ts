import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import {
  FullfillmentListResultsProps,
  FullfillmentListProps,
} from '../types/otherPropTypes/fullfillment-list';
import { NewFullfillmentsListDataStateProps } from './statesPropsTypes/new-fullfillment-list-state-props';
import { ReduxStateProps } from './statesPropsTypes/redux-states-props';
import { assessmentUtils, commonUtils } from '../utils';

const initialState: NewFullfillmentsListDataStateProps = {
  /* as a null by default */
  newFullfillmentsListData: null,
  /* as an empty array. this is the already in list fullfillments */
  previousFullfillmentArr: [],
};

/**
 * This function will save the new fullfillments list data to redux
 * @param state : state having NewFullfillmentsListDataStateProps
 * @param action : action called from app with NewFullfillmentsListDataStateProps
 */
const saveNewFullfillmentsListData = (
  state: NewFullfillmentsListDataStateProps,
  action: PayloadAction<NewFullfillmentsListDataStateProps>,
): void => {
  const newFullfillmentData = action.payload.newFullfillmentsListData;
  const prevFullfillmentArray = action.payload.previousFullfillmentArr;
  if (newFullfillmentData?.results && newFullfillmentData.results.length > 0) {
    const { compareFullfillmentsPk } = assessmentUtils;
    const newResults = commonUtils.getIntersectionOfTwoArrays({
      compareFunction: compareFullfillmentsPk,
      oldArray: prevFullfillmentArray,
      newArray: newFullfillmentData.results,
    });
    newFullfillmentData.results = newResults;
  }
  state.newFullfillmentsListData = newFullfillmentData;
};

/**
 * This function will clear the new fullfillments list data from redux
 * @param state : state having NewFullfillmentsListDataStateProps
 */
const clearNewFullfillmentsListData = (state: NewFullfillmentsListDataStateProps): void => {
  state.newFullfillmentsListData = null;
  state.previousFullfillmentArr = [];
};

/* Signout Action */
const signOutAction = createAction('signout');

/* New Fullfillments List slice*/
const newFullfillmentsListSlice = createSlice({
  name: 'newFullfillmentsList',
  initialState,
  extraReducers: (builder: any) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveSearchedFullfillmentsListData: saveNewFullfillmentsListData,
    clearFullfillmentsListData: clearNewFullfillmentsListData,
  },
});

// Get actions from created newFullfillmentsList
const {
  saveSearchedFullfillmentsListData,
  clearFullfillmentsListData,
} = newFullfillmentsListSlice.actions;

// SELECTOR
const selectNewFullfillmentsListArray = ({
  newFullfillmentsList,
}: ReduxStateProps): FullfillmentListResultsProps[] | [] =>
  newFullfillmentsList?.newFullfillmentsListData?.results ?? [];

const selectNewFullfillmentsListPaginationData = ({
  newFullfillmentsList,
}: ReduxStateProps): FullfillmentListProps | [] => {
  return {
    count: newFullfillmentsList?.newFullfillmentsListData?.count ?? 0,
    next: newFullfillmentsList?.newFullfillmentsListData?.next ?? 0,
    previous: newFullfillmentsList?.newFullfillmentsListData?.previous ?? 0,
  };
};

const newFullfillmentsListSliceReducer = newFullfillmentsListSlice.reducer;

export {
  newFullfillmentsListSliceReducer,
  saveSearchedFullfillmentsListData,
  clearFullfillmentsListData,
  signOutAction,
  selectNewFullfillmentsListArray,
  selectNewFullfillmentsListPaginationData,
};
