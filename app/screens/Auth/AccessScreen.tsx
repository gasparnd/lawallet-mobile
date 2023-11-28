import {Button, View} from 'react-native';
import React from 'react';
import {useAuth} from 'context/AuthContext';
import CustomText from 'ui/CustomText';

export default function AccessScreen() {
  const {loginWitPrivateKey} = useAuth();

  const onLogin = () => {
    loginWitPrivateKey('');
  };
  return (
    <View>
      <CustomText>LaWallet</CustomText>
      <Button title="Login" onPress={onLogin} />
    </View>
  );
}
