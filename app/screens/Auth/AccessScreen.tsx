import {Button, Text, View} from 'react-native';
import React from 'react';
import {useAuth} from '../../context/AuthContext';

export default function AccessScreen() {
  const {loginWitPrivateKey} = useAuth();

  const onLogin = () => {
    loginWitPrivateKey('');
  };
  return (
    <View>
      <Text>LaWallet</Text>
      <Button title="Login" onPress={onLogin} />
    </View>
  );
}
