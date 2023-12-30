import React from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {useColors} from '@/hooks';
import Icons from './Icon';

const TabBar = ({navigation}: BottomTabBarProps) => {
  const {colors} = useColors();

  const onPress = () => {
    navigation.navigate('QRScanner');
  };

  const styles = StyleSheet.create({
    tabBar: {
      height: Platform.OS === 'ios' ? 90 : 70,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 5,
    },
    tabItem: {
      width: 60,
    },
    tabBarText: {
      fontSize: 10,
      fontWeight: '700',
      marginTop: 7,
    },
    qrButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.secondary,
      borderRadius: 100,
      width: 60,
      height: 60,
    },
  });
  return (
    <View style={[styles.tabBar, {backgroundColor: colors.background}]}>
      <TouchableOpacity style={styles.qrButton} onPress={onPress}>
        <Icons icon="QR" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;
