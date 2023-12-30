/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {HomeHeaderLeft, Icon, TabBar, ToggleEye} from '@/components';
import HomeScreen from '@/screens/App/HomeScreen';
import {Divider, Row} from '@/ui';
import {useColors} from '@/hooks';
import {AppStackParamList} from './AppStack';

const Tab = createBottomTabNavigator();

export default function AppMenu() {
  const {navigate} = useNavigation<NavigationProp<AppStackParamList>>();
  const {colors} = useColors();
  const [eyeOn, setEyeOn] = React.useState<boolean>(true);

  const onSettings = () => {
    navigate('Settings');
  };
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      initialRouteName="OffersButton">
      <Tab.Screen
        name="HomeButton"
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
                  size={20}
                  color={colors.primary}
                />
                <Divider x={8} />
                <Icon
                  icon="Settings"
                  size={20}
                  color={colors.primary}
                  onPress={onSettings}
                />
                <Divider x={10} />
              </Row>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
