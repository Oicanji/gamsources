import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Button } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import { Login } from "../login/Login";
import { AuthContext } from "../../context/Auth";

export function ButtonUser() {
  const { thisTheme } = useContext(ThemeContext);
  const { isAuth } = useContext(AuthContext);
  return (
    <Login>
      <Button
        type="text"
        icon={<FontAwesomeIcon icon={isAuth ? faPowerOff : faUser} />}
        style={{
          color: thisTheme.token.colorPrimary,
          marginTop: "0.5rem",
        }}
      />
    </Login>
  );
}
