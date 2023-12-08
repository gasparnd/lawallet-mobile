/**
 * @format
 */
import 'text-encoding';
import 'react-native-get-random-values';

import {AppRegistry} from 'react-native';

import './app/localization/i18n';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
