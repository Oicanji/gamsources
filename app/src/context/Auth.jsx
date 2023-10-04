import { createContext, useCallback, useEffect } from "react";
import apiUser from "../api/user";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState();
  const [refresh, setRefresh] = useState();

  const [isAuth, setIsAuth] = useState();

  const getStorageTokens = useCallback(() => {
    const tokens = localStorage.getItem("tokens");
    if (tokens) {
      const tokensParsed = JSON.parse(tokens);

      try {
        const res = apiUser.refresh(tokensParsed.refresh);

        setIsAuth(true);
        console.log(res);
      } catch (error) {
        setIsAuth(false);
        console.error(error);
      }
    } else {
      setIsAuth(false);
    }
  }, []);

  useEffect(() => {
    getStorageTokens();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        refresh,
        setRefresh,
      }}
    >
      {contextHolder}
      {children}
    </AuthContext.Provider>
  );
}
