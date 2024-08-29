import { createContext, useContext } from 'react';
import { useEffect, useState } from 'react';
import {
  googleLogin,
  googleLogout,
  onUserStateChange,
  createUser,
  loginUser,
} from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUser(email, password);
      setUser(userCredential.user);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('이미 사용 중인 이메일입니다.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error(
          '비밀번호가 너무 약합니다. 더 강력한 비밀번호를 사용해 주세요.'
        );
      } else {
        throw new Error(error.message);
      }
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await loginUser(email, password);
      setUser(userCredential.user);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        throw new Error('비밀번호가 잘못되었습니다.');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('해당 이메일로 등록된 사용자가 없습니다.');
      } else {
        throw new Error(error.message);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        uid: user && user.uid,
        googleLogin,
        googleLogout,
        signUp,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
