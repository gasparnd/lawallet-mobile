/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {CustomDarkTheme, CustomLightTheme} from 'constants/themes';

import Router from 'navigation/Router';
import {AuthProvider} from 'context';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer
      theme={isDarkMode ? CustomDarkTheme : CustomLightTheme}>
      <AuthProvider>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Router />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
