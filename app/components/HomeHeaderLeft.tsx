import React from 'react';
import {View} from 'react-native';

import {WALLET_DOMAIN} from '@env';
import CustomText from '../ui/CustomText';
import Divider from '../ui/Divider';
import Row from '../ui/Row';
import {useUser} from 'context';
import {useColors} from 'hooks';
import Avatar from './Avatar';

export default function HomeHeaderLeft() {
  const {user} = useUser();
  const {colors} = useColors();
  return (
    <View>
      <Row alignItems="center">
        <Avatar name={user.username} />
        <Divider x={4} />
        <View>
          <CustomText color={colors.gray50} size="small" scaling={false}>
            Hola,
          </CustomText>
          <CustomText size="small" scaling={false}>
            {`${user.username}@${WALLET_DOMAIN}`}
          </CustomText>
        </View>
      </Row>
    </View>
  );
}
