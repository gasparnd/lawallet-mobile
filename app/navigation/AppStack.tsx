import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppMenu from './AppMenu';
import QRScannerScreen from '@/screens/App/QRScannerScreen';
import SettingsScreen from '@/screens/App/SettingsScreen';
import DepositScreen from '@/screens/App/DepositScreen';
import TransferScreen from '@/screens/App/TransferScreen';
import BackupAccountScreen from '@/screens/App/BackupAccountScreen';

export type AppStackParamList = {
  Home: undefined;
  QRScanner: undefined;
  Settings: undefined;
  BackupAccount: undefined;
  Deposit: undefined;
  Transfer: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={AppMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="Deposit"
        component={DepositScreen}
        options={{headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="Transfer"
        component={TransferScreen}
        options={{headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="BackupAccount"
        component={BackupAccountScreen}
        options={{headerBackTitleVisible: false}}
      />
    </Stack.Navigator>
  );
}
