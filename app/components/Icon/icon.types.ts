export type TIcons = 'Error' | 'Alert' | 'Check';

export interface IIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}
