import React, { useState } from "react";
import { Layout, theme } from "antd";
import { Menu } from "../../components/menu/Menu";

const { Header, Content } = Layout;
const { useToken } = theme;

const Home = () => {
  const { token } = useToken();

  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh", textAlign: "center" }}>
      <Content>Content</Content>
    </Layout>
  );
};

export default Home;
