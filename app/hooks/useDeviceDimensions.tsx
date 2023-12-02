import {useWindowDimensions} from 'react-native';

export default function useDeviceDimensions() {
  const {height, width} = useWindowDimensions();
  const isDeviceSmall: boolean = height <= 650;

  return {
    height,
    width,
    isDeviceSmall,
  };
}
