import config from '../config';
import {
  generateNextDateFromCurrentDate,
  formatTimeInHrsForAvailability,
  compareDateStrings,
  convertDateInToWeekday,
} from './dateUtils';
import { datesComparisonStatus } from './enumUtils';
import {
  CommonAvailabilityProps,
  CommonAvailabilitySlotsProps,
  GeneralAvailabilityProps,
  GeneralAvailabilitySlotsProps,
} from '../types/availability';
import { availabilityStatus } from './enumUtils';

/**
 * This function generates the next days date. how many next dates depends on the value of `noOfNextDaysAvailabilityDates`
 * in config local
 */
export const generateNextDaysAvailabilityDatesArr = (): string[] => {
  const nextSevenDaysDates: string[] = [];
  for (let index = 0; index < config.noOfNextDaysAvailabilityDates; index++) {
    const newDate = generateNextDateFromCurrentDate(index);
    nextSevenDaysDates.push(newDate);
  }
  return nextSevenDaysDates;
};

/**
 * This function generates the slot timimgs. From when to when depends on the values of `availabilitySlotStartTime`
 * and `availabilitySlotEndTime` in config local
 */
export const generateSlotTimesArr = (): { time: string; slot: string }[] => {
  const slotTimes: { time: string; slot: string }[] = [];
  const toIndex = config.availabilitySlotEndTime + 1 - config.availabilitySlotStartTime;
  for (let index = 0; index < toIndex; index++) {
    const time = config.availabilitySlotStartTime + index;
    const slot = formatTimeInHrsForAvailability(time);
    slotTimes.push({ time: time.toString(), slot });
  }
  return slotTimes;
};

/**
 * This function will draft the slots as per need
 */
export const generateSlotsArr = (): CommonAvailabilitySlotsProps[] => {
  const slotsArr: CommonAvailabilitySlotsProps[] = [];
  const slotTimesArr = generateSlotTimesArr();
  slotTimesArr.forEach((obj) => {
    const slot: CommonAvailabilitySlotsProps = {
      time: obj.time,
      slot: obj.slot,
      appointment: availabilityStatus.NOT_AVAILABLE,
    };
    slotsArr.push(slot);
  });
  return slotsArr;
};

/**
 * This function will generate the 2D array for availability slots
 */
export const generateAvailabilitySlots2DArr = (): CommonAvailabilityProps[] => {
  const availabilitySlotsArr: CommonAvailabilityProps[] = [];
  const dates = generateNextDaysAvailabilityDatesArr();
  const slotsArr = generateSlotsArr();
  dates.forEach((value) => {
    const weekday = convertDateInToWeekday(value);
    const availabilitySlots: CommonAvailabilityProps = { date: value, weekday, slots: slotsArr };
    availabilitySlotsArr.push(availabilitySlots);
  });
  return availabilitySlotsArr;
};

/**
 * This function returns the parsed general availability array
 * @param apiDataSlots : array of api general availability slots
 */
export const getParsedGeneralAvailabilityArr = (
  apiDataSlots: GeneralAvailabilitySlotsProps[],
): CommonAvailabilityProps[] => {
  const genAvailability2DArr = generateAvailabilitySlots2DArr();
  const newGenAvailability2DArr = genAvailability2DArr.map((sectionObject) => {
    const apiDataWeekdayIndexFound = apiDataSlots.findIndex(
      (apiSlotObj) => apiSlotObj.weekday === sectionObject.weekday,
    );
    if (apiDataWeekdayIndexFound !== -1 && sectionObject.slots && sectionObject.slots.length > 0) {
      const slotsArr: CommonAvailabilitySlotsProps[] = [...sectionObject.slots];
      const newSlots = slotsArr.map((rowObject: CommonAvailabilitySlotsProps) => {
        const apiDataSlotIndexFound = apiDataSlots.findIndex(
          (apiSlotObj) => rowObject.slot === formatTimeInHrsForAvailability(apiSlotObj.slot),
        );
        const newRowObject: CommonAvailabilitySlotsProps = Object.assign({}, rowObject);
        if (apiDataSlotIndexFound !== -1) {
          newRowObject.appointment = availabilityStatus.AVAILABLE;
          return newRowObject;
        }
        return newRowObject;
      });
      const newSectionObject = {
        date: sectionObject.date,
        weekday: sectionObject.weekday,
        slots: newSlots,
      };
      return newSectionObject;
    }
    return sectionObject;
  });

  return newGenAvailability2DArr;
};

/**
 * This function will compare the local data arrays with api data arrays
 * @param apiData : data coming from api call
 */
export const getGeneralAvailabilities2DArr = (
  apiData?: GeneralAvailabilityProps | null,
): CommonAvailabilityProps[] => {
  const parsedArr = getParsedGeneralAvailabilityArr(apiData?.dt_slots ?? []);
  return parsedArr;
};

/**
 * This function is useful for checking whether the day is already selected or not
 * @param originalData : is of type GeneralAvailabilityResultProps
 */
export const isDaySelected = (
  originalData: CommonAvailabilityProps,
  selectedDayCard?: CommonAvailabilityProps,
): boolean => {
  if (selectedDayCard) {
    const prevSelectedData = selectedDayCard;
    const status = compareDateStrings(prevSelectedData.date, originalData.date);
    return status === datesComparisonStatus.EQUAL ? true : false;
  }
  return false;
};
