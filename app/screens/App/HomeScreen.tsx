import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {NDKKind} from '@nostr-dev-kit/ndk';

import {useUser} from 'context';
import {CustomText} from 'ui';
import {useSubscription} from 'hooks';

export default function HomeScreen() {
  const {user} = useUser();
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

    const event = events[0];
    const content = JSON.parse(event.content);
    const amount = content.tokens.BTC;
    console.info('Amount', amount);
    const sats = Number(amount) / 1000;
    setZaps(sats);
  }, [events]);

  // const zapRequestEvent = async (amount: number, privateKey: string) => {
  //   const pubkey: string = getPublicKey(privateKey);
  //   let zapEvent: any = {
  //     kind: 9734,
  //     created_at: Math.floor(Date.now() / 1000),
  //     tags: [
  //       ['p', pubkey],
  //       ['amount', amount.toString()],
  //       ['relays', ...RelaysList],
  //     ],
  //     content: '',
  //     pubkey,
  //   };
  //   console.log(
  //     '🚀 ~ file: events.ts:122 ~ zapRequestEvent ~ zapEvent:',
  //     zapEvent,
  //   );
  //   const foo = finishEvent(zapEvent, privateKey);
  //   console.log('🚀 ~ file: events.ts:129 ~ zapRequestEvent ~ foo:', foo);
  // };

  return (
    <View style={styles.container}>
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
