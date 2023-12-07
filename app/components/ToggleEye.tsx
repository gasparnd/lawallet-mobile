import React from 'react';

import Icons from './Icon';
import {IconProps} from './Icon/icon.types';

export interface ToggleEyeProps extends IconProps {
  eyeOn: boolean;
  setEyeOn: (newValue: React.SetStateAction<boolean>) => void;
}

export default function ToggleEye(props: ToggleEyeProps): React.JSX.Element {
  const {eyeOn, setEyeOn, color, size} = props;

  const handleToggle = React.useCallback(() => {
    setEyeOn(prevValue => !prevValue);
  }, [setEyeOn]);

  return (
    <>
      {eyeOn ? (
        <Icons icon="Eye" onPress={handleToggle} color={color} size={size} />
      ) : (
        <Icons icon="EyeOff" onPress={handleToggle} color={color} size={size} />
      )}
    </>
  );
}
