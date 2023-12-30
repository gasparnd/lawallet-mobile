import {AuthStackParamList} from '@/navigation/AuthStack';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export default function useAuthNavigation() {
  return useNavigation<NavigationProp<AuthStackParamList>>();
}
