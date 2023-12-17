import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {IconProps} from './icon.types';

export default function Satoshiv2Icon({
  color,
  size,
}: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Path d="M8 10H22" stroke={color} stroke-width="2" />
      <Path d="M15 7V4" stroke={color} stroke-width="2" />
      <Path d="M15 26V23" stroke={color} stroke-width="2" />
      <Path d="M8 15H22" stroke={color} stroke-width="2" />
      <Path d="M8 20H22" stroke={color} stroke-width="2" />
    </Svg>
  );
}
