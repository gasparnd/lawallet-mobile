import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useLoading} from '@/hooks';
import {useAuth} from '@/context';
import {
  Button,
  Container,
  Divider,
  Heading,
  Input,
  WithFixedBottom,
} from '@/ui';

export default function LoginScreen() {
  const {t} = useTranslation();
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
              text={t('LOGIN')}
              onPress={handleLogin}
              type="filled"
            />
          }>
          <Divider y={10} />
          <Heading txt={t('LOGIN_TITLE')} type="h4" />
          <Divider y={10} />
          <Input
            value={privateKey}
            autoCapitalize="none"
            state="normal"
            placeholder={t('INSERT_PRIVATE_KEY')}
            onChange={setPrivateKey}
          />
        </WithFixedBottom>
      </Container>
    </SafeAreaView>
  );
}
