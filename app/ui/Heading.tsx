import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text as RNText} from 'react-native';

import {Colors} from 'constants/colors';
import {useColors} from 'hooks/useColors';
import {useDeviceDimensions} from 'hooks/useDeviceDimensions';

export interface HeadingProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  align?: 'left' | 'center' | 'right';
  theme?: 'auto' | 'dark' | 'light';
  fontWeight?: 'normal' | 'bold' | 'semibold';
  numberOfLines?: number;
  scaling?: boolean;
}

type Headings = {
  h1: {
    fontSize: number;
    lineHeight: number;
  };
  h2: {
    fontSize: number;
    lineHeight: number;
  };
  h3: {
    fontSize: number;
    lineHeight: number;
  };
  h4: {
    fontSize: number;
    lineHeight: number;
  };
  h5: {
    fontSize: number;
    lineHeight: number;
  };
  h6: {
    fontSize: number;
    lineHeight: number;
  };
};

export default function Heading({
  children,
  type = 'h1',
  align = 'left',
  theme = 'auto',
  fontWeight = 'normal',
  numberOfLines,
  scaling = false,
}: PropsWithChildren<HeadingProps>): React.JSX.Element {
  const {colors} = useColors();
  const {isDeviceSmall} = useDeviceDimensions();

  // if (!fontsLoaded) {
  //   return null
  // }

  const largerstScreen: Headings = {
    h1: {
      fontSize: 48,
      lineHeight: 56,
    },
    h2: {
      fontSize: 40,
      lineHeight: 48,
    },
    h3: {
      fontSize: 32,
      lineHeight: 44,
    },
    h4: {
      fontSize: 24,
      lineHeight: 32,
    },
    h5: {
      fontSize: 20,
      lineHeight: 28,
    },
    h6: {
      fontSize: 18,
      lineHeight: 24,
    },
  };

  const smallerScreen: Headings = {
    h1: {
      fontSize: 40,
      lineHeight: 48,
    },
    h2: {
      fontSize: 32,
      lineHeight: 44,
    },
    h3: {
      fontSize: 24,
      lineHeight: 32,
    },
    h4: {
      fontSize: 20,
      lineHeight: 28,
    },
    h5: {
      fontSize: 18,
      lineHeight: 24,
    },
    h6: {
      fontSize: 18,
      lineHeight: 24,
    },
  };

  const fonts = {
    smaller: smallerScreen,
    largerst: largerstScreen,
  };

  const screenType = isDeviceSmall ? 'smaller' : 'largerst';

  const styles = StyleSheet.create({
    h1: {...fonts[screenType].h1},
    h2: {...fonts[screenType].h2},
    h3: {...fonts[screenType].h3},
    h4: {...fonts[screenType].h4},
    h5: {...fonts[screenType].h5},
    h6: {...fonts[screenType].h6},
    base: {
      color: theme === 'auto' ? colors.text : Colors[theme].text,
      // fontFamily: 'Merriweather_700Bold',
      fontWeight: fontWeight === 'semibold' ? '600' : fontWeight,
      textAlign: align,
    },
  });

  return (
    <RNText
      numberOfLines={numberOfLines}
      allowFontScaling={scaling}
      style={[styles.base, styles[type]]}>
      {children}
    </RNText>
  );
}
