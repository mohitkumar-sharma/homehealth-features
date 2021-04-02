import strings from '../config/strings';
import customMessages from '../config/customMessages';
import accessibilityStrings from '../config/accessibilityStrings';

export interface Config {
  strings: typeof strings;
  customMessages: typeof customMessages;
  accessibilityStrings: typeof accessibilityStrings;
  noOfNextDaysAvailabilityDates: number;
  availabilitySlotStartTime: number;
  availabilitySlotEndTime: number;
}
