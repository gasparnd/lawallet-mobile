import React from 'react';
import {View} from 'react-native';

import {useLaWallet} from '@/context';
import {Button, Flex} from '@/ui';
import {CurrenciesList} from '@/types/config';

export default function TokenList() {
  const {userConfig} = useLaWallet();

  return (
    <View>
      <View>
        <Flex gap={4} justify="center">
          {CurrenciesList.map(currency => {
            const selected: boolean = userConfig.props.currency === currency;

            return (
              <Button
                key={currency}
                text={currency}
                type={selected ? 'bezeled' : 'borderless'}
                size="small"
                onPress={() => userConfig.changeCurrency(currency)}
              />
            );
          })}
        </Flex>
      </View>
    </View>
  );
}
