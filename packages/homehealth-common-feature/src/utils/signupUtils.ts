import config from '../config';
import { validateEmail, validatePassword } from './loginUtils';
import {
  SignupDetailsValidationResponseProps,
  ValidateSignupDetailsProps,
} from '../types/utilsPropTypes/signup-utils-props';

/**
 * This function checks the password as per specified regex for must have 8 characters,
 * at least 1 number, 1 uppercase, 1 lowercase and 1 special character
 * @param password : as an alphanumeric
 */
export const checkPasswordRegex = (password: string): SignupDetailsValidationResponseProps => {
  const uppercase = new RegExp(/[A-Z]/g);
  const lowercase = new RegExp(/[a-z]/g);
  const number = new RegExp(/[0-9]/g);
  const specialCharacter = new RegExp(/[!#$£%&'()*+,-./:;<=>?@^\\[\]\\"_`{|}~\\]/g);
  const minimumLength = new RegExp(/.{8,}/g);

  if (!uppercase.test(password)) {
    return { status: false, message: config.strings.PASSWORD_UPPERCASE_VALIDATION };
  }

  if (!lowercase.test(password)) {
    return { status: false, message: config.strings.PASSWORD_LOWERCASE_VALIDATION };
  }

  if (!number.test(password)) {
    return { status: false, message: config.strings.PASSWORD_NUMBER_VALIDATION };
  }

  if (!specialCharacter.test(password)) {
    return { status: false, message: config.strings.PASSWORD_SPECIAL_CHARACTER_VALIDATION };
  }

  if (!minimumLength.test(password)) {
    return { status: false, message: config.strings.PASSWORD_LENGTH_VALIDATION };
  }

  return { status: true, message: '' };
};

/**
 * This function will validate the password with some configs like password must contain 8 characters,
 * at least 1 number, 1 uppercase, 1 lowercase and 1 special character
 * @param password : as an alphanumeric
 * @param confirmPassword : as an alphanumeric
 */
export const validateSignupPassword = (
  password: string,
  confirmPassword: string,
): SignupDetailsValidationResponseProps => {
  const passwordRes = validatePassword(password);
  if (!passwordRes.status) {
    return passwordRes;
  }

  const passwordRegexResp = checkPasswordRegex(password);
  if (!passwordRegexResp.status) {
    return passwordRegexResp;
  }

  if (password !== confirmPassword) {
    return { status: false, message: config.strings.PASSWORD_CONFIRM_PASSWORD_NOT_MATCH_MSG };
  }

  return { status: true, message: '' };
};

/**
 * This function checks the validation of signup details
 * @param {string} email
 * @param {string} password
 */
export const validateSignupDetails = ({
  firstName,
  email,
  password,
  confirmPassword,
}: ValidateSignupDetailsProps): SignupDetailsValidationResponseProps => {
  if (!firstName || firstName.trim() === '') {
    return { status: false, message: config.strings.EMPTY_FIRST_NAME };
  }

  const emailRes = validateEmail(email.toLowerCase());
  if (!emailRes.status) {
    return emailRes;
  }

  const passwordRes = validateSignupPassword(password, confirmPassword);
  if (!passwordRes.status) {
    return passwordRes;
  }

  return { status: true, message: '' };
};
