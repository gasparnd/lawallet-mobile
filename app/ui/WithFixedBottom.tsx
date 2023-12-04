import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

export interface WithFixedBottomProps {
  bottom: React.JSX.Element;
}

export default function WithFixedBottom(
  props: PropsWithChildren<WithFixedBottomProps>,
): React.JSX.Element {
  const {children, bottom} = props;
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    content: {},
    bottom: {},
  });
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <View style={styles.bottom}>{bottom}</View>
    </View>
  );
}
