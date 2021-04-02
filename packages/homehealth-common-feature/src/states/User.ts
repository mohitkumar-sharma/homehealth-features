import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { UserProps } from '../types/user';

interface UserSelectorProps {
  /* as a type of UserProps for selector*/
  user: UserProps;
}

const initialState: UserProps = {
  /* id of user provided */
  id: null,
  /* username of user provided */
  username: null,
  /* email of user provided */
  email: null,
  /* first_name of user provided */
  first_name: null,
  /* last_name of user provided */
  last_name: null,
  /* status of account provided */
  is_active: false,
  /* token of login provided */
  token: null,
  /* loginError response */
  loginErrorResponse: null,
  /* signupError response */
  signupErrorResponse: null,
};

/**
 * This function will save the user data when logging in successfull to redux
 * @param state : state having UserProps
 * @param action : action called from app with UserProps
 */
const saveLoginUserData = (state: UserProps, action: PayloadAction<UserProps>): void => {
  const { id, username, email, first_name, last_name, is_active, token } = action.payload;
  state.id = id ? id : state.id;
  state.username = username ? username : state.username;
  state.email = email ? email : state.email;
  state.first_name = first_name ? first_name : state.first_name;
  state.last_name = last_name ? last_name : state.last_name;
  state.is_active = is_active !== undefined && is_active !== null ? is_active : state.is_active;
  state.token = token ? token : state.token;
  state.loginErrorResponse = null;
  state.signupErrorResponse = null;
};

/**
 * This function will save the login error response to redux
 * @param state : state having UserProps
 * @param action : action called from app with UserProps
 */
const saveLoginError = (state: UserProps, action: PayloadAction<UserProps>): void => {
  const { loginErrorResponse } = action.payload;
  state.loginErrorResponse = loginErrorResponse ? loginErrorResponse : state.loginErrorResponse;
  state.signupErrorResponse = null;
};

/**
 * This function will remove the login error response from redux
 * @param state : state having UserProps
 */
const removeLoginError = (state: UserProps): void => {
  state.loginErrorResponse = null;
  state.signupErrorResponse = null;
};

/**
 * This function will save the signup error response to redux
 * @param state : state having UserProps
 * @param action : action called from app with UserProps
 */
const saveSignupError = (state: UserProps, action: PayloadAction<UserProps>): void => {
  const { loginErrorResponse } = action.payload;
  state.loginErrorResponse = loginErrorResponse ? loginErrorResponse : state.loginErrorResponse;
  state.signupErrorResponse = null;
};

/**
 * This function will remove the signup error response from redux
 * @param state : state having UserProps
 */
const removeSignupError = (state: UserProps): void => {
  state.loginErrorResponse = null;
  state.signupErrorResponse = null;
};

/* Signout Action */
const signOutAction = createAction('signout');

/* User slice*/
const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder: any) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveUserLogin: saveLoginUserData,
    saveLoginErrorResponse: saveLoginError,
    saveSignupErrorResponse: saveSignupError,
    removeLoginErrorResponse: removeLoginError,
    removeSignupErrorResponse: removeSignupError,
  },
});

// Get actions from created UserSlice
const {
  saveUserLogin,
  saveLoginErrorResponse,
  saveSignupErrorResponse,
  removeLoginErrorResponse,
  removeSignupErrorResponse,
} = userSlice.actions;

// SELECTOR
const selectUser = ({ user }: UserSelectorProps): UserProps => user;
const selectUserId = ({ user }: UserSelectorProps): number | null => user.id ?? null;
const selectIsUserLoggedIn = ({ user }: UserSelectorProps): boolean => (user.id ? true : false);
const selectLoginErrorResponse = ({ user }: UserSelectorProps): string | null => {
  let errorMsg = null;
  if (user.loginErrorResponse?.status === false) {
    errorMsg = user.loginErrorResponse.message;
  }
  return errorMsg;
};
const selectSignupErrorResponse = ({ user }: UserSelectorProps): string | null => {
  let errorMsg = null;
  if (user.signupErrorResponse?.status === false) {
    errorMsg = user.signupErrorResponse.message;
  }
  return errorMsg;
};

const userSliceReducer = userSlice.reducer;

export {
  userSliceReducer,
  saveUserLogin,
  saveLoginErrorResponse,
  saveSignupErrorResponse,
  selectUser,
  selectUserId,
  selectIsUserLoggedIn,
  selectLoginErrorResponse,
  selectSignupErrorResponse,
  signOutAction,
  removeLoginErrorResponse,
  removeSignupErrorResponse,
};
