import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import { Announcement } from "../../components/announcement/Announcement";
import { TopMenu } from "../../components/top-menu/TopMenu";

const AddSocial = () => {
  const { thisTheme } = useContext(ThemeContext);

  return (
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
      <TopMenu />
      <div className="container-search">add social</div>
    </div>
  );
};

export default AddSocial;
