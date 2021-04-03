import { InjectConfigurationSettingsProps } from '../types/control-settings-props';

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
