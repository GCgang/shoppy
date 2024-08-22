import { createContext, useContext } from 'react';
import { useEffect, useState } from 'react';
import {
  googleLogin,
  googleLogout,
  onUserStateChange,
} from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleLogin, googleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
