import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppMenu from './AppMenu';
import QRScannerScreen from '@/screens/App/QRScannerScreen';

export type AppStackParamList = {
  Home: undefined;
  AppMenu: undefined;
  QRScanner: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="AppMenu">
      <Stack.Screen
        name="AppMenu"
        component={AppMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{headerBackTitleVisible: false}}
      />
    </Stack.Navigator>
  );
}
