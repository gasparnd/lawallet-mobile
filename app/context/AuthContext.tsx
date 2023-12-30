import 'text-encoding';

import * as React from 'react';
import {ApiResponse} from 'apisauce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPublicKey, nip19} from 'nostr-tools';

import {useUser} from './UserContext';
import {UserIdentity} from '@/types/identity';
import {identityApi} from '@/lib/api';

type AuthContext = {
  logged?: boolean;
  loginWithPrivateKey: (privateKey: string) => void;
  logout: () => void;
  loginError: string | null;
};

export type LoginValues = {
  dni?: string;
  email?: string;
  password: string;
};

const AuthContext = React.createContext<AuthContext>({
  logged: true,
  loginWithPrivateKey: () => null,
  logout: () => null,
  loginError: null,
});

export default function AuthProvider({children}: React.PropsWithChildren<any>) {
  const [logged, setLogged] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const {setUser} = useUser();

  React.useEffect(() => {
    (async () => {
      if (logged) {
        return;
      }
      const userData = await AsyncStorage.getItem('userIdentity');
      if (userData) {
        const userIdentity = JSON.parse(userData);
        setUser(userIdentity);
        setLogged(true);
      }
    })();
  }, [logged, setUser, setLogged]);

  const loginWithPrivateKey = async (privateKey: string) => {
    try {
      const hexpub: string = getPublicKey(privateKey);
      const response: ApiResponse<UserIdentity> = await identityApi.get(
        `api/pubkey/${hexpub}`,
      );
      if (response.status === 200 && response.data) {
        const data = response.data;
        const identity: UserIdentity = {
          nonce: '',
          card: [],
          username: data?.username,
          hexpub,
          npub: nip19.npubEncode(hexpub),
          privateKey,
        };
        const jsonValue = JSON.stringify(identity);
        await AsyncStorage.setItem('userIdentity', jsonValue);
        setUser(identity);
        setLogged(true);
      }
    } catch (requestError: any) {
      setError(requestError);
    }
  };

  const logout = async () => {
    setLogged(false);
  };

  return (
    <AuthContext.Provider
      value={{logged, loginWithPrivateKey, logout, loginError: error}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
