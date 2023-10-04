import React, { useContext, useState } from "react";
import { Layout } from "antd";
import { TopMenu } from "../../components/top-menu/TopMenu";
import { Announcement } from "../../components/announcement/Announcement";
import { ThemeContext } from "../../context/Theme";

const { Header, Content } = Layout;

const Home = () => {
  const [current, setCurrent] = useState("items");
  const { thisTheme } = useContext(ThemeContext);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: thisTheme.token.colorBgElevated,
        color: thisTheme.token.colorText,
      }}
    >
      <Announcement />
      <TopMenu onClickMenu={onClick} onMenu={current} />
      <Content>Content</Content>
    </Layout>
  );
};

export default Home;
