import React, { useContext, useState } from "react";
import { Layout } from "antd";
import { TopMenu } from "../../components/top-menu/TopMenu";
import { Announcement } from "../../components/announcement/Announcement";
import { ThemeContext } from "../../context/Theme";
import { SearchProvider } from "../../context/Search";
import { News } from "../../components/news/News";
import { SearchResults } from "../../components/search-results/SearchResults";

const Home = () => {
  const [current, setCurrent] = useState("items");
  const { thisTheme } = useContext(ThemeContext);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <SearchProvider>
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
        <News />
        <SearchResults />
      </Layout>
    </SearchProvider>
  );
};

export default Home;
