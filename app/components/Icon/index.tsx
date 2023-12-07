import React from 'react';
import {TouchableOpacity} from 'react-native';

import {MaterialIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';

import {IconNames, IconProps} from './icon.types';

export interface IconsProps extends IconProps {
  icon: IconNames;
}

const icons = {
  Error: ({size, color}: IconProps) => (
    <MaterialIcons name="cancel" size={size} color={color} />
  ),
  Alert: ({size, color}: IconProps) => (
    <Ionicons name="alert-outline" size={size} color={color} />
  ),
  Check: ({size, color}: IconProps) => (
    <AntDesign name="check" size={size} color={color} />
  ),
  Eye: ({size, color}: IconProps) => (
    <Ionicons name="eye" size={size} color={color} />
  ),
  EyeOff: ({size, color}: IconProps) => (
    <Ionicons name="eye-off" size={size} color={color} />
  ),
};

export default function Icons(props: IconsProps): React.JSX.Element {
  const {icon, onPress} = props;

  const renderIcon = () => {
    return <>{icons[icon](props)}</>;
  };

  return onPress ? (
    <TouchableOpacity onPress={onPress}>{renderIcon()}</TouchableOpacity>
  ) : (
    renderIcon()
  );
}

Icons.defaultProps = {
  size: 29,
  color: 'black',
};
