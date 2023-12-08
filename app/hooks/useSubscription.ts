/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useState} from 'react';
import {
  NDKEvent,
  NDKFilter,
  NDKSubscription,
  NDKSubscriptionOptions,
} from '@nostr-dev-kit/ndk';

import {useNostrNdk} from 'context';

export interface IUseSubscription {
  subscription: NDKSubscription;
  events: NDKEvent[];
}

export type SubscriptionProps = {
  filters: NDKFilter[];
  options: NDKSubscriptionOptions;
  enabled: boolean;
};

export default function useSubscription({
  filters,
  options,
  enabled,
}: SubscriptionProps) {
  const {ndk} = useNostrNdk();

  const [subscription, setSubscription] = useState<NDKSubscription>();
  const [events, setEvents] = useState<NDKEvent[]>([]);

  const startSubscription = useCallback(() => {
    if (ndk) {
      const newSubscription = ndk.subscribe(filters, options);
      setSubscription(newSubscription);
      return;
    }
  }, [subscription, ndk, enabled]);

  const stopSubscription = (sub: NDKSubscription) => {
    sub?.stop();
    sub?.removeAllListeners();
  };

  useEffect(() => {
    if (enabled) {
      if (events.length) {
        setEvents([]);
      }
      startSubscription();
    }
  }, [enabled, ndk]);

  useEffect(() => {
    if (subscription && enabled) {
      const readEvents = subscription?.on('event', async (event: NDKEvent) =>
        setEvents(prev => [...prev, event]),
      );

      return () => stopSubscription(readEvents);
    }
  }, [subscription, enabled]);

  return {
    subscription,
    events,
  };
}
