import { ScheduleListProps } from '../../types/schedule';
import { ApiErrorResponseProps } from '../../types/api-common-responses';
import { enumUtils } from '../../utils';

export interface PendingScheduleAcceptRejectResponseProps {
  /* as a boolean for isSucceeded by default false */
  isSucceeded?: boolean;
  /* as a boolean for isCompleted by default false (if api endpoint hits then will be true) */
  isCompleted?: boolean;
  /* as a string for message */
  message?: string;
  /* as an actionType for accept and reject api */
  actionType?: 'accept' | 'reject';
}

export interface ScheduleDataStateProps {
  /* as a type of ScheduleListProps or null */
  scheduleData?: ScheduleListProps | null;
  /* as a type of ApiErrorResponseProps or null */
  scheduleDataErrorResponse?: ApiErrorResponseProps | null;
  /* as an enum for filter data */
  filterText?: enumUtils.scheduleStatus;
  /* as a PendingScheduleAcceptRejectResponseProps for Accept and Reject api response */
  pendingScheduleAcceptRejectResponse?: PendingScheduleAcceptRejectResponseProps | null;
}
