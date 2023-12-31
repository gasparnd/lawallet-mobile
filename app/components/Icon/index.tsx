import React from 'react';
import {TouchableOpacity} from 'react-native';

import {MaterialIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';

import {IconNames, IconProps} from './icon.types';
import Satoshiv2Icon from './Satoshiv2Icon';

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
  Settings: ({size, color}: IconProps) => (
    <Ionicons name="ios-settings" size={size} color={color} />
  ),
  Satoshiv2: ({size, color}: IconProps) => (
    <Satoshiv2Icon size={size} color={color} />
  ),
  Upload: ({size, color}: IconProps) => (
    <Feather name="upload" size={size} color={color} />
  ),
  Download: ({size, color}: IconProps) => (
    <Feather name="download" size={size} color={color} />
  ),
  QR: ({size, color}: IconProps) => (
    <Ionicons name="ios-qr-code-outline" size={size} color={color} />
  ),
  RightArrow: ({size, color}: IconProps) => (
    <MaterialIcons name="keyboard-arrow-right" size={size} color={color} />
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
