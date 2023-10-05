import { Card } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";

const { Meta } = Card;

export function ItemsCards({ data }) {
  const { thisTheme } = useContext(ThemeContext);
  return (
    <Card
      style={{ width: 240, borderColor: thisTheme.token.colorPrimary }}
      cover={<img alt="example" src={data.ref} />}
    >
      <Meta title={data.source} description={data.type} />
    </Card>
  );
}
