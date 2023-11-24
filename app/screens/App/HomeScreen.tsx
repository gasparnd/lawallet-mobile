import 'text-encoding';
import 'react-native-get-random-values';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ApiResponse} from 'apisauce';
import {nip19, getPublicKey, finishEvent} from 'nostr-tools';

import {identityApi} from 'lib/api';
import NDK, {NDKKind} from '@nostr-dev-kit/ndk';
import {RelaysList} from 'constants/relays';

export default function HomeScreen() {
  const [user, setUser] = useState<any>();
  const [suscriber, setSuscriber] = useState<any>(null);
  const PRIVATE_KEY: string = '';

  useEffect(() => {
    if (!suscriber) {
      return;
    }
    suscriber.on('event', async (event: any) => {
      const content = JSON.parse(event.content);
      const amount = content.tokens.BTC;
      console.info('Amount', amount);
    });
  }, [suscriber]);

  useEffect(() => {
    (async () => init())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsername = async ({
    hexpub,
    privateKey,
  }: {
    hexpub: string;
    privateKey: string;
  }) => {
    const res: ApiResponse<any> = await identityApi.get(
      `/api/pubkey/${hexpub}`,
    );
    if (!res.data) {
      return false;
    }
    const username = res.data.username;
    const identity: any = {
      nonce: '',
      card: [],
      username,
      hexpub,
      npub: nip19.npubEncode(hexpub),
      privateKey: privateKey,
    };
    console.log(
      '🚀 ~ file: AuthContext.tsx:59 ~ AuthProvider ~ identity:',
      identity,
    );
    setUser(identity);

    return;
  };

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
    await getUsername({hexpub, privateKey: PRIVATE_KEY});
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
      <Text>LaWallet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
