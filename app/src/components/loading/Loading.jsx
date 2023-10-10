import { Skeleton } from "antd";
import "./loading.styles.scss";

export function Loading({ children }) {
  return (
    <>
      <div
        className="loadingPage"
        style={{
          backgroundColor: "#101010",
          color: "#fff",
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
