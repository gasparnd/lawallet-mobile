import React from 'react';
import {View} from 'react-native';

import {useAuth} from 'context/AuthContext';
import {Button, CustomText, Row} from 'ui';
import {Logo} from 'components';

export default function AccessScreen() {
  const {loginWitPrivateKey} = useAuth();

  const onLogin = () => {
    loginWitPrivateKey('');
  };
  return (
    <View>
      <Row justifyContent="center">
        <Logo size={200} />
      </Row>
      <CustomText>LaWallet</CustomText>
      <Button
        loading
        text="Button "
        onPress={onLogin}
        type="filled"
        color="secondary"
      />
    </View>
  );
}
