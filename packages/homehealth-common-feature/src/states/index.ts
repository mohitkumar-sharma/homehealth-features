import { combineReducers } from '@reduxjs/toolkit';
import * as User from './User';
import * as UI from './UI';
import * as BoardState from './BoardState';
import * as ScheduleState from './ScheduleState';
import * as PatientListState from './PatientListState';
import * as NewFullfillmentsState from './NewFullfillmentsState';
import * as AppointmentsState from './AppointmentsState';
import * as AvailabilityState from './AvailabilityState';

const commonFeatureReducers = combineReducers({
  user: User.userSliceReducer,
  ui: UI.uiSliceReducer,
  board: BoardState.boardSliceReducer,
  schedule: ScheduleState.scheduleSliceReducer,
  patientList: PatientListState.patientListSliceReducer,
  newFullfillmentsList: NewFullfillmentsState.newFullfillmentsListSliceReducer,
  appointments: AppointmentsState.appointmentsSliceReducer,
  availability: AvailabilityState.availabilitySliceReducer,
});

export type RootState = ReturnType<typeof commonFeatureReducers>;
export {
  commonFeatureReducers,
  User,
  UI,
  BoardState,
  ScheduleState,
  PatientListState,
  NewFullfillmentsState,
  AppointmentsState,
  AvailabilityState,
};
