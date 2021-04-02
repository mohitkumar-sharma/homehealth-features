export interface InjectConfigurationSettingsProps {
  reduxStore: any;
  apiBaseUrl: string;
}

const configurationSettings: InjectConfigurationSettingsProps = {
  reduxStore: null,
  apiBaseUrl: '',
};

export const injectConfigurationSettings = (props: InjectConfigurationSettingsProps): void => {
  const { reduxStore, apiBaseUrl } = props;
  configurationSettings.reduxStore = reduxStore;
  configurationSettings.apiBaseUrl = apiBaseUrl;
};

export { configurationSettings };
