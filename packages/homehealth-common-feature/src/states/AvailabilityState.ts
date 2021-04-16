import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import {
  UpcomingAvailabilityProps,
  UpcomingAvailabilityResultProps,
  CommonAvailabilityProps,
  UpdateCommonAvailabilityPayloadProps,
} from '../types/otherPropTypes/availability';
import { AvailabilityDataStateProps } from './statesPropsTypes/availability-state-props';
import { ReduxStateProps } from './statesPropsTypes/redux-states-props';
import { availabilityUtils } from '../utils';
import { ApiCompletionResultProps } from '../types/otherPropTypes/api-common-responses';

const initialState: AvailabilityDataStateProps = {
  /* as a null by default */
  generalAvailabilityData: null,
  /* as a null by default */
  parsedGeneralAvailabilityData: null,
  /* as a null by default */
  upcomingAvailabilityData: null,
  /* as a null by default */
  generalAvailabilityDataErrorResponse: null,
  /* as a null by default */
  upcomingAvailabilityDataErrorResponse: null,
  /* selected general availability data index */
  selectedGeneralAvailabilityDayCardIndex: -1,
  /* as a null by default */
  postGeneralAvailabilityApiCompletionResult: null,
};

/**
 * This function will save the general availability data to redux
 * @param state : state having AvailabilityDataStateProps
 * @param action : action called from app with AvailabilityDataStateProps
 */
const saveGeneralAvailabilityDataResponse = (
  state: AvailabilityDataStateProps,
  action: PayloadAction<AvailabilityDataStateProps>,
): void => {
  const generalAvailabilityArr = availabilityUtils.getGeneralAvailabilities2DArr(
    action.payload.generalAvailabilityData,
  );
  if (generalAvailabilityArr && generalAvailabilityArr.length > 0) {
    state.selectedGeneralAvailabilityDayCardIndex = 0;
  }
  state.parsedGeneralAvailabilityData = generalAvailabilityArr;
  state.generalAvailabilityData = action.payload.generalAvailabilityData;
  state.generalAvailabilityDataErrorResponse = null;
  state.postGeneralAvailabilityApiCompletionResult = null;
};

/**
 * This function will save the upcoming availability data to redux
 * @param state : state having AvailabilityDataStateProps
 * @param action : action called from app with AvailabilityDataStateProps
 */
const saveUpcomingAvailabilityDataResponse = (
  state: AvailabilityDataStateProps,
  action: PayloadAction<AvailabilityDataStateProps>,
): void => {
  state.upcomingAvailabilityData = action.payload.upcomingAvailabilityData;
  state.upcomingAvailabilityDataErrorResponse = null;
};

/**
 * This function will save the general availability data error response to redux
 * @param state : state having AvailabilityDataStateProps
 * @param action : action called from app with AvailabilityDataStateProps
 */
const saveGeneralAvailabilityDataErrorResponse = (
  state: AvailabilityDataStateProps,
  action: PayloadAction<AvailabilityDataStateProps>,
): void => {
  state.generalAvailabilityDataErrorResponse = action.payload.generalAvailabilityDataErrorResponse;
};

/**
 * This function will save the upcoming availability data error response to redux
 * @param state : state having AvailabilityDataStateProps
 * @param action : action called from app with AvailabilityDataStateProps
 */
const saveUpcomingAvailabilityDataErrorResponse = (
  state: AvailabilityDataStateProps,
  action: PayloadAction<AvailabilityDataStateProps>,
): void => {
  state.upcomingAvailabilityDataErrorResponse =
    action.payload.upcomingAvailabilityDataErrorResponse;
};

/**
 * This function will save the post general availability api completion result to redux
 * @param state : state having AvailabilityDataStateProps
 * @param action : action called from app with AvailabilityDataStateProps
 */
const savePostGeneralAvailabilityApiCompletionResponse = (
  state: AvailabilityDataStateProps,
  action: PayloadAction<AvailabilityDataStateProps>,
): void => {
  const response: ApiCompletionResultProps =
    action.payload.postGeneralAvailabilityApiCompletionResult;
  state.postGeneralAvailabilityApiCompletionResult = response;
};

/**
 * This function will remove the general availability data error response from redux
 * @param state : state having AvailabilityDataStateProps
 */
const removeGeneralAvailabilityDataErrorResponse = (state: AvailabilityDataStateProps): void => {
  state.generalAvailabilityDataErrorResponse = null;
};

/**
 * This function will remove the upcoming availability data error response from redux
 * @param state : state having AvailabilityDataStateProps
 */
const removeUpcomingAvailabilityDataErrorResponse = (state: AvailabilityDataStateProps): void => {
  state.generalAvailabilityDataErrorResponse = null;
};

/**
 * This function will remove the post general availability api completion result from redux
 * @param state : state having AvailabilityDataStateProps
 */
const removePostGeneralAvailabilityApiCompletionResponse = (
  state: AvailabilityDataStateProps,
  action: PayloadAction<{ isResetGeneralAvailabilityData: boolean }>,
): void => {
  state.postGeneralAvailabilityApiCompletionResult = null;
  if (action?.payload?.isResetGeneralAvailabilityData && state?.generalAvailabilityData) {
    const actionForGA = { payload: { generalAvailabilityData: state.generalAvailabilityData } };
    saveGeneralAvailabilityDataResponse(state, actionForGA);
  }
};

