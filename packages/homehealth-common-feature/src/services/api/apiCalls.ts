import apiCallTypes from './apiCallTypes';
import apiContainersUrl from './apiContainersUrl';
import { ApiCallsProps, ApiCallsReturnProps } from './types/apiCallsTypes';

/**
 * This function is responsible to decide the requestType and requestUrl of api calls
 * @param {ApiCallsProps} apiType
 */
export const apiCalls = ({ apiType }: ApiCallsProps): ApiCallsReturnProps => {
  let requestType = '';
  let requestUrl = '';
  switch (apiType) {
    /* POST requests */
    case apiCallTypes.LOGIN:
      requestType = 'POST';
      requestUrl = apiContainersUrl.LOGIN_URL;
      break;

    case apiCallTypes.SIGNUP:
      requestType = 'POST';
      requestUrl = apiContainersUrl.SIGNUP_URL;
      break;

    case apiCallTypes.SCHEDULE_APPOINTMENT_ACCEPT:
      requestType = 'POST';
      requestUrl = apiContainersUrl.SCHEDULE_APPOINTMENT_ACCEPT_URL;
      break;

    case apiCallTypes.SCHEDULE_APPOINTMENT_REJECT:
      requestType = 'POST';
      requestUrl = apiContainersUrl.SCHEDULE_APPOINTMENT_REJECT_URL;
      break;

    case apiCallTypes.COMPLETE_APPOINTMENT:
      requestType = 'POST';
      requestUrl = apiContainersUrl.COMPLETE_APPOINTMENT_URL;
      break;

    case apiCallTypes.POST_GENERAL_AVAILABILITY:
      requestType = 'POST';
      requestUrl = apiContainersUrl.POST_GENERAL_AVAILABILITY_URL;
      break;

    /* GET requests */
    case apiCallTypes.BOARD_LIST:
      requestType = 'GET';
      requestUrl = apiContainersUrl.BOARD_LIST_URL;
      break;

    case apiCallTypes.SCHEDULE_LIST:
      requestType = 'GET';
      requestUrl = apiContainersUrl.SCHEDULE_LIST_URL;
      break;

    case apiCallTypes.UPCOMING_PATIENT_LIST:
      requestType = 'GET';
      requestUrl = apiContainersUrl.UPCOMING_PATIENT_LIST_URL;
      break;

    case apiCallTypes.NEW_FULLFILLMENTS_SEARCH_QUERY:
      requestType = 'GET';
      requestUrl = apiContainersUrl.NEW_FULLFILLMENTS_SEARCH_QUERY_URL;
      break;

    case apiCallTypes.GET_GENERAL_AVAILABILITY:
      requestType = 'GET';
      requestUrl = apiContainersUrl.GET_GENERAL_AVAILABILITY_URL;
      break;

    case apiCallTypes.GET_UPCOMING_AVAILABILITY:
      requestType = 'GET';
      requestUrl = apiContainersUrl.GET_UPCOMING_AVAILABILITY_URL;
      break;

    default:
      break;
  }

  return { requestType, requestUrl };
};
