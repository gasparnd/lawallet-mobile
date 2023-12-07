export type IconNames =
  | 'Error'
  | 'Alert'
  | 'Check'
  | 'Eye'
  | 'EyeOff'
  | 'Settings';

export interface IconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}
