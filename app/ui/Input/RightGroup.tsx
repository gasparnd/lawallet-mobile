import React, {PropsWithChildren} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useColors} from 'hooks/useColors';

export default function RightGroup({children}: PropsWithChildren) {
  const {colors} = useColors();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'baseline',
      width: '100%',
      flex: 1,
    },
  });
  return <View style={styles.container}>{children}</View>;
}
