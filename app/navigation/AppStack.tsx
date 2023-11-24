import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {appRouteNames} from '../constants/routeNames';
import HomeScreen from '../screens/App/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName={appRouteNames.Home}>
      <Stack.Screen name={appRouteNames.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
}
