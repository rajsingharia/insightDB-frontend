import { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { IUser } from '../interfaces/IUser';
import AuthAxios from '../utils/AuthAxios';

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  loading: boolean;
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: React.PropsWithChildren<{ children: React.ReactNode }>) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const authAxios = AuthAxios.getAuthAxios();
  const [user, setUser] = useState<IUser>({} as IUser);

  const verifyToken = (): boolean => {
    const authToken = getAuthTokenFromCookies();
    const hasToken = authToken ? true : false;
    // TODO: verify token with server
    return hasToken;
  };


  useEffect(() => {
    const isTokenValid = verifyToken();
    if (isTokenValid) {
      authAxios.get("/user")
        .then((res) => {
          console.log(res.data);
          const user = res.data;
          setUser(user);
          setIsLoggedIn(true);
          setLoading(false);
        })
        .catch((err) => {
          const errorMessage = (err && err.response) ? err.response.data : "Something went wrong";
          console.log(errorMessage);
          setIsLoggedIn(false);
          setLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  const login = (accessToken: string) => {
    setAuthTokenToCookies(accessToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    clearCookies();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function setAuthTokenToCookies(accessToken: string) {
  localStorage.setItem('accessToken', accessToken);
}

function getAuthTokenFromCookies() {
  return localStorage.getItem('accessToken');
}

function clearCookies() {
  localStorage.removeItem('accessToken');
}

export { AuthContext, AuthProvider };