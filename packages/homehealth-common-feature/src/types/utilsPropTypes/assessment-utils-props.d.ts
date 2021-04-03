export interface ValuesParamsProps {
  skill_id: number;
  value: any;
  metric_id: number;
}

export interface ExistingValuesFuncReturDataProps {
  indexFound: number;
  isFound: boolean;
}

export interface ValidateDataToAddAssessmentReturnProps {
  isValid: boolean;
  message: string;
  selectedValues: ValuesParamsProps[];
}

export interface CheckIfAnySelectedValueMissingFuncReturnProps {
  isValueMissing: boolean;
  message: string;
}
