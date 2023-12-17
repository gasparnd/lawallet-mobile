import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AvailableCurrencies, ConfigProps, defaultConfig} from '@/types/config';

export type ConfigReturns = {
  props: ConfigProps;
  loading: boolean;
  toggleHideBalance: () => void;
  changeCurrency: (currency: AvailableCurrencies) => void;
};

export default function useConfiguration(): ConfigReturns {
  const [loading, setLoading] = useState<boolean>(true);
  const [props, setProps] = useState<ConfigProps>(defaultConfig);

  const saveConfiguration = async (newConfig: ConfigProps) => {
    setProps(newConfig);
    await AsyncStorage.setItem('config', JSON.stringify(newConfig));
  };

  const toggleHideBalance = () =>
    saveConfiguration({
      ...props,
      hideBalance: !props.hideBalance,
    });

  const changeCurrency = (currency: AvailableCurrencies) =>
    saveConfiguration({
      ...props,
      currency,
    });
  const preloadConfig = async () => {
    const storagedConfig: string | null = await AsyncStorage.getItem('config');
    if (!storagedConfig) {
      setLoading(false);
      return;
    }

    const parsedConfig: ConfigProps = JSON.parse(storagedConfig);
    setProps(parsedConfig);
    setLoading(false);
  };

  useEffect(() => {
    preloadConfig();
  }, []);

  return {props, loading, toggleHideBalance, changeCurrency};
}
