/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeHeaderLeft, Icon, TabBar, ToggleEye} from '@/components';
import HomeScreen from '@/screens/App/HomeScreen';
import {Divider, Row} from '@/ui';
import {useColors} from '@/hooks';

const Tab = createBottomTabNavigator();

export default function AppMenu() {
  const {colors} = useColors();
  const [eyeOn, setEyeOn] = React.useState<boolean>(true);
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
                  size={17}
                  color={colors.primary}
                />
                <Divider x={8} />
                <Icon icon="Settings" size={17} color={colors.primary} />
              </Row>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
