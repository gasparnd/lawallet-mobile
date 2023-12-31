import React, {useState} from 'react';
import {View, Switch, StyleSheet, SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useAppNavigation, useColors} from '@/hooks';
import {
  Button,
  Container,
  CustomText,
  Divider,
  Row,
  WithFixedBottom,
} from '@/ui';
import {useUser} from '@/context';
import {CopyText} from '@/components';

export default function BackupAccount() {
  const {t} = useTranslation();
  const {colors} = useColors();
  const {user} = useUser();
  const {navigate} = useAppNavigation();

  const [showKey, setShowKey] = useState<boolean>(false);

  const [loseKeySwitch, setLoseKeySwitch] = useState<boolean>(false);
  const toggleLoseKeySwitch = () =>
    setLoseKeySwitch(previousState => !previousState);

  const [shareKeySwitch, setShareKeySwitch] = useState<boolean>(false);
  const toggleShareKeySwitch = () =>
    setShareKeySwitch(previousState => !previousState);

  const cutText = (txt: string) => {
    const length = txt.length;
    const mitad = Math.floor(length / 2);
    return txt.slice(0, mitad);
  };

  const onAccept = () => {
    setShowKey(true);
  };

  const onCancel = () => {
    navigate('AppMenu');
  };

  const styles = StyleSheet.create({
    switchText: {
      width: '60%',
    },
  });
  return (
    <SafeAreaView>
      <Container>
        <WithFixedBottom
          bottom={
            <View>
              {showKey ? (
                <Button
                  type="bezeled-gray"
                  text={t('CANCEL')}
                  onPress={onCancel}
                />
              ) : (
                <>
                  <Button
                    text={t('CONFIRM')}
                    disable={!loseKeySwitch || !shareKeySwitch}
                    onPress={onAccept}
                  />
                  <Divider y={5} />
                  <Button
                    type="bezeled-gray"
                    text={t('CANCEL')}
                    onPress={onCancel}
                  />
                </>
              )}
            </View>
          }>
          <Divider y={10} />
          {showKey ? (
            <>
              <CustomText color={colors.gray50} txt={t('PRIVATE_KEY')} />
              <Divider y={8} />
              <CopyText
                label={`${cutText(user.privateKey)}...`}
                text={user.privateKey}
              />
            </>
          ) : (
            <>
              <CustomText color={colors.gray50} txt={t('UNDERSTAND_WHAT')} />
              <Divider y={8} />
              <Row justifyContent="space-between" alignItems="center">
                <View style={styles.switchText}>
                  <CustomText txt={t('LOSE_KEY')} />
                </View>
                <Switch
                  testID="LOSE_KEY_SWITCH"
                  trackColor={{false: colors.gray25, true: colors.primary}}
                  thumbColor={colors.white}
                  ios_backgroundColor="#3e3e3e"
                  onChange={toggleLoseKeySwitch}
                  value={loseKeySwitch}
                />
              </Row>
              <Divider y={8} />
              <Row justifyContent="space-between" alignItems="center">
                <View style={styles.switchText}>
                  <CustomText txt={t('SHARE_KEY')} />
                </View>
                <Switch
                  testID="SHARE_KEY_SWITCH"
                  trackColor={{false: colors.gray25, true: colors.primary}}
                  thumbColor={colors.white}
                  ios_backgroundColor="#3e3e3e"
                  onChange={toggleShareKeySwitch}
                  value={shareKeySwitch}
                />
              </Row>
            </>
          )}
        </WithFixedBottom>
      </Container>
    </SafeAreaView>
  );
}
