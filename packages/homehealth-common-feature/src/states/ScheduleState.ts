import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { ScheduleListProps, ScheduleListResultsProps } from '../types/schedule';
import { enumUtils } from '../utils';
import {
  ScheduleDataStateProps,
  PendingScheduleAcceptRejectResponseProps,
} from './statesPropsTypes/schedule-state-props';
import { ReduxStateProps } from './statesPropsTypes/redux-states-props';

const initialState: ScheduleDataStateProps = {
  /* as a null by default */
  scheduleData: null,
  /* as a null by default */
  scheduleDataErrorResponse: null,
  /* as Pending tab by default */
  filterText: enumUtils.scheduleStatus.ACCEPT,
  /* as null by default */
  pendingScheduleAcceptRejectResponse: null,
};

/**
 * This function will save the patient schedule data to redux
 * @param state : state having ScheduleDataStateProps
 * @param action : action called from app with ScheduleDataStateProps
 */
const savePatientScheduleData = (
  state: ScheduleDataStateProps,
  action: PayloadAction<ScheduleDataStateProps>,
): void => {
  state.scheduleData = action.payload.scheduleData;
  state.scheduleDataErrorResponse = null;
};

/**
 * This function will save the patient schedule data error response to redux
 * @param state : state having ScheduleDataStateProps
 * @param action : action called from app with ScheduleDataStateProps
 */
const savePatientScheduleDataError = (
  state: ScheduleDataStateProps,
  action: PayloadAction<ScheduleDataStateProps>,
): void => {
  state.scheduleData = null;
  state.scheduleDataErrorResponse = action.payload.scheduleDataErrorResponse;
};

/**
 * This function will remove the patient schedule data error response from redux
 * @param state : state having ScheduleDataStateProps
 */
const removePatientScheduleDataError = (state: ScheduleDataStateProps): void => {
  state.scheduleDataErrorResponse = null;
};

/**
 * This function will save the pending schedule appointment accept/reject api success/error
 * response to redux
 * @param state : state having ScheduleDataStateProps
 * @param action : action called from app with ScheduleDataStateProps
 */
const savePendingScheduleAcceptRejectApiResponse = (
  state: ScheduleDataStateProps,
  action: PayloadAction<ScheduleDataStateProps>,
): void => {
  state.pendingScheduleAcceptRejectResponse = action.payload.pendingScheduleAcceptRejectResponse;
};

/**
 * This function will remove the pending schedule appointment accept/reject api success/error
 * response from redux
 * @param state : state having ScheduleDataStateProps
 */
const removePendingScheduleAcceptRejectApiResponse = (state: ScheduleDataStateProps): void => {
  state.pendingScheduleAcceptRejectResponse = null;
};

/**
 * This function will set the filter text
 * @param state : state having ScheduleDataStateProps
 * @param action : action called from app with ScheduleDataStateProps
 */
const manageFilterText = (
  state: ScheduleDataStateProps,
  action: PayloadAction<ScheduleDataStateProps>,
): void => {
  state.filterText = action.payload.filterText;
};

/* Signout Action */
const signOutAction = createAction('signout');

/* Schedule slice*/
const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  extraReducers: (builder: any) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveScheduleData: savePatientScheduleData,
    saveScheduleDataErrorResponse: savePatientScheduleDataError,
    removeScheduleDataErrorResponse: removePatientScheduleDataError,
    saveAcceptRejectApiResponse: savePendingScheduleAcceptRejectApiResponse,
    removeAcceptRejectApiResponse: removePendingScheduleAcceptRejectApiResponse,
    setFilterText: manageFilterText,
  },
});

// Get actions from created ScheduleSlice
const {
  saveScheduleData,
  saveScheduleDataErrorResponse,
  saveAcceptRejectApiResponse,
  removeScheduleDataErrorResponse,
  removeAcceptRejectApiResponse,
  setFilterText,
} = scheduleSlice.actions;

// SELECTOR
const selectScheduleArray = ({ schedule }: ReduxStateProps): ScheduleListResultsProps[] | [] =>
  schedule?.scheduleData?.results ?? [];

const selectFilteredScheduleArray = ({
  schedule,
}: ReduxStateProps): ScheduleListResultsProps[] | [] => {
  let filteredScheduleArr: ScheduleListResultsProps[] | null | undefined = null;
  filteredScheduleArr = schedule?.scheduleData?.results?.filter((obj: ScheduleListResultsProps) => {
    return obj.status === schedule.filterText;
  });
  return filteredScheduleArr ? filteredScheduleArr : [];
};

const selectSchedulePaginationData = ({ schedule }: ReduxStateProps): ScheduleListProps => {
  return {
    count: schedule?.scheduleData?.count ?? 0,
    next: schedule?.scheduleData?.next ?? 0,
    previous: schedule?.scheduleData?.previous ?? 0,
  };
};

const selectListDataStatus = ({ schedule }: ReduxStateProps): boolean => {
  if (
    !schedule ||
    !schedule.scheduleData ||
    !schedule.scheduleData.results ||
    schedule.scheduleData.results.length <= 0
  ) {
    return true;
  }
  return false;
};

const selectAcceptRejectResponse = ({
  schedule,
}: ReduxStateProps): PendingScheduleAcceptRejectResponseProps | null => {
  if (
    schedule?.pendingScheduleAcceptRejectResponse &&
    schedule.pendingScheduleAcceptRejectResponse.isCompleted
  ) {
    return schedule.pendingScheduleAcceptRejectResponse;
  }
  return null;
};

const scheduleSliceReducer = scheduleSlice.reducer;

export {
  scheduleSliceReducer,
  saveScheduleData,
  saveScheduleDataErrorResponse,
  saveAcceptRejectApiResponse,
  removeScheduleDataErrorResponse,
  removeAcceptRejectApiResponse,
  setFilterText,
  signOutAction,
  selectScheduleArray,
  selectFilteredScheduleArray,
  selectSchedulePaginationData,
  selectListDataStatus,
  selectAcceptRejectResponse,
};
