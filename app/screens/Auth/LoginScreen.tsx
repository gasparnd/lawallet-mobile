import {useColors} from 'hooks/useColors';
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';

import {Container, CustomText, Divider, Heading, Input} from 'ui';

export default function LoginScreen() {
  const [textValue, setTextValue] = useState<string>('');
  const {colors} = useColors();
  return (
    <SafeAreaView>
      <Container>
        <Heading type="h4">Registra tu usuario</Heading>
        <Input
          width="60%"
          state="normal"
          onChange={setTextValue}
          rightGroup={
            <View
              style={{
                backgroundColor: colors.black,
                height: '100%',
                alignSelf: 'flex-end',
                justifyContent: 'center',
                paddingHorizontal: 20,
              }}>
              <CustomText size="small">@lacrypta.ar</CustomText>
            </View>
          }
        />
        <Divider y={4} />
        <Input state="error" onChange={setTextValue} />
        <Divider y={4} />
        <Input state="success" onChange={setTextValue} />
        <Divider y={4} />
        <Input state="loading" onChange={setTextValue} />
        <Divider y={4} />
        <Input disable onChange={setTextValue} />
        <Divider y={4} />

        <CustomText>{textValue}</CustomText>
      </Container>
    </SafeAreaView>
  );
}
