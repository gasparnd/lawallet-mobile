import {NativeModules, Platform} from 'react-native';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import es from './locales/es/globals.json';
import en from './locales/en/globals.json';

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

const resources = {
  // list of languages
  es: {translation: es},
  en: {translation: en},
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
    resources,
    lng: deviceLanguage, // default language to use.
    fallbackLng: 'en',
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
