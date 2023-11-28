import React from 'react';
import {View} from 'react-native';

import {useAuth} from 'context/AuthContext';
import {Button, CustomText} from 'ui';

export default function AccessScreen() {
  const {loginWitPrivateKey} = useAuth();

  const onLogin = () => {
    loginWitPrivateKey('');
  };
  return (
    <View>
      <CustomText>LaWallet</CustomText>
      <Button
        text="Button "
        onPress={onLogin}
        type="filled"
        color="secondary"
        size="small"
      />
    </View>
  );
}
