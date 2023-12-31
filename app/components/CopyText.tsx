import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {Button, CustomText, Row} from '@/ui';

export interface CopyTextProps {
  text: string;
  label: string;
}

export default function CopyText({text, label}): React.JSX.Element {
  const {t} = useTranslation();

  const handleCopy = () => {
    Clipboard.setString(text);
  };

  const styles = StyleSheet.create({
    containerText: {
      width: '75%',
    },
  });
  return (
    <Row justifyContent="space-between" alignItems="center">
      <View style={styles.containerText}>
        <CustomText txt={label} />
      </View>
      <Button
        size="small"
        type="bezeled"
        text={t('COPY')}
        onPress={handleCopy}
      />
    </Row>
  );
}
