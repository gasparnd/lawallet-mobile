import {useColors} from 'hooks';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import CustomText from '../ui/CustomText';

export interface AvatarProps {
  name: string;
}

export default function Avatar({name}: AvatarProps): React.JSX.Element {
  const {colors} = useColors();
  const formatName = (n: string) => {
    return n.substring(0, 2).toUpperCase();
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.gray20,
      borderRadius: 100,
      height: 35,
      width: 35,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.gray30,
    },
  });
  return (
    <View style={styles.container}>
      <CustomText size="small" scaling={false}>
        {formatName(name)}
      </CustomText>
    </View>
  );
}
