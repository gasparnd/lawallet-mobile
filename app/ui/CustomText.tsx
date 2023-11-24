import {Colors} from 'constants/colors';
import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text as RNText} from 'react-native';

import {useColors} from 'hooks';

// import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat'

export interface TextProps {
  size?: 'normal' | 'large' | 'small';
  customSize?: number;
  numberOfLines?: number;
  fontWeight?: 'normal' | 'bold' | 'semibold';
  align?: 'left' | 'center' | 'right';
  opacity?: 65 | 100;
  disable?: boolean;
  scaling?: boolean;
  theme?: 'auto' | 'dark' | 'light';
  color?: string;
  type?: 'error' | 'normal' | 'primary';
}

export default function CustomText({
  children,
  disable = false,
  scaling = false,
  size = 'normal',
  fontWeight = 'normal',
  numberOfLines,
  align = 'left',
  opacity = 100,
  theme = 'auto',
  customSize,
  type = 'normal',
  color,
}: PropsWithChildren<TextProps>): React.JSX.Element {
  // const [fontsLoaded] = useFonts({ Montserrat_400Regular, Montserrat_700Bold })

  const {colors} = useColors();
  // const fontScale = PixelRatio.getFontScale();

  // if (!fontsLoaded) {
  //   return null
  // }

  const isLarge = size === 'large';
  const isSmall = size === 'small';

  let fontSize = customSize ? customSize : 16;
  if (isLarge) {
    fontSize = 18;
  } else if (isSmall) {
    fontSize = 14;
  }

  let lineHeight = 22;
  if (isLarge) {
    lineHeight = 24;
  } else if (isSmall) {
    lineHeight = 18;
  }
  // const isBold = fontWeight === 'bold'

  const textColor = disable
    ? colors.gray50
    : theme === 'auto'
    ? colors.text
    : Colors[theme].text;

  const styles = StyleSheet.create({
    base: {
      opacity: opacity / 100,
      color: color
        ? color
        : type === 'error'
        ? colors.error
        : type === 'primary'
        ? colors.primary
        : textColor,
      // fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_400Regular',
      fontSize: fontSize,
      lineHeight: lineHeight,
      fontWeight: fontWeight === 'semibold' ? '600' : fontWeight,
      textAlign: align,
    },
  });

  return (
    <RNText
      numberOfLines={numberOfLines}
      allowFontScaling={scaling}
      style={[styles.base]}>
      {children}
    </RNText>
  );
}
