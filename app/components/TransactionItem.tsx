import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, ActivityIndicator} from 'react-native';

import {WALLET_DOMAIN} from '@env';
import {useColors} from '@/hooks';
import {
  Transaction,
  TransactionDirection,
  TransactionStatus,
  TransactionType,
} from '@/types/transaction';
import {useLaWallet} from '@/context';
import Icons from './Icon';
import {defaultCurrency} from '@/types/config';
import {getUsername} from '@/interceptors/identity';
import {getMultipleTags} from '@/lib/events';
import {CustomText, Flex} from '@/ui';
import {dateFormatter, formatToPreference} from '@/lib/formatter';

export interface TransactionItemtProps {
  transaction: Transaction;
}

export type LudInfoProps = {
  loading: boolean;
  data: string;
};

export default function TransactionItem({
  transaction,
}: TransactionItemtProps): React.JSX.Element {
  const {t} = useTranslation();
  const {colors} = useColors();
  const {status, type} = transaction;
  const {
    userConfig: {
      props: {hideBalance, currency},
    },
    converter: {pricesData, convertCurrency},
  } = useLaWallet();

  const isFromMe = transaction?.direction === 'OUTGOING';
  const satsAmount = transaction.tokens?.BTC / 1000 || 0;

  const [ludInfo, setLudInfo] = useState<LudInfoProps>({
    loading: false,
    data: 'Lightning',
  });

  const listTypes = {
    CARD: {icon: <Icons icon="Alert" size={10} />, label: t('YOU_PAID')},
    INTERNAL: {
      icon: <Icons icon="Alert" size={10} />,
      label: t('YOU_TRANSFER'),
    },
    LN: {icon: <Icons icon="Alert" size={10} />, label: t('YOU_SEND')},
  };
  // const listTypes = {
  //   CARD: {icon: <Icons icon="Alert" size={10} />, label: t('YOU_PAID')},
  //   INTERNAL: {icon: <TransferIcon />, label: t('YOU_TRANSFER')},
  //   LN: {icon: <LightningIcon />, label: t('YOU_SEND')},
  // };

  const convertedFiatAmount = useMemo(
    () =>
      convertCurrency(
        satsAmount,
        'SAT',
        currency === 'SAT' ? defaultCurrency : currency,
      ),
    [pricesData, currency],
  );

  const handleOpenAccordion = async () => {
    if (transaction.type === TransactionType.INTERNAL) {
      setLudInfo({...ludInfo, loading: true});

      let username: string = '';
      if (transaction.direction === TransactionDirection.INCOMING) {
        username = await getUsername(transaction.events[0].pubkey);
      } else {
        const txPubkeys: string[] = getMultipleTags(
          transaction.events[0].tags,
          'p',
        );
        if (txPubkeys.length < 2) {
          return;
        }

        const receiverPubkey: string = txPubkeys[1];
        username = await getUsername(receiverPubkey);
      }

      username.length
        ? setLudInfo({loading: false, data: `${username}@${WALLET_DOMAIN}`})
        : setLudInfo({...ludInfo, loading: false});
    }
  };

  if (!satsAmount) {
    return <></>;
  }

  return (
    <>
      <Accordion
        variant="borderless"
        onOpen={handleOpenAccordion}
        trigger={
          <Flex align="center" gap={8}>
            <Flex align="center" gap={8}>
              {/* <Icon>{listTypes[type].icon}</Icon> */}
              <CustomText>
                {transaction.status === TransactionStatus.REVERTED
                  ? t('TX_REVERTED')
                  : transaction.status === TransactionStatus.ERROR
                  ? t('FAILED_TRANSACTION')
                  : transaction.status === TransactionStatus.PENDING
                  ? t(
                      `PENDING_${
                        !isFromMe ? 'INBOUND' : 'OUTBOUND'
                      }_TRANSACTION`,
                    )
                  : isFromMe
                  ? listTypes[type].label
                  : t('YOU_RECEIVE')}
              </CustomText>
            </Flex>
            <Flex direction="column" align="end">
              <CustomText
                color={
                  hideBalance
                    ? colors.text
                    : transaction.status === TransactionStatus.ERROR ||
                      transaction.status === TransactionStatus.REVERTED
                    ? colors.error
                    : transaction.status === TransactionStatus.PENDING
                    ? colors.warning
                    : isFromMe
                    ? colors.text
                    : colors.success
                }>
                {hideBalance ? (
                  '*****'
                ) : (
                  <>
                    {!(
                      transaction.status === TransactionStatus.ERROR ||
                      transaction.status === TransactionStatus.REVERTED
                    ) && <>{!isFromMe ? '+ ' : '- '}</>}
                    {formatToPreference('SAT', satsAmount, lng)} SAT
                  </>
                )}
              </CustomText>
              <CustomText size="small" color={colors.gray50}>
                {hideBalance
                  ? '*****'
                  : `$${formatToPreference(
                      currency === 'SAT' ? defaultCurrency : currency,
                      convertedFiatAmount,
                      lng,
                      true,
                    )} ${currency === 'SAT' ? defaultCurrency : currency}`}
              </CustomText>
            </Flex>
          </Flex>
        }>
        <AccordionBody>
          <ul>
            <li>
              <Flex align="center" justify="space-between">
                <CustomText size="small" color={colors.gray50}>
                  {isFromMe ? t('TO') : t('FROM')}
                </CustomText>
                {ludInfo.loading ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <CustomText>{ludInfo.data}</CustomText>
                )}
              </Flex>
            </li>
            <li>
              <Flex align="center" justify="space-between">
                <CustomText size="small" color={colors.gray50}>
                  {t('DATE')}
                </CustomText>
                <Flex direction="column" align="end">
                  <CustomText>
                    {dateFormatter(
                      lng,
                      new Date(Number(transaction.createdAt)),
                      'HH:mm',
                    )}
                  </CustomText>
                  <CustomText size="small" color={colors.gray50}>
                    {dateFormatter(
                      lng,
                      new Date(Number(transaction.createdAt)),
                      'MMMM d, yyyy',
                    )}
                  </CustomText>
                </Flex>
              </Flex>
            </li>
            <li>
              <Flex align="center" justify="space-between">
                <CustomText size="small" color={colors.gray50}>
                  {t('STATUS')}
                </CustomText>
                <CustomText>{t(status)}</CustomText>
              </Flex>
            </li>
          </ul>
          {/* <Flex>
            <Button variant="bezeled" onClick={() => null}>
              {t('SHARE')}
            </Button>
          </Flex> */}
        </AccordionBody>
      </Accordion>
    </>
  );
}
