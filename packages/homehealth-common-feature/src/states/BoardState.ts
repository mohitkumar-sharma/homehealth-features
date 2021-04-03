import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { BoardProps, BoardResultsProps } from '../types/otherPropTypes/board';
import { enumUtils } from '../utils';
import { BoardDataStateProps } from './statesPropsTypes/board-state-props';
import { ReduxStateProps } from './statesPropsTypes/redux-states-props';

const initialState: BoardDataStateProps = {
  /* as a null by default */
  boardData: null,
  /* as a null by default */
  boardDataErrorResponse: null,
  /* as Pending tab by default */
  filterText: enumUtils.scheduleStatus.PENDING,
};

/**
 * This function will save the patient board data to redux
 * @param state : state having BoardDataStateProps
 * @param action : action called from app with BoardProps
 */
const savePatientBoardData = (
  state: BoardDataStateProps,
  action: PayloadAction<BoardDataStateProps>,
): void => {
  state.boardData = action.payload.boardData;
  state.boardDataErrorResponse = null;
};

/**
 * This function will save the patient board data error response to redux
 * @param state : state having BoardDataStateProps
 * @param action : action called from app with BoardDataStateProps
 */
const savePatientBoardDataError = (
  state: BoardDataStateProps,
  action: PayloadAction<BoardDataStateProps>,
): void => {
  state.boardData = null;
  state.boardDataErrorResponse = action.payload.boardDataErrorResponse;
};

/**
 * This function will remove the patient board data error response from redux
 * @param state : state having BoardDataStateProps
 */
const removePatientBoardDataError = (state: BoardDataStateProps): void => {
  state.boardDataErrorResponse = null;
};

/**
 * This function will set the filter text
 * @param state : state having BoardDataStateProps
 * @param action : action called from app with BoardDataStateProps
 */
const manageFilterText = (
  state: BoardDataStateProps,
  action: PayloadAction<BoardDataStateProps>,
): void => {
  state.filterText = action.payload.filterText;
};

/* Signout Action */
const signOutAction = createAction('signout');

/* Board slice*/
const boardSlice = createSlice({
  name: 'board',
  initialState,
  extraReducers: (builder: any) => {
    builder.addCase(signOutAction, () => {
      return initialState;
    });
  },
  reducers: {
    saveBoardData: savePatientBoardData,
    saveBoardDataErrorResponse: savePatientBoardDataError,
    removeBoardDataErrorResponse: removePatientBoardDataError,
    setFilterText: manageFilterText,
  },
});

// Get actions from created BoardSlice
const {
  saveBoardData,
  saveBoardDataErrorResponse,
  removeBoardDataErrorResponse,
  setFilterText,
} = boardSlice.actions;

// SELECTOR
const selectBoardArray = ({ board }: ReduxStateProps): BoardResultsProps[] | [] =>
  board?.boardData?.results ?? [];

const selectFilteredBoardArray = ({ board }: ReduxStateProps): BoardResultsProps[] | [] => {
  let filteredBoardArr: BoardResultsProps[] | null | undefined = null;
  filteredBoardArr = board?.boardData?.results?.filter((obj: BoardResultsProps) => {
    return obj.status === board.filterText;
  });
  return filteredBoardArr ? filteredBoardArr : [];
};

const selectBoardPaginationData = ({ board }: ReduxStateProps): BoardProps | [] => {
  return {
    count: board?.boardData?.count ?? 0,
    next: board?.boardData?.next ?? 0,
    previous: board?.boardData?.previous ?? 0,
  };
};

const selectListDataStatus = ({ board }: ReduxStateProps): boolean => {
  if (
    !board ||
    !board.boardData ||
    !board.boardData.results ||
    board.boardData.results.length <= 0
  ) {
    return true;
  }
  return false;
};

const boardSliceReducer = boardSlice.reducer;

export {
  boardSliceReducer,
  saveBoardData,
  saveBoardDataErrorResponse,
  setFilterText,
  removeBoardDataErrorResponse,
  signOutAction,
  selectBoardArray,
  selectBoardPaginationData,
  selectFilteredBoardArray,
  selectListDataStatus,
};
