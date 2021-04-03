export interface PatientTextParamProps {
  dob?: string | null;
  dobFormat: string;
  gender?: string | null;
}

export interface CellTitleParamProps {
  travelDistance?: number | string | null;
  practiceName?: string | null;
}

export interface GetIntersectionOfArrayFuncParams {
  /* pass the function to compare*/
  compareFunction?: (oldItem?: any, newItem?: any) => void;
  /* consider as array to be a filteration */
  oldArray?: any[] | null;
  /* consider as array to be filter */
  newArray?: any[] | null;
}
