import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {useColors} from '@/hooks';

export interface IDividerProps {
  x?: number;
  y?: number;
  line?: boolean;
}

export default function Divider({
  x = 0,
  y = 0,
  line = false,
}: IDividerProps): React.JSX.Element {
  const {colors} = useColors();

  const border: ViewStyle = line
    ? {
        borderWidth: 0.5,
        width: '100%',
        borderColor: colors.gray50,
      }
    : {};

  const styles = StyleSheet.create({
    divider: {
      marginHorizontal: x,
      marginVertical: y,
    },
  });

  return <View style={[styles.divider, {...border}]} />;
}
