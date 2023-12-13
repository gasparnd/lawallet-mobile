import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {NDKKind} from '@nostr-dev-kit/ndk';

import {useLaWallet, useUser} from 'context';
import {CustomText} from 'ui';
import {useSubscription} from 'hooks';

export default function HomeScreen() {
  const {user} = useUser();
  const {balance} = useLaWallet();
  const [zaps, setZaps] = useState<number>();
  const {events} = useSubscription({
    filters: [
      {
        kinds: [1112 as NDKKind],
        since: Math.floor(Date.now() / 1000),
        until: 1800787600,
        '#p': [user.hexpub],
      },
    ],
    options: {},
    enabled: true,
  });

  useEffect(() => {
    if (!events.length) {
      return;
    }

    const event = events[events.length - 1];
    const content = JSON.parse(event.content);
    const amount = content.tokens.BTC;
    console.info('Amount', amount);
    const sats = Number(amount) / 1000;
    setZaps(sats);
  }, [events]);

  return (
    <View style={styles.container}>
      <CustomText>{`Balance: ${balance.amount}`}</CustomText>
      <CustomText>{zaps ? `Recived ${zaps} SAT` : ''}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
