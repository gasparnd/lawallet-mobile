export type IconNames =
  | 'Error'
  | 'Alert'
  | 'Check'
  | 'Eye'
  | 'EyeOff'
  | 'Settings'
  | 'Satoshiv2'
  | 'Upload'
  | 'Download'
  | 'QR'
  | 'RightArrow';

export interface IconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}
