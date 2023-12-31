import React, {PropsWithChildren} from 'react';
import {TouchableOpacity, StyleSheet, Linking} from 'react-native';

import {useAppNavigation, useColors} from '@/hooks';
import Icon from '../components/Icon';
import CustomText from './CustomText';
import Row from './Row';

export interface ButtomSettingpRops {
  route?: any;
  href?: string;
}

export default function ButtomSetting({
  children,
  route,
  href,
}: PropsWithChildren<ButtomSettingpRops>): React.JSX.Element {
  const {colors} = useColors();
  const {navigate} = useAppNavigation();

  const onPress = () => {
    if (href && route) {
      return;
    } else if (href) {
      Linking.canOpenURL(href).then(canOpen => {
        if (canOpen) {
          Linking.openURL(href);
        }
      });
    } else if (route) {
      navigate(route);
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.gray15,
      borderRadius: 8,
      height: 55,
      flexDirection: 'row',
      paddingHorizontal: 20,
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Row justifyContent="space-between" alignItems="center">
        <CustomText>{children}</CustomText>
        <Icon icon="RightArrow" color={colors.primary} size={25} />
      </Row>
    </TouchableOpacity>
  );
}
