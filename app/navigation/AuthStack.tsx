import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {authRouteNames} from 'constants/routeNames';
import AccessScreen from 'screens/Auth/AccessScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName={authRouteNames.Access}>
      <Stack.Screen name={authRouteNames.Access} component={AccessScreen} />
    </Stack.Navigator>
  );
}
