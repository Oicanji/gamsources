import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube, faBook } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Menu as MenuAntd } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";

export function Menu({ onMenu, onClickMenu }) {
  const { thisTheme } = useContext(ThemeContext);

  return (
    <Row
      style={{
        backgroundColor: thisTheme.token.colorBgBase,
        color: thisTheme.token.colorText,
      }}
      justify="space-between"
    >
      <Col span={6}>
        <Menu
          onClick={onClickMenu}
          selectedKeys={[]}
          mode="horizontal"
          items={onMenu}
        />
      </Col>
      <Col span={6}></Col>
    </Row>
  );
}
