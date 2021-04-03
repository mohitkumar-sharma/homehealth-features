import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import {
  UpcomingPatientListProps,
  UpcomingPatientSectionedListResultProps,
} from '../types/otherPropTypes/upcoming-patient-list';
import { PatientListDataStateProps } from './statesPropsTypes/patient-list-state-props';
import { ReduxStateProps } from './statesPropsTypes/redux-states-props';
import { patientListUtils } from '../utils';

const initialState: PatientListDataStateProps = {
  /* as a null by default */
  patientListData: null,
  /* as a null by default */
  patientListDataErrorResponse: null,
};

/**
 * This function will save the patient list data to redux
 * @param state : state having PatientListDataStateProps
 * @param action : action called from app with PatientListDataStateProps
 */
const saveUpcomingPatientListData = (
  state: PatientListDataStateProps,
  action: PayloadAction<PatientListDataStateProps>,
): void => {
  const payloadData = action.payload.patientListData;
  if (payloadData?.results) {
    const sortedArr = patientListUtils.sortPatientListArrOnTimeslotDate(
      payloadData.results,
      'ascending',
    );
    payloadData.results = sortedArr;
  }
  state.patientListData = payloadData;
  state.patientListDataErrorResponse = null;
};

/**
 * This function will save the patient patient list data error response to redux
 * @param state : state having PatientListDataStateProps
 * @param action : action called from app with PatientListDataStateProps
 */
const saveUpcomingPatientListDataError = (
  state: PatientListDataStateProps,
  action: PayloadAction<PatientListDataStateProps>,
): void => {
  state.patientListData = null;
  state.patientListDataErrorResponse = action.payload.patientListDataErrorResponse;
};

/**
 * This function will remove the patient patient list data error response from redux
 * @param state : state having PatientListDataStateProps
 */
const removeUpcomingPatientListDataDataError = (state: PatientListDataStateProps): void => {
  state.patientListDataErrorResponse = null;
};

/* Signout Action */
const signOutAction = createAction('signout');

/* Patient List slice*/
const patientListSlice = createSlice({
  name: 'patientList',
  initialState,
  extraReducers: (builder: any) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    savePatientListData: saveUpcomingPatientListData,
    savePatientListDataErrorResponse: saveUpcomingPatientListDataError,
    removePatientListDataErrorResponse: removeUpcomingPatientListDataDataError,
  },
});

// Get actions from created patientListSlice
const {
  savePatientListData,
  savePatientListDataErrorResponse,
  removePatientListDataErrorResponse,
} = patientListSlice.actions;

// SELECTOR
const selectPatientListArray = ({
  patientList,
}: ReduxStateProps): UpcomingPatientSectionedListResultProps[] | [] => {
  const resultData = patientListUtils.getSectionedPatientList(
    patientList?.patientListData?.results ?? [],
  );
  return resultData;
};

const selectPatientListPaginationData = ({
  patientList,
}: ReduxStateProps): UpcomingPatientListProps | [] => {
  return {
    count: patientList?.patientListData?.count ?? 0,
    next: patientList?.patientListData?.next ?? 0,
    previous: patientList?.patientListData?.previous ?? 0,
  };
};

const patientListSliceReducer = patientListSlice.reducer;

export {
  patientListSliceReducer,
  savePatientListData,
  savePatientListDataErrorResponse,
  removePatientListDataErrorResponse,
  signOutAction,
  selectPatientListArray,
  selectPatientListPaginationData,
};
