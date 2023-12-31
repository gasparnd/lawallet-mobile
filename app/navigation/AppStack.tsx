import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppMenu from './AppMenu';
import QRScannerScreen from '@/screens/App/QRScannerScreen';
import SettingsScreen from '@/screens/App/SettingsScreen';
import DepositScreen from '@/screens/App/DepositScreen';
import TransferScreen from '@/screens/App/TransferScreen';
import BackupAccountScreen from '@/screens/App/BackupAccountScreen';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerBackTitle: t('BACK')}}>
      <Stack.Screen
        name="Home"
        component={AppMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{headerTitle: t('SCAN_QR')}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerTitle: t('SETTINGS')}}
      />
      <Stack.Screen
        name="Deposit"
        component={DepositScreen}
        options={{headerTitle: t('DEPOSIT')}}
      />
      <Stack.Screen
        name="Transfer"
        component={TransferScreen}
        options={{headerTitle: t('TRANSFER_MONEY')}}
      />
      <Stack.Screen
        name="BackupAccount"
        component={BackupAccountScreen}
        options={{headerTitle: t('BACKUP_ACCOUNT')}}
      />
    </Stack.Navigator>
  );
}
