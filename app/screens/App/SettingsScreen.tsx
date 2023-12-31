import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';

import {useColors} from '@/hooks';
import {ButtomSetting, Button, Container, CustomText, Divider} from '@/ui';
import {useAuth} from '@/context';

const {version} = require('../../../app.json');

export default function SettingsScreen() {
  const {t} = useTranslation();
  const {colors} = useColors();
  const {logout} = useAuth();

  const onLogout = () => {
    logout();
  };
  return (
    <ScrollView bounces={false}>
      <Container>
        <Divider y={10} />
        <CustomText size="small" color={colors.gray50}>
          {t('MY_WALLET')}
        </CustomText>
        <Divider y={8} />
        <ButtomSetting route="Transfer"> {t('BACKUP_ACCOUNT')}</ButtomSetting>
        <Divider y={4} />
        <ButtomSetting route="Home">{t('MY_WALLET')}</ButtomSetting>
        <Divider y={8} />
        <CustomText size="small" color={colors.gray50}>
          {t('ABOUT_US')}
        </CustomText>
        <Divider y={8} />
        <ButtomSetting href="https://twitter.com/lawalletok">
          Twitter
        </ButtomSetting>
        <Divider y={4} />
        <ButtomSetting href="https://discord.gg/QESv76truh">
          Discord
        </ButtomSetting>
        <Divider y={12} />
        <CustomText color={colors.gray50} align="center">
          {`LaWallet v${version}`}
        </CustomText>
        <Divider y={15} />
        <Button
          color="error"
          type="bezeled"
          text={t('LOGOUT')}
          onPress={onLogout}
        />
      </Container>
    </ScrollView>
  );
}
