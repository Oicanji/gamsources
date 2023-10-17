import { Divider, Typography } from "antd";
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import { useNavigate } from "react-router";

export function SideContent() {
  const { user, isAuth } = useContext(AuthContext);
  const { thisTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <div
      style={{
        textAlign: "right",
        padding: "1rem",
      }}
    >
      {isAuth ? (
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
          <br />
          <Typography.Link
            style={{
              color: thisTheme.token.colorPrimary,
              textDecoration: "underline",
            }}
            onClick={() => {
              navigate("/profile");
            }}
          >
            See more here, in your profile
          </Typography.Link>
          <Divider />
          <h3>My last's creations</h3>
          <Divider />
        </div>
      ) : (
        <div>
          <h3>Log in to see more</h3>
          <Divider />
        </div>
      )}

      <h3>Filter with Categories</h3>
      <Divider />
    </div>
  );
}
