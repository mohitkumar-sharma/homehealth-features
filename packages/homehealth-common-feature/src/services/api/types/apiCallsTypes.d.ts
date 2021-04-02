export interface ApiCallsProps {
  /* as a string for type of api and fetched from apiCallTypes */
  apiType: string;
}

export interface ApiCallsReturnProps {
  /* as a string for type of request POST/GET/PUT/DELETE */
  requestType: string;
  /* as a string for container url of api request */
  requestUrl: string;
}
