import {
  UpcomingPatientListResultsProps,
  UpcomingPatientSectionedListResultProps,
} from '../types/otherPropTypes/upcoming-patient-list';
import moment from 'moment';
import { convertDateToOtherFormat } from './dateUtils';
import config from '../config';

/**
 * This function will sort the patient list array based on dates in timeslot
 * @param dataArray : is of type UpcomingPatientListResultsProps
 * @param order : order can be 'ascending' or 'descending'
 */
export const sortPatientListArrOnTimeslotDate = (
  dataArray: UpcomingPatientListResultsProps[],
  order: 'ascending' | 'descending',
): UpcomingPatientListResultsProps[] => {
  let sortedUniqueData = dataArray;
  if (dataArray.length > 0) {
    const dfm = config.strings.DFM_PATIENT_LIST_HEADER_DATE;
    sortedUniqueData = dataArray.sort((a, b: any) => {
      let val = moment(a.timeslot?.date, dfm) - moment(b.timeslot?.date, dfm);
      if (order === 'descending') {
        val = moment(b.timeslot?.date, dfm) - moment(a.timeslot?.date, dfm);
      }
      return val;
    });
  }
  return sortedUniqueData;
};

/**
 * This function will get the unique dates from array object
 * @param dataArray : is of type UpcomingPatientSectionedListResultProps
 */
export const getUniqueDates = (dataArray: UpcomingPatientListResultsProps[]): string[] | [] => {
  const uniqueArr = [...Array.from(new Set(dataArray.map((data) => data.timeslot?.date ?? '')))];
  return uniqueArr;
};

/**
 * This function will parse the simple array in to 2D array
 * @param dataArray : is of type UpcomingPatientSectionedListResultProps
 */
export const getSectionedPatientList = (
  dataArray?: UpcomingPatientListResultsProps[],
): UpcomingPatientSectionedListResultProps[] | [] => {
  const sectionedDataArray: UpcomingPatientSectionedListResultProps[] = [];
  if (dataArray && dataArray.length > 0) {
    const uniqueDates: string[] | [] = getUniqueDates(dataArray);
    uniqueDates.forEach((value) => {
      if (value && value !== '') {
        const data = dataArray.filter((obj) => {
          return value === obj.timeslot?.date;
        });
        const sectionObject: any = { title: value, data };
        sectionedDataArray.push(sectionObject);
      }
    });
  }
  return sectionedDataArray;
};

/**
 * This function creates an array for marking the dates having data
 */
export const getMarkedDatesForCalendar = (
  sectionedData: UpcomingPatientSectionedListResultProps[],
): any => {
  const marked: any = {};
  sectionedData.forEach((item: any) => {
    // NOTE: only mark dates with data
    if (item.data.length > 0) {
      const convertedDate = convertDateToOtherFormat(item.title);
      marked[convertedDate] = {
        marked: true,
        // dotColor: config.colors.appThemeBlue,
      };
    } else {
      marked[item.title] = { disabled: true };
    }
  });
  return marked;
};
