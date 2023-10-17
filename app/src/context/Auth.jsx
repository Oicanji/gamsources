import { createContext, useCallback, useEffect, useState } from "react";
import apiUser from "../api/user";
import { useLocation, useNavigate } from "react-router";

export const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  refresh: null,
  setRefresh: () => {},
  isAuth: null,
  setTokens: () => {},
  refreshSession: () => {},
  isAdm: false,
  setIsAdm: () => {},
  user: {},
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const { pathname } = useLocation();

  const [auth, setAuth] = useState(null);
  const [refresh, setRefresh] = useState(null);

  const [isAuth, setIsAuth] = useState(false);
  const [isAdm, setIsAdm] = useState(false);

  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const setTokens = (authToken, refreshToken, isAdm, thisUser) => {
    localStorage.setItem(
      "tokens",
      JSON.stringify({
        auth: authToken,
        refresh: refreshToken,
      })
    );

    setAuth(authToken);
    setRefresh(refreshToken);
    setIsAdm(isAdm);
    setUser(thisUser);

    localStorage.setItem("lastRequest", new Date().getTime());
    setIsAuth(authToken ? true : false);
    if (authToken === undefined) removeTokens();
  };

  const removeTokens = () => {
    localStorage.removeItem("tokens");
    if (pathname != "/") navigate("/");
  };

  const refreshSession = async () => {
    const lastRequest = localStorage.getItem("lastRequest");
    const now = new Date().getTime();
    const diff = now - lastRequest;

    if (diff < 1600000) return;

    try {
      const res = await apiUser.refresh(refresh);
      setTokens(
        res.data.access_token,
        refresh,
        res.data.is_admin,
        res.data.user
      );
    } catch (error) {
      setIsAuth(false);
      setIsAdm(false);
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
        setTokens(
          res.data.access_token,
          tokensParsed.refresh,
          res.data.is_admin,
          res.data.user
        );
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
    if (auth != null && refresh != null) return;

    getStorageTokens();

    refreshSession();
    setInterval(() => {
      refreshSession();
    }, 1600000);
  }, []);

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
        isAdm,
        setIsAdm,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
