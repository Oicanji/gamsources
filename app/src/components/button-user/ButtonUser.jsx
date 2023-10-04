import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as userSolid } from "@fortawesome/free-solid-svg-icons";
import { faUser as userRegular } from "@fortawesome/free-regular-svg-icons";
import { Button } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import { Login } from "../login/Login";

export function ButtonUser() {
  const { thisTheme } = useContext(ThemeContext);

  return (
    <Login>
      <Button
        type="text"
        icon={<FontAwesomeIcon icon={userRegular} />}
        style={{
          color: thisTheme.token.colorPrimary,
          marginTop: "0.5rem",
        }}
      />
    </Login>
  );
}
