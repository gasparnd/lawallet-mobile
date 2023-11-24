import {DimensionValue, StyleSheet, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

export type FlexAlignType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';

export interface IRowProps {
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | undefined;
  alignItems?: FlexAlignType | undefined;
  width?: DimensionValue;
}

export default function Row({
  children,
  justifyContent = 'flex-start',
  alignContent = 'flex-start',
  alignItems = 'flex-start',
  width = '100%',
}: PropsWithChildren<IRowProps>): React.JSX.Element {
  const styles = StyleSheet.create({
    row: {
      width,
      flexDirection: 'row',
      justifyContent,
      alignContent,
      alignItems,
    },
  });
  return <View style={styles.row}>{children}</View>;
}
