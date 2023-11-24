import React, {PropsWithChildren} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

export interface ContainerProps {
  fullWith?: boolean;
  style?: ViewStyle;
}

export default function Container({
  children,
  fullWith = false,
  style,
}: PropsWithChildren<ContainerProps>): React.JSX.Element {
  const styles = StyleSheet.create({
    base: {
      position: 'relative',
      paddingHorizontal: fullWith ? 0 : '5%',
      ...style,
    },
  });

  return <View style={styles.base}>{children}</View>;
}
