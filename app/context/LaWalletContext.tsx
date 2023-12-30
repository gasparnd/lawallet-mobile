/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useEffect} from 'react';

import {useActivity, useTokenBalance} from '@/hooks';
import useConfiguration, {ConfigReturns} from '@/hooks/useConfiguration';
import useCurrencyConverter, {
  UseConverterReturns,
} from '@/hooks/useCurrencyConverter';
import {TokenBalance} from '@/types/balance';
import {Transaction, TransactionDirection} from '@/types/transaction';
import {useUser} from './UserContext';

export interface LaWalletContextType {
  balance: TokenBalance;
  sortedTransactions: Transaction[];
  userConfig: ConfigReturns;
  // notifications: UseAlertReturns;
  converter: UseConverterReturns;
}

export const LaWalletContext = createContext({} as LaWalletContextType);

export default function LaWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {user} = useUser();

  // const notifications = useAlert();

  const {activityInfo, sortedTransactions} = useActivity({
    pubkey: user.hexpub,
    enabled: Boolean(user.hexpub.length),
    limit: 1,
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

export const useLaWallet = () => React.useContext(LaWalletContext);
