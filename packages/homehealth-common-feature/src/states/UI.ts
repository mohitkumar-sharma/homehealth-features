import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { UIProps } from '../types/ui';

interface UISelectorProps {
  /* as a type of UserProps for selector*/
  ui: UIProps;
}

const initialState: UIProps = {
  /* is loading default value */
  isLoading: false,
  /* is internet connected default value */
  isInternetConnected: false,
  /* is splash loading default value */
  isSplashLoading: true,
};

/**
 * Show/Hide loader reducer handler
 * @param {Object} state - redux state
 * @param {Object} action - type and payload
 */
const showLoaderReducer = (state: UIProps, action: PayloadAction<boolean>): void => {
  state.isLoading = action.payload;
};

/**
 * internet connectivity reducer handler
 * @param {Object} state - redux state
 * @param {Object} action - type and payload
 */
const changeInternetConnectivityStateReducer = (
  state: UIProps,
  action: PayloadAction<boolean>,
): void => {
  state.isInternetConnected = action.payload;
};

/**
 * Save true if want to load splash handle other conditions in native codebases and
 * dispatch action with true/false
 *
 * @param {Object} state - redux state
 * @param {Object} action - type and payload
 */
const saveIsSplashLoadingReducer = (state: UIProps, action: PayloadAction<boolean>): void => {
  state.isSplashLoading = action.payload;
};

/* Signout Action */
const signOutAction = createAction('signout');

// REDUCER
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  extraReducers: (builder: any) => {
    builder.addCase(signOutAction, () => {
      return { isLoading: false, isSplashLoading: false };
    });
  },
  reducers: {
    showLoader: showLoaderReducer,
    changeInternetConnectivityState: changeInternetConnectivityStateReducer,
    saveIsSplashLoading: saveIsSplashLoadingReducer,
  },
});

// ACTIONS
const { showLoader, changeInternetConnectivityState, saveIsSplashLoading } = uiSlice.actions;

// SELECTOR
const selectLoader = ({ ui }: UISelectorProps): boolean => (ui.isLoading ? ui.isLoading : false);
const selectInternetConnectivity = ({ ui }: UISelectorProps): boolean =>
  ui.isInternetConnected ? ui.isInternetConnected : false;
const selectIsSplashLoading = ({ ui }: UISelectorProps): boolean =>
  ui.isSplashLoading ? ui.isSplashLoading : false;

const uiSliceReducer = uiSlice.reducer;

export {
  showLoader,
  changeInternetConnectivityState,
  saveIsSplashLoading,
  selectLoader,
  selectInternetConnectivity,
  selectIsSplashLoading,
  uiSliceReducer,
};
