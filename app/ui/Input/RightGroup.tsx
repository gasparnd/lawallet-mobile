import React, {PropsWithChildren} from 'react';
import {View, StyleSheet} from 'react-native';

export default function RightGroup({children}: PropsWithChildren) {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'baseline',
      width: '100%',
      flex: 1,
    },
  });
  return <View style={styles.container}>{children}</View>;
}
