import { createContext, useCallback, useEffect, useState } from "react";
import apiUser from "../api/user";

export const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  refresh: null,
  setRefresh: () => {},
  isAuth: null,
  setTokens: () => {},
  refreshSession: () => {},
});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState();
  const [refresh, setRefresh] = useState();

  const [isAuth, setIsAuth] = useState(false);

  const setTokens = (authToken, refreshToken) => {
    localStorage.setItem(
      "tokens",
      JSON.stringify({
        auth: authToken,
        refresh: refreshToken,
      })
    );

    setAuth(authToken);
    setRefresh(refreshToken);

    localStorage.setItem("lastRequest", new Date().getTime());

    setIsAuth(true);
  };

  const removeTokens = () => {
    localStorage.removeItem("tokens");
  };

  const refreshSession = async () => {
    const lastRequest = localStorage.getItem("lastRequest");
    const now = new Date().getTime();
    const diff = now - lastRequest;

    console.log(diff);

    if (diff < 3600000) {
      return;
    }

    console.log("refreshing");

    try {
      const res = await apiUser.refresh(refresh);

      setIsAuth(true);

      setTokens(res.data.access_token, refresh);
    } catch (error) {
      setIsAuth(false);
      removeTokens();
      console.error(error);
    }
  };

  const getStorageTokens = useCallback(async () => {
    const tokens = localStorage.getItem("tokens");
    if (tokens) {
      const tokensParsed = JSON.parse(tokens);

      try {
        const res = await apiUser.refresh(tokensParsed.refresh);

        setIsAuth(true);

        setTokens(res.data.access_token, tokensParsed.refresh);
        localStorage.setItem("lastRequest", new Date().getTime());
      } catch (error) {
        setIsAuth(false);
        removeTokens();
        console.error(error);
      }
    } else {
      setIsAuth(false);
    }
  }, []);

  useEffect(() => {
    if (!auth && !refresh) {
      getStorageTokens();
    }

    setInterval(() => {
      refreshSession();
    }, 3605000);
  }, [getStorageTokens]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        refresh,
        setRefresh,
        isAuth,
        setTokens,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
