import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AccessScreen from 'screens/Auth/AccessScreen';
import LoginScreen from 'screens/Auth/LoginScreen';

export type AuthStackParamList = {
  Access: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Access"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Access" component={AccessScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
