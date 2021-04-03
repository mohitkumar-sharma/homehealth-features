import { ApiErrorResponseProps } from './api-common-responses';

export interface UserProps {
  /* as a number of user id */
  id?: number | null;
  /* as a string of user name */
  username?: string | null;
  /* as a string of user email */
  email?: string | null;
  /* as a string of user first name */
  first_name?: string | null;
  /* as a string of user last name */
  last_name?: string | null;
  /* as a boolean of user account status */
  is_active?: boolean | undefined | null;
  /* as a string of login token */
  token?: string | null;
  /* as a ApiErrorResponseProps object of login error response */
  loginErrorResponse?: ApiErrorResponseProps | null;
  /* as a ApiErrorResponseProps object of login error response */
  signupErrorResponse?: ApiErrorResponseProps | null;
}
