/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Row from './Row';
import Divider from './Divider';
import {useColors} from '@/hooks';

export type ButtonSize = 'large' | 'small';

export type ButtonTypes = 'borderless' | 'bezeled-gray' | 'bezeled' | 'filled';

export type ButtonColors = 'primary' | 'secondary';

export interface ButtonProps {
  text: string;
  onPress?: () => void;
  type?: ButtonTypes;
  color?: ButtonColors;
  size?: ButtonSize;
  width?: DimensionValue;
  disable?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}

export default function Button({
  text,
  onPress,
  type,
  color = 'primary',
  size = 'large',
  disable,
  loading,
  width,
  icon,
}: ButtonProps): React.JSX.Element {
  const {colors} = useColors();
  let backgroundColor: string = 'transparent';
  let textColor: string = colors.text;

  switch (type) {
    case 'filled':
      backgroundColor = colors[color];
      if (disable) {
        backgroundColor = colors.gray40;
      }
      textColor = colors.black;
      break;
    case 'bezeled':
      backgroundColor = `${colors[color]}15`;
      textColor = colors[color];
      break;
    case 'bezeled-gray':
      backgroundColor = colors.gray15;
      textColor = colors[color];
      break;
    case 'borderless':
      textColor = colors[color];
      break;
    default:
      break;
  }
  const handlePress = () => {
    if (!onPress || disable) {
      return;
    }
    onPress();
  };

  const styles = StyleSheet.create({
    base: {
      borderRadius: 50,
    },
    largeButton: {
      backgroundColor,
      width: width || '100%',
      paddingVertical: 15,
      paddingHorizontal: 4,
    },
    smallButton: {
      backgroundColor,
      paddingVertical: 8,
      paddingHorizontal: 8,
    },
    smallText: {
      color: textColor,
      fontWeight: '700',
      fontSize: 14,
    },
    text: {
      color: textColor,
      fontWeight: '700',
    },
  });

  if (size === 'small') {
    return (
      <View style={{alignItems: 'baseline'}}>
        <TouchableOpacity
          style={[styles.smallButton, styles.base]}
          onPress={handlePress}>
          {loading ? (
            <ActivityIndicator color={textColor} size="small" />
          ) : (
            <Text style={styles.smallText}>{text}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.largeButton, styles.base]}
      onPress={handlePress}>
      <Row justifyContent="center">
        {loading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          <View>
            <Row alignItems="center">
              {icon && (
                <>
                  {icon}
                  <Divider x={4} />
                </>
              )}
              <Text style={styles.text}>{text}</Text>
            </Row>
          </View>
        )}
      </Row>
    </TouchableOpacity>
  );
}
