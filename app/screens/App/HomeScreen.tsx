/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo} from 'react';
import {View, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Icon, TokenList, TransactionItem} from '@/components';
import {useLaWallet} from '@/context';
import {useAppNavigation, useColors} from '@/hooks';
import {formatToPreference} from '@/lib/formatter';
import {Button, Container, CustomText, Divider, Flex, Heading, Row} from '@/ui';

export default function HomeScreen() {
  const {t} = useTranslation();
  const {navigate} = useAppNavigation();
  const {colors} = useColors();
  const {
    balance,
    sortedTransactions,
    userConfig: {
      loading,
      props: {hideBalance, currency},
    },
    converter: {pricesData, convertCurrency},
  } = useLaWallet();

  const convertedBalance: string = useMemo(() => {
    const amount: number = convertCurrency(balance.amount, 'SAT', currency);
    return formatToPreference(currency, amount);
  }, [balance, pricesData, currency]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.gray15,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
  });

  const onDepositBtn = () => {
    navigate('Deposit');
  };

  const onTransferBtn = () => {
    navigate('Transfer');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Flex direction="column" align="center" justify="center">
          <Divider y={8} />
          <CustomText txt={t('BALANCE')} size="small" color={colors.gray50} />
          <Flex justify="center" align="center" gap={4}>
            <Flex justify="center" align="center" gap={4}>
              {currency === 'SAT' ? (
                <Icon icon="Satoshiv2" size={20} color={colors.white} />
              ) : (
                <CustomText txt="$" size="small" />
              )}

              <Heading type="h4">
                {loading || balance.loading ? (
                  <Flex direction="column" align="center" justify="center">
                    <ActivityIndicator size="small" />
                  </Flex>
                ) : hideBalance ? (
                  '*****'
                ) : (
                  convertedBalance
                )}
              </Heading>
            </Flex>
          </Flex>
          <Divider y={4} />

          {!loading && <TokenList />}
        </Flex>
        <Divider y={8} />
      </View>
      <Divider y={10} />
      <Container>
        <Row justifyContent="space-between">
          <Button
            onPress={onDepositBtn}
            icon={<Icon icon="Download" size={18} color={colors.black} />}
            text={t('DEPOSIT')}
            type="filled"
            color="primary"
            width="48%"
          />
          <Button
            onPress={onTransferBtn}
            icon={<Icon icon="Upload" size={18} color={colors.black} />}
            text={t('TRANSFER')}
            type="filled"
            color="secondary"
            width="48%"
          />
        </Row>

        <Divider y={10} />
        <View>
          <Row alignItems="center" justifyContent="space-between">
            <CustomText color={colors.gray50} txt={t('LAST_ACTIVITY')} />
            <Button size="small" text={t('SEE_ALL')} type="borderless" />
          </Row>
          <Divider y={8} />
          <Flex direction="column" gap={4}>
            {sortedTransactions.slice(0, 5).map(transaction => (
              <>
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
                <Divider y={4} />
              </>
            ))}
          </Flex>
        </View>
      </Container>
    </ScrollView>
  );
}
