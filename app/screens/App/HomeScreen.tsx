import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {getPublicKey, finishEvent} from 'nostr-tools';
import NDK, {NDKKind} from '@nostr-dev-kit/ndk';

import {RelaysList} from 'constants/relays';
import {useUser} from 'context';
import {CustomText} from 'ui';

export default function HomeScreen() {
  const {user} = useUser();
  const [suscriber, setSuscriber] = useState<any>(null);
  const PRIVATE_KEY: string = user.privateKey;
  const [zaps, setZaps] = useState<number>();

  useEffect(() => {
    if (!suscriber) {
      return;
    }
    suscriber.on('event', async (event: any) => {
      const content = JSON.parse(event.content);
      const amount = content.tokens.BTC;
      console.info('Amount', amount);
      const sats = Number(amount) / 1000;
      setZaps(sats);
    });
  }, [suscriber]);

  useEffect(() => {
    (async () => init())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const zapRequestEvent = async (amount: number, privateKey: string) => {
    const pubkey: string = getPublicKey(privateKey);
    let zapEvent: any = {
      kind: 9734,
      created_at: Math.floor(Date.now() / 1000),
      tags: [
        ['p', pubkey],
        ['amount', amount.toString()],
        ['relays', ...RelaysList],
      ],
      content: '',
      pubkey,
    };
    console.log(
      '🚀 ~ file: events.ts:122 ~ zapRequestEvent ~ zapEvent:',
      zapEvent,
    );
    const foo = finishEvent(zapEvent, privateKey);
    console.log('🚀 ~ file: events.ts:129 ~ zapRequestEvent ~ foo:', foo);
  };

  const init = async () => {
    const hexpub: string = await getPublicKey(PRIVATE_KEY);
    console.log('🚀 ~ file: App.tsx:76 ~ init ~ hexpub:', hexpub);

    const invoice_mSats: number = 100 * 1000;
    await zapRequestEvent(invoice_mSats, PRIVATE_KEY);
    const ndk = new NDK({
      explicitRelayUrls: RelaysList,
    });

    ndk.connect();
    const newSubscription = ndk.subscribe(
      [
        {
          kinds: [1112 as NDKKind],
          since: Math.floor(Date.now() / 1000),
          until: 1800787600,
          '#p': [hexpub],
        },
      ],
      {closeOnEose: false},
    );

    setSuscriber(newSubscription);
  };

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
