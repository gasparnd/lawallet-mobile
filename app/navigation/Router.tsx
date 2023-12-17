import React from 'react';

import {useAuth} from '@/context';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function Router() {
  const {logged} = useAuth();
  return <>{logged ? <AppStack /> : <AuthStack />}</>;
}
