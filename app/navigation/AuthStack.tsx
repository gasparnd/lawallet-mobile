import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AccessScreen from '@/screens/Auth/AccessScreen';
import LoginScreen from '@/screens/Auth/LoginScreen';
import {useTranslation} from 'react-i18next';

export type AuthStackParamList = {
  Access: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      initialRouteName="Access"
      screenOptions={{headerBackTitle: t('BACK')}}>
      <Stack.Screen
        name="Access"
        component={AccessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerTitle: t('LOGIN_TITLE')}}
      />
    </Stack.Navigator>
  );
}
