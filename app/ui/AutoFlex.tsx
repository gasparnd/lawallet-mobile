import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

export interface AutoFlexProps {
  children: any;
  style?: any;
}

export default function AutoFlex({
  children,
  style,
}: PropsWithChildren<AutoFlexProps>): React.JSX.Element {
  const styles = StyleSheet.create({
    base: {
      flex: 1,
      ...style,
    },
  });

  return <View style={styles.base}>{children}</View>;
}
