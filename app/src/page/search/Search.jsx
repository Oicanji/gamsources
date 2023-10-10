import { useContext, useState } from "react";
import { SearchProvider } from "../../context/Search";
import { ThemeContext } from "../../context/Theme";
import { Announcement } from "../../components/announcement/Announcement";
import { TopMenuSearch } from "../../components/top-menu/TopMenuSearch";

const Search = () => {
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
        <div className="container-search">Search</div>
      </div>
    </SearchProvider>
  );
};

export default Search;
