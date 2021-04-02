import { BoardProps } from '../../types/board';
import { ApiErrorResponseProps } from '../../types/api-common-responses';
import { enumUtils } from '../../utils';

export interface BoardDataStateProps {
  /* as a type of BoardProps or null */
  boardData?: BoardProps | null;
  /* as a type of ApiErrorResponseProps or null */
  boardDataErrorResponse?: ApiErrorResponseProps | null;
  /* as an enum for filter data */
  filterText?: enumUtils.scheduleStatus;
}
