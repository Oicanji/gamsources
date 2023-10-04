import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as starSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as starRegular } from "@fortawesome/free-regular-svg-icons";
import { Button } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";

export function ButtonTheme() {
  const { thisTheme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <Button
        onClick={() => {
          setTheme(thisTheme.name === "light" ? "dark" : "light");
        }}
        type="text"
        icon={
          <FontAwesomeIcon
            icon={thisTheme.name === "light" ? starRegular : starSolid}
          />
        }
        style={{
          color: thisTheme.token.colorPrimary,
          marginTop: "0.5rem",
        }}
      />
    </>
  );
}
