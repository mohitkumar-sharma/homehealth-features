import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import {
  AppointmentsDataStateProps,
  CompleteAppointmentApiResultProps,
} from './statesPropsTypes/appointments-state-props';
import { ReduxStateProps } from './statesPropsTypes/redux-states-props';

const initialState: AppointmentsDataStateProps = {
  /* as a null by default */
  completeAppointmentApiResult: null,
};

/**
 * This function will save the complete appointment api success/error
 * response to redux
 * @param state : state having AppointmentsDataStateProps
 * @param action : action called from app with AppointmentsDataStateProps
 */
const saveCompleteAppointmentApiResult = (
  state: AppointmentsDataStateProps,
  action: PayloadAction<AppointmentsDataStateProps>,
): void => {
  state.completeAppointmentApiResult = action.payload.completeAppointmentApiResult;
};

/**
 * This function will remove the complete appointment api success/error
 * response from redux
 * @param state : state having AppointmentsDataStateProps
 */
const removeCompleteAppointmentApiResult = (state: AppointmentsDataStateProps): void => {
  state.completeAppointmentApiResult = null;
};

/* Signout Action */
const signOutAction = createAction('signout');

/* Appointments slice*/
const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  extraReducers: (builder: any) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveCompleteAppointmentApiResponse: saveCompleteAppointmentApiResult,
    removeCompleteAppointmentApiResponse: removeCompleteAppointmentApiResult,
  },
});

// Get actions from created AppointmentsSlice
const {
  saveCompleteAppointmentApiResponse,
  removeCompleteAppointmentApiResponse,
} = appointmentsSlice.actions;

// SELECTOR
const selectCompleteAppointmentApiResponse = ({
  appointments,
}: ReduxStateProps): CompleteAppointmentApiResultProps | null => {
  if (
    appointments?.completeAppointmentApiResult &&
    appointments.completeAppointmentApiResult.isCompleted
  ) {
    return appointments.completeAppointmentApiResult;
  }
  return null;
};

const appointmentsSliceReducer = appointmentsSlice.reducer;

export {
  appointmentsSliceReducer,
  saveCompleteAppointmentApiResponse,
  removeCompleteAppointmentApiResponse,
  signOutAction,
  selectCompleteAppointmentApiResponse,
};
