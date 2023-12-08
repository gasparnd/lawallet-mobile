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
import {AuthProvider, UserProvider, NDKProvider} from 'context';

import {RelaysList} from 'constants/relays';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer
      theme={isDarkMode ? CustomDarkTheme : CustomLightTheme}>
      <NDKProvider explicitRelayUrls={RelaysList}>
        <UserProvider>
          <AuthProvider>
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={CustomDarkTheme.colors.background}
            />
            <Router />
          </AuthProvider>
        </UserProvider>
      </NDKProvider>
    </NavigationContainer>
  );
}

export default App;
