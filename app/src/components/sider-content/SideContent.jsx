import { Divider, Typography } from "antd";
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";

export function SideContent() {
  const { user, isAuth } = useContext(AuthContext);
  const { thisTheme } = useContext(ThemeContext);
  return (
    <div
      style={{
        textAlign: "right",
        padding: "1rem",
      }}
    >
      {user ? (
        <div>
          <Typography.Title level={3}>Hi, {user.username}!</Typography.Title>
          <Typography.Paragraph
            style={{
              color: thisTheme.token.colorPrimary,
            }}
          >
            {user.email ? user.email : "You don't have an email yet, what??"}
          </Typography.Paragraph>

          {isAuth ?? (
            <>
              <br></br>
              <Typography.Paragraph>Add new Collection</Typography.Paragraph>
            </>
          )}

          <Divider />
          <h3>Filter with Categories</h3>
          <Divider />
          <h3>My creations</h3>
          <Divider />
        </div>
      ) : (
        <div>
          <h3>Log in to see more</h3>
        </div>
      )}
    </div>
  );
}
