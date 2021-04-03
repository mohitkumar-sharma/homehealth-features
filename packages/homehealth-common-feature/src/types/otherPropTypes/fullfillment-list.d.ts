export interface FullfillmentListMetricsProps {
  title?: string | null;
  pk?: number | null;
}

export interface FullfillmentListResultsProps {
  title?: string | null;
  pk?: number | null;
  metrics?: FullfillmentListMetricsProps[] | [] | null;
}

export interface FullfillmentListProps {
  count?: number | null;
  next?: any | null;
  previous?: any | null;
  results?: FullfillmentListResultsProps[] | [] | null;
}
