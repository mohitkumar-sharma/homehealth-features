export interface ValidationResponseProps {
  /** status as a boolean */
  status: boolean;
  /** message as a string */
  message: string;
}

export interface ValidateLoginCredentialsProps {
  /** email as a string */
  email: string;
  /** password as a string */
  password: string;
}
