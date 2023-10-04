import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube, faBook } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Menu } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import { ButtonTheme } from "../button-theme/ButtonTheme";
import { ButtonUser } from "../button-user/ButtonUser";

const menus = [
  {
    label: "Items",
    key: "items",
    icon: <FontAwesomeIcon icon={faCube} />,
  },
  {
    label: "Collections",
    key: "collections",
    icon: <FontAwesomeIcon icon={faBook} />,
  },
];

export function TopMenu({ onMenu, onClickMenu }) {
  const { thisTheme } = useContext(ThemeContext);

  return (
    <Row
      style={{
        backgroundColor: thisTheme.token.colorBgContainer,
        color: thisTheme.token.colorText,
      }}
      justify="space-between"
    >
      <Col span={8}>
        <Menu
          onClick={onClickMenu}
          selectedKeys={[onMenu]}
          mode="horizontal"
          items={menus}
          style={{
            borderBottom: "0px solid " + thisTheme.token.colorBgBase,
          }}
        />
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
