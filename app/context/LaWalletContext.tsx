/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useEffect, useState} from 'react';

import {useActivity, useConfiguration, useTokenBalance} from 'hooks';

import {Transaction, TransactionDirection} from 'types/transaction';
import {ConfigReturns} from 'hooks/useConfiguration';
// import useAlert, {UseAlertReturns} from '@/hooks/useAlerts';

import useCurrencyConverter, {
  UseConverterReturns,
} from 'hooks/useCurrencyConverter';

// import {AvailableLanguages} from '@/translations';
import {TokenBalance} from 'types/balance';
import {useUser} from './UserContext';

export interface LaWalletContextType {
  balance: TokenBalance;
  sortedTransactions: Transaction[];
  userConfig: ConfigReturns;
  // notifications: UseAlertReturns;
  converter: UseConverterReturns;
  hydrated: boolean;
}

export const LaWalletContext = createContext({} as LaWalletContextType);

export function LaWalletProvider({children}: {children: React.ReactNode}) {
  const [hydrated, setHydrated] = useState<boolean>(false);
  const {user} = useUser();

  // const notifications = useAlert();

  const {activityInfo, sortedTransactions} = useActivity({
    pubkey: user.hexpub,
    enabled: Boolean(user.hexpub.length),
    limit: 100,
  });

  const userConfig: ConfigReturns = useConfiguration();
  const converter = useCurrencyConverter();

  const {balance} = useTokenBalance({
    pubkey: user.hexpub,
    tokenId: 'BTC',
  });

  const notifyReceivedTransaction = () => {
    const new_transactions: Transaction[] = sortedTransactions.filter(tx => {
      const transactionId: string = tx.id;
      return Boolean(!activityInfo.idsLoaded.includes(transactionId));
    });

    if (
      new_transactions.length &&
      new_transactions[0].direction === TransactionDirection.INCOMING
    ) {
      // const secondsSinceCreated: number = differenceInSeconds(
      //   new Date(),
      //   new Date(new_transactions[0].createdAt),
      // );
      // if (secondsSinceCreated < 15) {
      //   notifications.showAlert({
      //     description: 'TRANSACTION_RECEIVED',
      //     type: 'success',
      //     params: {
      //       sats: (new_transactions[0].tokens.BTC / 1000).toString(),
      //     },
      //   });
      // }
    }
  };

  useEffect(() => {
    if (sortedTransactions.length) {
      notifyReceivedTransaction();
    }
  }, [sortedTransactions]);

  const value = {
    identity: user,

    balance,
    sortedTransactions,
    userConfig,
    // notifications,
    converter,
    hydrated,
  };

  return (
    <LaWalletContext.Provider value={value}>
      {/* <Alert
        title={notifications.alert?.title}
        description={notifications.alert?.description}
        type={notifications.alert?.type}
        isOpen={!!notifications.alert}
        params={notifications.alert?.params}
      /> */}

      {children}
    </LaWalletContext.Provider>
  );
}
