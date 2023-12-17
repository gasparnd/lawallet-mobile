import React from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import {useColors} from '@/hooks';
import Icon from '../../components/Icon';
import RightGroup from './RightGroup';

export type InputState = 'normal' | 'error' | 'success' | 'loading';

export interface InputProps extends TextInputProps {
  disable?: boolean;
  state?: InputState;
  onSubmit?: () => void;
  onChange?: (value: any) => void;
  placeholder?: string;
  id?: string;
  autoFocus?: boolean;
  autoCorrect?: boolean;
  rightGroup?: React.JSX.Element;
  width?: DimensionValue;
}

export default function Input(props: InputProps): React.JSX.Element {
  const {
    disable = false,
    state = 'normal',
    onChange,
    onSubmit,
    id = '',
    rightGroup,
    value,
    width = '100%',
  } = props;
  const {colors} = useColors();

  let borderColor = colors.gray20;
  const showIcon = state !== 'normal';
  let RightIcon;

  switch (state) {
    case 'error':
      borderColor = colors.error;
      RightIcon = <Icon icon="Alert" color={colors.error} size={20} />;
      break;
    case 'success':
      borderColor = colors.success;
      RightIcon = <Icon icon="Check" color={colors.success} size={20} />;
      break;
    case 'loading':
      RightIcon = <ActivityIndicator size="small" />;
      break;

    default:
      break;
  }

  const styles = StyleSheet.create({
    diableInputContainer: {
      borderWidth: 1,
      borderRadius: 15,
      borderColor: colors.gray25,
      backgroundColor: colors.gray15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    disableInput: {
      width: showIcon ? '90%' : width,
      paddingVertical: 15,
      paddingHorizontal: 8,
      color: colors.gray25,
    },
    inputContainer: {
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 15,
      height: 50,
      borderColor,
      backgroundColor: colors.gray15,
      flexDirection: 'row',
      overflow: 'hidden',
    },
    input: {
      paddingHorizontal: 8,
      color: colors.white,
      alignItems: 'baseline',
      width: showIcon ? '90%' : width,
    },
  });

  const handleCahnge = (inputValue: any) => {
    if (!onChange) {
      return;
    }
    onChange(inputValue);
  };

  if (disable) {
    return (
      <View style={styles.diableInputContainer}>
        <TextInput
          value={value}
          id={id}
          editable={false}
          testID={id}
          nativeID={id}
          placeholderTextColor={colors.gray25}
          onSubmitEditing={onSubmit}
          style={styles.disableInput}
        />
        {RightIcon}
      </View>
    );
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        {...props}
        value={value}
        id={id}
        testID={id}
        nativeID={id}
        placeholderTextColor={colors.gray50}
        onSubmitEditing={onSubmit}
        style={styles.input}
        onChangeText={handleCahnge}
      />
      {rightGroup && <RightGroup>{rightGroup}</RightGroup>}
      {RightIcon}
    </View>
  );
}
