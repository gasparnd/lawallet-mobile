/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {WALLET_DOMAIN} from '@env';
import {useUser} from '@/context';
import {useColors} from '@/hooks';
import CustomText from '../ui/CustomText';
import Divider from '../ui/Divider';
import Row from '../ui/Row';
import Avatar from './Avatar';

export default function HomeHeaderLeft() {
  const {user} = useUser();
  const {colors} = useColors();
  const {t} = useTranslation();
  return (
    <View style={{marginLeft: 10}}>
      <Row alignItems="center">
        <Avatar name={user.username} />
        <Divider x={4} />
        <View>
          <CustomText
            txt={`${t('HELLO')},`}
            color={colors.gray50}
            size="small"
            scaling={false}
          />
          <CustomText
            txt={`${user.username}@${WALLET_DOMAIN}`}
            size="small"
            scaling={false}
          />
        </View>
      </Row>
    </View>
  );
}
