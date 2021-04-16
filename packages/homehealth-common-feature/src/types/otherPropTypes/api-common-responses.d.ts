export interface ApiErrorResponseProps {
  /* as a boolean of status */
  status: boolean;
  /* as a string of message */
  message: string;
}

export interface ApiCompletionResultProps {
  /* as a boolean for isSucceeded by default false */
  isSucceeded?: boolean;
  /* as a boolean for isCompleted by default false (if api endpoint hits then will be true) */
  isCompleted?: boolean;
  /* as a string for message */
  message?: string;
}
