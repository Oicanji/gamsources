import React, { useContext, useState } from "react";
import { TopMenuSearch } from "../../components/top-menu/TopMenuSearch";
import { Announcement } from "../../components/announcement/Announcement";
import { ThemeContext } from "../../context/Theme";
import { SearchProvider } from "../../context/Search";
import { News } from "../../components/news/News";
import { SearchResults } from "../../components/search-results/SearchResults";
import "./home.styles.scss";
import { SideContent } from "../../components/sider-content/SideContent";

const Home = () => {
  const [current, setCurrent] = useState("items");
  const { thisTheme } = useContext(ThemeContext);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <SearchProvider>
      <div
        style={{
          display: "block",
          textAlign: "center",
          backgroundColor: thisTheme.token.colorBgLayout,
          color: thisTheme.token.colorText,
          minHeight: "100vh",
        }}
      >
        <Announcement />
        <TopMenuSearch onClickMenu={onClick} onMenu={current} />
        <div className="container-search">
          <div className="container-results">
            <News />
            <SearchResults />
          </div>
          <div className="container-sider">
            <SideContent />
          </div>
        </div>
      </div>
    </SearchProvider>
  );
};

export default Home;
