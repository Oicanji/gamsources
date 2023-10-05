import { Skeleton } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import "./loading.styles.scss";

export function Loading({ children }) {
  const { thisTheme } = useContext(ThemeContext);
  return (
    <>
      <div
        className="loadingPage"
        style={{
          backgroundColor: thisTheme.token.colorBgBase,
          color: thisTheme.token.colorText,
        }}
      >
        <div
          style={{
            padding: "2rem",
          }}
        >
          <Skeleton active paragraph={{ rows: 15 }} />
        </div>
      </div>
      <div className="page">{children}</div>
    </>
  );
}
