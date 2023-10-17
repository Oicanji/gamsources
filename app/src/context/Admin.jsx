import { createContext, useContext } from "react";
import { Layout } from "antd";

import { ThemeContext } from "./Theme";
import { MenuItems } from "../components/menu-items/MenuItems";
import { AuthContext } from "./Auth";

export const AdminContext = createContext({});

export function AdminProvider({ children }) {
  const { thisTheme } = useContext(ThemeContext);
  const { isAdm } = useContext(AuthContext);

  return (
    <Layout>
      {isAdm && <MenuItems theme={thisTheme} />}
      <Layout>
        <AdminContext.Provider>{children}</AdminContext.Provider>
      </Layout>
    </Layout>
  );
}
