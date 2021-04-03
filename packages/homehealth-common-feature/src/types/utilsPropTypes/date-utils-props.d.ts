export interface DOBToAgeCoverterProps {
  dob: string | Date;
  dobFormat: string;
}

export interface DateToSectionDayTitleConverterProps {
  sectionDate: string | Date;
  dateFormat: string;
}

export interface ConvertGeneralAvailabilityDateToDayProps {
  date: string;
  day: string;
}
