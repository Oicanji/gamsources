import { Row, Col, Button, Tooltip } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import { ButtonTheme } from "../button-theme/ButtonTheme";
import { ButtonUser } from "../button-user/ButtonUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

export function TopMenu() {
  const { thisTheme } = useContext(ThemeContext);

  return (
    <Row
      style={{
        backgroundColor: thisTheme.token.colorBgContainer,
        color: thisTheme.token.colorText,
      }}
      justify="space-between"
    >
      <Col span={8} style={{ textAlign: "left" }}>
        <Tooltip title="Back to home page" color={thisTheme.token.colorPrimary}>
          <Button
            ghost
            type="link"
            style={{
              color: thisTheme.token.colorPrimary,
              fontSize: "1.2rem",
            }}
            onClick={() => navigation.navigate("/")}
          >
            <FontAwesomeIcon icon={faReply} />{" "}
            <span style={{ marginLeft: "0.8rem" }}>Back</span>
          </Button>
        </Tooltip>
      </Col>
      <Col
        span={4}
        style={{
          textAlign: "right",
          paddingRight: "0.45em",
        }}
      >
        <ButtonTheme /> <ButtonUser />
      </Col>
    </Row>
  );
}
