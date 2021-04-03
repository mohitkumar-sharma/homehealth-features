import config from '../config';
import { getAgeFromDOB } from './dateUtils';
import {
  ScheduleListPatientPersonalProfileProps,
  ScheduleListPracticeProfileProps,
} from '../types/otherPropTypes/schedule';
import {
  UpcomingPatientListPracticeProfileProps,
  UpcomingPatientListPatientPersonalProfileProps,
} from '../types/otherPropTypes/upcoming-patient-list';
import {
  PatientTextParamProps,
  CellTitleParamProps,
  GetIntersectionOfArrayFuncParams,
} from '../types/utilsPropTypes/common-utils-props';

/**
 * This function will construct the title for board type cells
 * @param { travelDistance, practiceName } : type of BoardCellTitleParamProps
 */
export const constructCellTitle = ({
  travelDistance,
  practiceName,
}: CellTitleParamProps): string => {
  const travelDist = travelDistance && travelDistance !== '' ? travelDistance : '0';
  return `${practiceName ? practiceName : ''} ${
    config.strings.PRACTICE_PATIENT_BOARD_STR
  } ${travelDist} ${config.strings.MILES_STR}`;
};

/**
 * This function will return the full gender string
 * @param gender : short form of gender like m/f
 */
export const getPatientGender = (gender?: string | null): string | null => {
  if (gender) {
    return gender.toLowerCase() === 'm' ? 'male' : 'female';
  }
  return null;
};

/**
 * This function will construct the patient string text for Board cell types
 * @param { dob, dobFormat, gender } : type of BoardPatientTextParamProps
 */
export const constructPatientText = ({ dob, dobFormat, gender }: PatientTextParamProps): string => {
  const dateOfBirth = dob && dob !== '' ? dob : new Date();
  const patientGender = getPatientGender(gender);
  return `${getAgeFromDOB({ dob: dateOfBirth, dobFormat })} ${config.strings.YEAR_OLD_STR} ${
    patientGender ? patientGender : ''
  }`;
};

/**
 * This function will construct the patient and provider address string text for cell types
 * @param data : can be of type ScheduleListPatientPersonalProfileProps or ScheduleListPracticeProfileProps,
 * UpcomingPatientListPatientPersonalProfileProps or UpcomingPatientListPracticeProfileProps
 */
export const constructPatientProviderAddressText = (
  data?:
    | ScheduleListPatientPersonalProfileProps
    | ScheduleListPracticeProfileProps
    | UpcomingPatientListPatientPersonalProfileProps
    | UpcomingPatientListPracticeProfileProps
    | null,
): string | null => {
  let completeAddr = null;
  if (!data) {
    return completeAddr;
  }
  if (data.address_1 && data.address_1 !== '') {
    completeAddr = data.address_1;
  }
  if (data.address_2 && data.address_2 !== '') {
    completeAddr += `, ${data.address_2}`;
  }
  if (data.city && data.city !== '') {
    completeAddr += `, ${data.city}`;
  }
  if (data.state && data.state !== '') {
    completeAddr += `, ${data.state}`;
  }
  if (data.country && data.country !== '') {
    completeAddr += `, ${data.country}`;
  }
  return completeAddr;
};

/**
 * This is a common function to compare two arrays and returns the intersection of 2 arrays
 * @param compareFunction : pass the function use to compare
 * @param oldArray : oldArray or array 2
 * @param newArray : newArray or array 1
 */
export const getIntersectionOfTwoArrays = ({
  compareFunction,
  oldArray,
  newArray,
}: GetIntersectionOfArrayFuncParams): any[] => {
  if (compareFunction && oldArray && newArray && oldArray.length > 0 && newArray.length > 0) {
    return newArray.filter((newItem) => {
      const indexFound = oldArray.findIndex((oldItem) => compareFunction(oldItem, newItem));
      return indexFound === -1;
    });
  }
  return newArray ? newArray : [];
};
