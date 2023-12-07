/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {CustomDarkTheme, CustomLightTheme} from 'constants/themes';

import Router from 'navigation/Router';
import {AuthProvider, UserProvider} from 'context';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer
      theme={isDarkMode ? CustomDarkTheme : CustomLightTheme}>
      <UserProvider>
        <AuthProvider>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={CustomDarkTheme.colors.background}
          />
          <Router />
        </AuthProvider>
      </UserProvider>
    </NavigationContainer>
  );
}

export default App;
