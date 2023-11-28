import {ColorSchemeName, useColorScheme} from 'react-native';

import {Colors} from 'constants/colors';

export function useColors() {
  const deviceTheme: ColorSchemeName = useColorScheme();

  return {colors: deviceTheme === 'dark' ? Colors.dark : Colors.light};
}
