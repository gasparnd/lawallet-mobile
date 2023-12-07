/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from 'screens/App/HomeScreen';
import {HomeHeaderLeft} from 'components';

export type AppStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: '',
          headerLeft: () => <HomeHeaderLeft />,
        }}
      />
    </Stack.Navigator>
  );
}
