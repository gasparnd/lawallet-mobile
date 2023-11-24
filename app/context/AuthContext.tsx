import * as React from 'react';

type AuthContext = {
  logged?: boolean;
  loginWitPrivateKey: (privateKey: string) => void;
  logout: () => void;
};

export type LoginValues = {
  dni?: string;
  email?: string;
  password: string;
};

const AuthContext = React.createContext<AuthContext>({
  logged: true,
  loginWitPrivateKey: () => null,
  logout: () => null,
});

export default function AuthProvider({children}: React.PropsWithChildren<any>) {
  const [logged, setLogged] = React.useState<boolean>(false);

  const loginWitPrivateKey = async (privateKey: string) => {
    console.log(privateKey);
    setLogged(true);
  };

  const logout = async () => {
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{logged, loginWitPrivateKey, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
