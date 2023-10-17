import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import { Announcement } from "../../components/announcement/Announcement";
import { TopMenu } from "../../components/top-menu/TopMenu";

import { Divider, Typography } from "antd";

const NotFound = () => {
  const { thisTheme } = useContext(ThemeContext);
  return (
    <div
      style={{
        display: "block",
        textAlign: "center",
        backgroundColor: thisTheme.token.colorBgLayout,
        minHeight: "100vh",
      }}
    >
      <Announcement />
      <TopMenu />

      <div
        style={{
          padding: "30px",
          backgroundColor: thisTheme.token.colorBgBase,
          borderRadius: "5px",
          margin: "10px",
          color: thisTheme.token.colorPrimary,
        }}
      >
        <p
          style={{
            fontSize: "140px",
            fontWeight: "bold",
            margin: "0",
          }}
        >
          404
        </p>
        <Divider />
        <p strong>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
