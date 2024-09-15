import { createContext, useContext, useEffect, useReducer } from 'react';
import { AuthAction, AuthReducer, AuthState } from './auth.reducer';
import userRepository from '../data/repository/user';
import userAuthRepository from '../data/repository/user-auth';
let userData = null;
if (localStorage.getItem('user') !== 'undefined') {
  userData = JSON.parse(localStorage.getItem('user-id')!);
}
const INITIAL_STATE: AuthState = {
  userId: userData,
};

type AuthContextType = {
  userId: number | null;
  authDispatch: React.Dispatch<AuthAction>;
  isAuthenticated: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const isAuthenticated = () => {
    if (state.userId) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const loadingData = async () => {
      if (state.userId) {
        try {
          const data = await userRepository.getFirstName(state.userId);
        } catch (err) {
          dispatch({ type: 'LOGIN_FAILURE' });
        }
      } else {
        userAuthRepository.clearCredentials();
      }
    };
    loadingData();
  }, [state.userId]);
  return (
    <AuthContext.Provider
      value={{ userId: state.userId, authDispatch: dispatch, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
