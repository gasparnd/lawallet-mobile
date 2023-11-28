/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, View} from 'react-native';

import {Button, Container, CustomText, Flex, Row} from 'ui';
import {Logo} from 'components';
import {useAuth} from 'context/AuthContext';
import {useColors} from 'hooks/useColors';

const {version} = require('../../../app.json');

export default function AccessScreen() {
  const {loginWitPrivateKey} = useAuth();
  const {colors} = useColors();

  const onLogin = () => {
    loginWitPrivateKey('');
  };
  return (
    <SafeAreaView>
      <Container>
        <Flex direction="column" justify="spaceBetween" fullHeight>
          <View
            style={{
              height: '50%',
              width: '100%',
              justifyContent: 'flex-end',
            }}>
            <View>
              <Row justifyContent="center">
                <Logo size={200} />
              </Row>
              <Row justifyContent="center">
                <CustomText color={colors.gray50} align="center">
                  {version}
                </CustomText>
              </Row>
            </View>
          </View>

          <Button text="Iniciar sesión" onPress={onLogin} type="filled" />
        </Flex>
      </Container>
    </SafeAreaView>
  );
}
