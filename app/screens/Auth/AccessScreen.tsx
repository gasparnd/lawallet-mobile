/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useAuthNavigation, useColors} from '@/hooks';
import {Button, Container, CustomText, Flex, Row} from '@/ui';
import {Logo} from '@/components';

const {version} = require('../../../app.json');

export default function AccessScreen() {
  const {t} = useTranslation();
  const {navigate} = useAuthNavigation();
  const {colors} = useColors();

  const onLogin = () => {
    navigate('Login');
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

          <Button text={t('LOGIN_TITLE')} onPress={onLogin} type="filled" />
        </Flex>
      </Container>
    </SafeAreaView>
  );
}
