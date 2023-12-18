import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

import {useColors} from '@/hooks';

export interface AccordionBodyProps {
  children: ReactNode;
  list?: React.JSX.Element[];
}

export default function AccordionBody(props: AccordionBodyProps) {
  const {children, list} = props;
  const {colors} = useColors();

  const styles = StyleSheet.create({
    accordionBody: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    listItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray25,
    },
    lastListItem: {
      paddingVertical: 12,
    },
  });

  return (
    <View style={styles.accordionBody}>
      {list &&
        list.map((item, index) => (
          <View
            style={
              index === list.length - 1 ? styles.lastListItem : styles.listItem
            }>
            {item}
          </View>
        ))}
      {children}
    </View>
  );
}
