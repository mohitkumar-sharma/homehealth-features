import {
  FullfillmentListProps,
  FullfillmentListResultsProps,
} from '../../types/otherPropTypes/fullfillment-list';

export interface NewFullfillmentsListDataStateProps {
  /* as a type of FullfillmentListProps or null */
  newFullfillmentsListData?: FullfillmentListProps | null;
  /* as a type of FullfillmentListResultsProps or null */
  previousFullfillmentArr?: FullfillmentListResultsProps[] | null;
}
