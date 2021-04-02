import config from '../config';

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

/**
 * This function will validate the email address by validating '@' and '.' in email address
 * @param {String} email : email address string
 * @returns
 */
export const validateEmail = (email: string): ValidationResponseProps => {
  const trimmedEmail = email.trim();
  const position = trimmedEmail.lastIndexOf('@');
  const indexOfDot = trimmedEmail.lastIndexOf('.');
  if (trimmedEmail !== '' && position > 0 && indexOfDot > position && email.length - position > 4) {
    return { status: true, message: '' };
  }
  return { status: false, message: config.strings.INVALID_EMAIL_ID_MSG };
};

/**
 * Function: password validation
 * @param {string} password
 * @returns
 */
export const validatePassword = (password: string): ValidationResponseProps => {
  if (password === '') {
    return { status: false, message: config.strings.EMPTY_PASSWORD_MSG };
  }
  return { status: true, message: '' };
};

/**
 * This function checks the validation of login credentials
 * @param {string} email
 * @param {string} password
 */
export const validateLoginCredentials = ({
  email,
  password,
}: ValidateLoginCredentialsProps): ValidationResponseProps => {
  const emailRes = validateEmail(email.toLowerCase());
  if (!emailRes.status) {
    return emailRes;
  }
  const passwordRes = validatePassword(password);
  if (!passwordRes.status) {
    return passwordRes;
  }

  return { status: true, message: '' };
};
