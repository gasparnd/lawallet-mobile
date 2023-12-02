import React from 'react';
import {TouchableOpacity} from 'react-native';

import {MaterialIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';

import {IIconProps, TIcons} from './icon.types';

interface IIcons extends IIconProps {
  icon: TIcons;
}

const icons = {
  Error: ({size, color}: IIconProps) => (
    <MaterialIcons name="cancel" size={size} color={color} />
  ),
  Alert: ({size, color}: IIconProps) => (
    <Ionicons name="alert-outline" size={size} color={color} />
  ),
  Check: ({size, color}: IIconProps) => (
    <AntDesign name="check" size={size} color={color} />
  ),
};

export default function Icons(props: IIcons): React.JSX.Element {
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
