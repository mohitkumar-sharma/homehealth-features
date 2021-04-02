import Axios, { AxiosError } from 'axios';
import * as ApiCalls from './apiCalls';
import { HTTPRequestProps } from './types/apiServiceTypes';
import * as controls from '../../controls';

/**
 * This function get the auth token from store
 */
const getAuthCredentials = (): string => {
  const { configurationSettings } = controls.settings;
  const userData = configurationSettings.reduxStore?.getState?.()?.user;
  return userData && userData.token ? `Token ${userData.token}` : '';
};

/**
 * This function will hit a POST request given
 * @param {string} apiUrl
 * @param {unknown} jsonBody
 */
export const httpPostRequest = async ({ apiUrl, jsonBody }: HTTPRequestProps): Promise<unknown> => {
  return await Axios.post(apiUrl, jsonBody, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getAuthCredentials(),
    },
  })
    .then((response: any) => {
      return { response, isSucceded: true };
    })
    .catch((error: any) => {
      const excep = error as AxiosError;
      return { response: excep.response, isSucceded: false };
    });
};

/**
 * This function will hit a GET request given
 * @param {string} apiUrl
 */
export const httpGetRequest = async ({ apiUrl }: HTTPRequestProps): Promise<unknown> => {
  return await Axios.get(apiUrl, {
    headers: {
      Authorization: getAuthCredentials(),
    },
  })
    .then((response: any) => {
      return { response, isSucceded: true };
    })
    .catch((error: any) => {
      const excep = error as AxiosError;
      return { response: excep.response, isSucceded: false };
    });
};

/**
 * This is an actual function for calling api service and it will decide whether the api call will be
 * GET or POST request
 * @param {string} apiType
 * @param {any} jsonBody
 */
export const callApiService = async (apiType: string, jsonBody: any): Promise<unknown> => {
  const { configurationSettings } = controls.settings;
  const request = ApiCalls.apiCalls({ apiType });
  let apiUrl = `${configurationSettings.apiBaseUrl}${request.requestUrl}`;
  if (request.requestType === 'POST') {
    return await httpPostRequest({ apiUrl, jsonBody });
  } else if (request.requestType === 'GET') {
    if (jsonBody?.searchText) {
      apiUrl = `${apiUrl}${jsonBody.searchText}`;
    }
    return await httpGetRequest({ apiUrl });
  }
};
