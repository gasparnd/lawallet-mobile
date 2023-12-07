/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from 'screens/App/HomeScreen';
import {HomeHeaderLeft, ToggleEye} from 'components';
import {useColors} from 'hooks';
import {Row} from 'ui';

export type AppStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  const {colors} = useColors();
  const [eyeOn, setEyeOn] = useState<boolean>(true);
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: '',
          headerLeft: () => <HomeHeaderLeft />,
          headerRight: () => (
            <View>
              <Row alignItems="center">
                <ToggleEye
                  eyeOn={eyeOn}
                  setEyeOn={setEyeOn}
                  size={17}
                  color={colors.primary}
                />
              </Row>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
