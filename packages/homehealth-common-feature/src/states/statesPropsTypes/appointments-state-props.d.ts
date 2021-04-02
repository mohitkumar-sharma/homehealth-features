export interface CompleteAppointmentApiResultProps {
  /* as a boolean for isSucceeded by default false */
  isSucceeded?: boolean;
  /* as a boolean for isCompleted by default false (if api endpoint hits then will be true) */
  isCompleted?: boolean;
  /* as a string for message */
  message?: string;
}

export interface AppointmentsDataStateProps {
  /* as a CompleteAppointmentApiResultProps for calling the complete appointment api response */
  completeAppointmentApiResult?: CompleteAppointmentApiResultProps | null;
}
