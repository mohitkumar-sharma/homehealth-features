import moment from 'moment';
import config from '../config';
import { datesComparisonStatus } from './enumUtils';
import {
  DOBToAgeCoverterProps,
  DateToSectionDayTitleConverterProps,
  ConvertGeneralAvailabilityDateToDayProps,
} from '../types/utilsPropTypes/date-utils-props';

/**
 * This function converts the string date to texts like Today, Yesterday or date(eg. 10 Dec, 10 Dec 2019)
 * @param date : date is type of string passed in `MM-DD-YYYY` format
 */
export const convertDateToStringTexts = (date: Date): string => {
  const startOfToday = moment().startOf('day');
  const startOfDate = moment(date, 'MM-DD-YYYY').startOf('day');
  const daysDiff = startOfDate.diff(startOfToday, 'days');

  if (Math.abs(daysDiff) === 0) {
    return 'Today';
  }
  if (daysDiff === -1) {
    return 'Yesterday';
  }
  return moment(date, 'MM-DD-YYYY').format('Do MMM YYYY');
};

/**
 * This function calculates the age from date of birth
 * @param { dob, dobFormat } : type of DOBToAgeCoverterProps
 */
export const getAgeFromDOB = ({ dob, dobFormat }: DOBToAgeCoverterProps): string => {
  const dateOfBirth = moment(dob, dobFormat);
  const age = moment.duration(moment().diff(dateOfBirth));
  return `${age.years()}`;
};

/**
 * This function converts the string date to day, month and date text like Wednesday, Feb 20, 2021
 * @param { sectionDate, dateFormat } : type of DateToSectionDayTitleConverterProps
 */
export const convertDateToSectionDayTitle = ({
  sectionDate,
  dateFormat,
}: DateToSectionDayTitleConverterProps): string => {
  const date = moment(sectionDate, dateFormat);
  return moment(date, dateFormat).format('dddd, MMM DD, YYYY');
};

/**
 * This function will convert the hours from 24hr format to 12hr format
 * @param hour : can be string or number
 */
export const convert24hrsInTo12hrs = (hour: string | number): string => {
  const time = moment(hour, 'hh').format('LT');
  return time;
};

/**
 * This function will convert the date to any dateformat passed in to params
 * @param date : the date as string
 * @param dfm : dateFormat as string
 */
export const convertDateToOtherFormat = (date: string | Date, dfm?: string): string => {
  let dateFormatStr = config.strings.DFM_PATIENT_LIST_CALENDAR_SELECTION_DATE;
  if (dfm && dfm !== '') {
    dateFormatStr = dfm;
  }
  return moment(date).format(dateFormatStr);
};

/**
 * This function will return an object of ConvertGeneralAvailabilityDateToDayProps having daya and date
 * @param givenDate : the default date given as string
 */
export const convertGeneralAvailabilityDateToDay = (
  givenDate: string | null,
): ConvertGeneralAvailabilityDateToDayProps => {
  let convertedObj: ConvertGeneralAvailabilityDateToDayProps = { date: '', day: '' };
  if (givenDate && givenDate !== '') {
    const day = moment(givenDate).format('ddd');
    const date = moment(givenDate).format('DD');
    convertedObj = { date, day };
  }
  return convertedObj;
};

/**
 * This function will compare two dates and returns the results and Results are based on first date like
 * date1 is lesser than date2, date1 is greater than date2 or date1 and date2 are equal
 * @param date1 : first date as string
 * @param date2 : second date as string
 */
export const compareDateStrings = (date1?: string, date2?: string): datesComparisonStatus => {
  let result = datesComparisonStatus.NONE;
  if (date1 && date2 && date1 !== '' && date2 !== '') {
    const date1Timestamp = new Date(date1).getTime();
    const date2Timestamp = new Date(date2).getTime();
    if (date1Timestamp === date2Timestamp) {
      result = datesComparisonStatus.EQUAL;
    }

    if (date1Timestamp < date2Timestamp) {
      result = datesComparisonStatus.LESSER;
    }

    if (date1Timestamp > date2Timestamp) {
      result = datesComparisonStatus.GREATER;
    }
  }
  return result;
};

/**
 * This function will format the 24hrs format time
 * @param hour : can be string or number
 */
export const formatTimeInHrsForAvailability = (hour?: string | number): string => {
  const time = moment(hour, 'HH').format('HH:mm');
  return time;
};

/**
 * This function will generate the next date after adding the days passed
 * @param days : no of days to be added to the current date
 */
export const generateNextDateFromCurrentDate = (days: number): string => {
  const currentDate = moment(new Date(), 'YYYY-MM-DD');
  let generatedDate = currentDate.toISOString();
  if (days) {
    generatedDate = moment(currentDate, 'YYYY-MM-DD').add(days, 'days').toISOString();
  }
  return generatedDate;
};

/**
 * This function returns the month from the given date
 * @param date : date in iso string
 */
export const getMonthFromDate = (date: string): string => {
  let month = '';
  if (date) {
    month = moment(date).format('MMMM');
  }
  return month;
};

/**
 * This function will convert the date in to weekday
 * @param date : given date
 */
export const convertDateInToWeekday = (date?: string): string => {
  let weekday = '';
  if (date && date !== '') {
    weekday = moment(date).format('dddd');
  }
  return weekday;
};

/**
 * This function will get the current timestap
 */
export const getCurrentTimestamp = (): string => new Date().getTime().toString();
