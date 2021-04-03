export interface SignupDetailsValidationResponseProps {
  /** status as a boolean */
  status: boolean;
  /** message as a string */
  message: string;
}

export interface ValidateSignupDetailsProps {
  /** firstName as a string */
  firstName: string;
  /** email as a string */
  email: string;
  /** password as a string */
  password: string;
  /** confirmPassword as a string */
  confirmPassword: string;
}
