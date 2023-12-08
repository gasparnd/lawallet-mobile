import 'text-encoding';
import 'react-native-get-random-values';
import * as React from 'react';
import NDK from '@nostr-dev-kit/ndk';

type NDKContextType = {
  ndk: NDK;
};

const NDKContext = React.createContext<NDKContextType>({} as NDKContextType);

export default function NDKProvider({
  children,
  explicitRelayUrls,
}: React.PropsWithChildren<{
  explicitRelayUrls: string[];
}>) {
  const [ndk] = React.useState<NDK>(
    new NDK({
      explicitRelayUrls,
    }),
  );

  React.useEffect(() => {
    ndk.connect();
  }, [ndk]);

  const value = {
    ndk,
  };

  return <NDKContext.Provider value={value}>{children}</NDKContext.Provider>;
}

export const useNostrNdk = () => React.useContext(NDKContext);
