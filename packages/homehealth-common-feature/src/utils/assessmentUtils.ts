import { UpcomingPatientListFullfillmentProps } from '../types/otherPropTypes/upcoming-patient-list';
import config from '../config';
import {
  ValuesParamsProps,
  ExistingValuesFuncReturDataProps,
  ValidateDataToAddAssessmentReturnProps,
  CheckIfAnySelectedValueMissingFuncReturnProps,
} from '../types/utilsPropTypes/assessment-utils-props';

/**
 * This function will check whether the item is already selected or not
 * @param prevSelectedItems : array of already selected items
 * @param newItem : the new item to match
 */
export const isItemAlreadySelected = (
  prevSelectedItems: any,
  newItem: any,
): boolean | undefined => {
  return prevSelectedItems.find((obj: any) => {
    return obj.pk === newItem.pk;
  });
};

/**
 * This function gets the array of selected cards indexes
 * @param itemIndex : passed item index
 * @param selectedCards : previously selected cards
 */
export const getSelectedCardsArray = (
  item?: UpcomingPatientListFullfillmentProps | null,
  selectedCards?: UpcomingPatientListFullfillmentProps[],
): UpcomingPatientListFullfillmentProps[] => {
  const prevSelectedCardsArr = Object.assign([], selectedCards);
  if (item) {
    const indexOfItem = prevSelectedCardsArr.indexOf(item);
    if (indexOfItem !== -1) {
      prevSelectedCardsArr.splice(indexOfItem, 1);
    } else {
      prevSelectedCardsArr.push(item);
    }
  }
  return prevSelectedCardsArr;
};

/**
 * This function will compare pk or id of 2 fullfillments array
 * @param oldItem : item from old array
 * @param newItem : item from new array
 */
export const compareFullfillmentsPk = (oldItem: any, newItem: any): any => {
  return oldItem.pk === newItem.pk;
};

/**
 * This function will check if value exists in values local state array
 * @param values : local state array
 * @param newItem : item which is being texts
 */
export const checkExistenceInValuesArray = (
  values: ValuesParamsProps[],
  newItem: UpcomingPatientListFullfillmentProps,
): ExistingValuesFuncReturDataProps => {
  const indexFound = values.findIndex((obj) => obj.skill_id === newItem.pk);
  return { indexFound, isFound: indexFound !== -1 };
};

/**
 * This function will handle the changed text of dynamic input fields on assessment screen
 * @param values : array of values objects
 * @param newItem : newItem which is being inputted
 * @param newText : text returns when changing text in input field
 */
export const handleAssessmentOnChangeText = (
  values: ValuesParamsProps[],
  newText: string,
  newItem: UpcomingPatientListFullfillmentProps,
  isToAddNewValueOnly: boolean,
): ValuesParamsProps[] => {
  const valuesObject: ValuesParamsProps = {
    skill_id: newItem.pk ?? -1,
    value: newText !== '' ? parseFloat(newText) : '',
    metric_id: newItem.metrics?.[0]?.pk ?? -1,
  };
  const { indexFound, isFound }: ExistingValuesFuncReturDataProps = checkExistenceInValuesArray(
    values,
    newItem,
  );
  if (isFound) {
    if (!isToAddNewValueOnly) {
      values[indexFound] = valuesObject;
    }
  } else {
    values.push(valuesObject);
  }
  return values;
};

/**
 * This function will get the correct value from corresponding values array
 * @param values : array of values
 * @param newItem : newItem to be inputted
 */
export const getTextInputValue = (
  values: ValuesParamsProps[],
  newItem: UpcomingPatientListFullfillmentProps,
): any => {
  const { indexFound, isFound }: ExistingValuesFuncReturDataProps = checkExistenceInValuesArray(
    values,
    newItem,
  );
  let value: any = '';
  if (isFound) {
    value = values[indexFound].value;
  }
  return value;
};

/**
 * This function will get the selected values
 * @param selectedCards : cards selected
 * @param values : all values array
 */
export const getSelectedValues = (
  selectedCards: any,
  values: ValuesParamsProps[],
): ValuesParamsProps[] => {
  if (selectedCards && selectedCards.length > 0 && values.length > 0) {
    return values.filter((valuesItem: any) => {
      const indexFound = selectedCards.findIndex(
        (cardsItem: any) => valuesItem.skill_id === cardsItem.pk,
      );
      return indexFound !== -1;
    });
  }
  return values;
};

/**
 * This function checks the missing values and shows the toast
 * @param selectedValues : values selected
 * @param selectedCards : cards selected
 */
export const checkIfAnySelectedValueMissing = (
  selectedValues: ValuesParamsProps[],
  selectedCards: any,
): CheckIfAnySelectedValueMissingFuncReturnProps => {
  const findedValue = selectedValues.find(
    (valueObj) => valueObj.value === '' && valueObj.metric_id !== -1,
  );
  let data = { isValueMissing: false, message: '' };
  if (findedValue) {
    let msg = config.strings.EMPTY_DYNAMIC_SELECTED_INPUT_FEILDS;
    const selectedCard: UpcomingPatientListFullfillmentProps | null = selectedCards.find(
      (obj: UpcomingPatientListFullfillmentProps) => obj.pk === findedValue.skill_id,
    );
    if (selectedCard) {
      msg = `${config.strings.ENTER_VALUE_IN_TEXT} ${selectedCard.title?.trim()} ${
        config.strings.OR_UNSELECT_IT_TEXT
      }`;
    }
    data = { isValueMissing: true, message: msg };
  }
  return data;
};

/**
 * This function returns the selected values and validation as a boolean
 * @param selectedCards : cards selected
 * @param values : all values array
 */
export const validateDataToAddAssessment = (
  selectedCards: any,
  values: ValuesParamsProps[],
): ValidateDataToAddAssessmentReturnProps => {
  if (selectedCards && selectedCards.length > 0) {
    const selectedValues: ValuesParamsProps[] = getSelectedValues(selectedCards, values);
    const { isValueMissing, message } = checkIfAnySelectedValueMissing(
      selectedValues,
      selectedCards,
    );
    return { isValid: !isValueMissing, message, selectedValues };
  }
  return {
    isValid: false,
    message: config.strings.EMPTY_DYNAMIC_INPUT_UNSELECTED_FEILDS,
    selectedValues: values,
  };
};

/**
 * This function will call to prepare the payload for adding assessment
 * @param selectedValues : array of selected values
 * @param notes : notes as a string
 * @param appointmentId : pk or appointment id of patient data
 */
export const getAddAssessmentPayload = (
  selectedValues: ValuesParamsProps[],
  notes: string,
  appointmentId: string,
): any => {
  if (appointmentId !== '') {
    const payload = {
      appointment_id: appointmentId,
      skills: selectedValues,
      comments: notes,
    };
    return payload;
  }
  return null;
};
