export type IconNames = 'Error' | 'Alert' | 'Check' | 'Eye' | 'EyeOff';

export interface IconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}
