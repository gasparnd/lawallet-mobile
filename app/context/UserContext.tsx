import * as React from 'react';

import {UserIdentity} from '@/types/identity';

export const defaultUserData: UserIdentity = {
  nonce: '',
  card: [],
  username: '',
  hexpub: '',
  npub: '',
  privateKey: '',
};

type UserContext = {
  user: UserIdentity;
  setUser: (userContext: React.SetStateAction<UserIdentity>) => void;
  cleanUserData: () => void;
};

const UserContext = React.createContext<UserContext>({
  user: defaultUserData,
  setUser: () => null,
  cleanUserData: () => null,
});

const UserProvider = ({children}: React.PropsWithChildren<any>) => {
  const [user, setUser] = React.useState<UserIdentity>(defaultUserData);

  const cleanUserData = () => {
    setUser(defaultUserData);
  };

  return (
    <UserContext.Provider value={{user, setUser, cleanUserData}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => React.useContext(UserContext);
