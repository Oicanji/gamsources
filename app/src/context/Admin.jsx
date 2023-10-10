import { createContext, useContext, useEffect, useState } from "react";
import { Layout } from "antd";

import { ThemeContext } from "./Theme";
import { MenuItems } from "../components/menu-items/MenuItems";
import { AuthContext } from "./Auth";
import { useLocation } from "react-router";

export const AdminContext = createContext({
  url: null,
  setUrl: () => {},
});

export function AdminProvider({ children }) {
  const [url, setUrl] = useState("");
  const { thisTheme } = useContext(ThemeContext);
  const { isAdm } = useContext(AuthContext);
  const { pathname } = useLocation();

  useEffect(() => {
    setUrl(pathname);
  }, [pathname]);

  return (
    <Layout>
      {isAdm && <MenuItems url={url} theme={thisTheme} />}
      <Layout>
        <AdminContext.Provider
          value={{
            url,
            setUrl,
          }}
        >
          {children}
        </AdminContext.Provider>
      </Layout>
    </Layout>
  );
}