/**
 * This function will update the general availability data to redux
 * @param state : state having AvailabilityDataStateProps
 * @param action : action called from app with UpdateCommonAvailabilityPayloadProps
 */
const updateGeneralAvailabilityDataResult = (
  state: AvailabilityDataStateProps,
  action: PayloadAction<UpdateCommonAvailabilityPayloadProps>,
): void => {
  const generalAvailabilityArr = state?.parsedGeneralAvailabilityData ?? [];
  const payload = action?.payload;
  const updatedGeneralAvailityData = availabilityUtils.updateGeneralAvailabilityData(
    generalAvailabilityArr,
    payload,
  );
  state.parsedGeneralAvailabilityData = [...updatedGeneralAvailityData];
};

/**
 * This function will update the selected general availability day card index to redux
 * @param state : state having AvailabilityDataStateProps
 * @param action : action called from app with UpdateCommonAvailabilityPayloadProps
 */
const updateGeneralAvailabilitySelectedDayIndexResult = (
  state: AvailabilityDataStateProps,
  action: PayloadAction<AvailabilityDataStateProps>,
): void => {
  state.selectedGeneralAvailabilityDayCardIndex =
    action?.payload?.selectedGeneralAvailabilityDayCardIndex ??
    state.selectedGeneralAvailabilityDayCardIndex;
};

/* Signout Action */
const signOutAction = createAction('signout');

/* Availability slice*/
const availabilitySlice = createSlice({
  name: 'availability',
  initialState,
  extraReducers: (builder: any) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveGeneralAvailabilityData: saveGeneralAvailabilityDataResponse,
    saveUpcomingAvailabilityData: saveUpcomingAvailabilityDataResponse,
    saveGeneralAvailabilityDataError: saveGeneralAvailabilityDataErrorResponse,
    saveUpcomingAvailabilityDataError: saveUpcomingAvailabilityDataErrorResponse,
    savePostGeneralAvailabilityApiCompletion: savePostGeneralAvailabilityApiCompletionResponse,
    removeGeneralAvailabilityDataError: removeGeneralAvailabilityDataErrorResponse,
    removeUpcomingAvailabilityDataError: removeUpcomingAvailabilityDataErrorResponse,
    updateGeneralAvailabilityData: updateGeneralAvailabilityDataResult,
    updateGeneralAvailabilitySelectedDayIndex: updateGeneralAvailabilitySelectedDayIndexResult,
    removePostGeneralAvailabilityApiCompletion: removePostGeneralAvailabilityApiCompletionResponse,
  },
});

// Get actions from created availabilitySlice
const {
  saveGeneralAvailabilityData,
  saveUpcomingAvailabilityData,
  saveGeneralAvailabilityDataError,
  saveUpcomingAvailabilityDataError,
  savePostGeneralAvailabilityApiCompletion,
  removeGeneralAvailabilityDataError,
  removeUpcomingAvailabilityDataError,
  removePostGeneralAvailabilityApiCompletion,
  updateGeneralAvailabilityData,
  updateGeneralAvailabilitySelectedDayIndex,
} = availabilitySlice.actions;

// SELECTOR
const selectGeneralAvailabilityListArray = ({
  availability,
}: ReduxStateProps): CommonAvailabilityProps[] | [] =>
  availability?.parsedGeneralAvailabilityData ?? [];

const selectUpcomingAvailabilityListArray = ({
  availability,
}: ReduxStateProps): UpcomingAvailabilityResultProps[] | [] =>
  availability?.upcomingAvailabilityData?.results ?? [];

const selectUpcomingAvailabilityListPaginationData = ({
  availability,
}: ReduxStateProps): UpcomingAvailabilityProps | [] => {
  return {
    count: availability?.upcomingAvailabilityData?.count ?? 0,
    next: availability?.upcomingAvailabilityData?.next ?? 0,
    previous: availability?.upcomingAvailabilityData?.previous ?? 0,
  };
};

const selectGeneralAvailabilitySelectedDayCardIndex = ({
  availability,
}: ReduxStateProps): number => {
  return availability?.selectedGeneralAvailabilityDayCardIndex ?? -1;
};

const selectPostGeneralAvailabilityCompletionApiResult = ({
  availability,
}: ReduxStateProps): ApiCompletionResultProps | null => {
  if (
    availability?.postGeneralAvailabilityApiCompletionResult &&
    availability.postGeneralAvailabilityApiCompletionResult.isCompleted
  ) {
    return availability.postGeneralAvailabilityApiCompletionResult;
  }
  return null;
};

const availabilitySliceReducer = availabilitySlice.reducer;

export {
  availabilitySliceReducer,
  saveGeneralAvailabilityData,
  saveUpcomingAvailabilityData,
  saveGeneralAvailabilityDataError,
  saveUpcomingAvailabilityDataError,
  savePostGeneralAvailabilityApiCompletion,
  removeGeneralAvailabilityDataError,
  removeUpcomingAvailabilityDataError,
  removePostGeneralAvailabilityApiCompletion,
  updateGeneralAvailabilityData,
  updateGeneralAvailabilitySelectedDayIndex,
  signOutAction,
  selectGeneralAvailabilityListArray,
  selectUpcomingAvailabilityListArray,
  selectUpcomingAvailabilityListPaginationData,
  selectGeneralAvailabilitySelectedDayCardIndex,
  selectPostGeneralAvailabilityCompletionApiResult,
};
