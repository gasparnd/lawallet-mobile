export type IconNames =
  | 'Error'
  | 'Alert'
  | 'Check'
  | 'Eye'
  | 'EyeOff'
  | 'Settings'
  | 'Satoshiv2'
  | 'Upload'
  | 'Download';

export interface IconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}
