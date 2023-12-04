import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import {useAuth} from 'context';
import {Button, Container, Divider, Heading, Input, WithFixedBottom} from 'ui';
import {useLoading} from 'hooks';

export default function LoginScreen() {
  const {withLoading, isLoading} = useLoading();
  const {loginWithPrivateKey} = useAuth();
  const [privateKey, setPrivateKey] = useState<string>('');

  const handleLogin = () => {
    if (privateKey) {
      withLoading(async () => await loginWithPrivateKey(privateKey));
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <WithFixedBottom
          bottom={
            <Button
              disable={privateKey.length === 0}
              loading={isLoading}
              text="Ingresar"
              onPress={handleLogin}
              type="filled"
            />
          }>
          <Divider y={10} />
          <Heading type="h4">Inicia sesion</Heading>
          <Divider y={10} />
          <Input
            value={privateKey}
            autoCapitalize="none"
            state="normal"
            placeholder="Ingresa tu clave privada"
            onChange={setPrivateKey}
          />
        </WithFixedBottom>
      </Container>
    </SafeAreaView>
  );
}
