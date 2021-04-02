import strings from './strings';
import { Config } from '../types/config';
import customMessages from './customMessages';
import accessibilityStrings from './accessibilityStrings';
import constants from './constants';

const config: Partial<Config> = {
  ...constants,
  strings,
  customMessages,
  accessibilityStrings,
};

export default config as Config;
