import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import {
  UpcomingAvailabilityProps,
  UpcomingAvailabilityResultProps,
  CommonAvailabilityProps,
} from '../types/availability';
import { AvailabilityDataStateProps } from './statesPropsTypes/availability-state-props';
import { ReduxStateProps } from './statesPropsTypes/redux-states-props';
import { availabilityUtils } from '../utils';

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
  state.parsedGeneralAvailabilityData = generalAvailabilityArr;
  state.generalAvailabilityDataErrorResponse = null;
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
    removeGeneralAvailabilityDataError: removeGeneralAvailabilityDataErrorResponse,
    removeUpcomingAvailabilityDataError: removeUpcomingAvailabilityDataErrorResponse,
  },
});

// Get actions from created availabilitySlice
const {
  saveGeneralAvailabilityData,
  saveUpcomingAvailabilityData,
  saveGeneralAvailabilityDataError,
  saveUpcomingAvailabilityDataError,
  removeGeneralAvailabilityDataError,
  removeUpcomingAvailabilityDataError,
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

const availabilitySliceReducer = availabilitySlice.reducer;

export {
  availabilitySliceReducer,
  saveGeneralAvailabilityData,
  saveUpcomingAvailabilityData,
  saveGeneralAvailabilityDataError,
  saveUpcomingAvailabilityDataError,
  removeGeneralAvailabilityDataError,
  removeUpcomingAvailabilityDataError,
  signOutAction,
  selectGeneralAvailabilityListArray,
  selectUpcomingAvailabilityListArray,
  selectUpcomingAvailabilityListPaginationData,
};
