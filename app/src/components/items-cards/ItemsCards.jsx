import { Button, Card } from "antd";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/Theme";
import { AuthContext } from "../../context/Auth";
import "./items-cards.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSkull } from "@fortawesome/free-solid-svg-icons";
import { MessageContext } from "../../context/Message";
import apiItems from "../../api/items";

const { Meta } = Card;

export function ItemsCards({ data }) {
  const { thisTheme } = useContext(ThemeContext);
  const { isAdm, auth } = useContext(AuthContext);
  const { message } = useContext(MessageContext);
  const [itemVisible, setItemVisible] = useState(true);

  const handleDelete = async () => {
    try {
      const res = await apiItems.delete(data.id, auth);

      message.success(res.data.msg);
      setItemVisible(false);
    } catch (err) {
      message.catch(err, "Delete item");
    }
  };

  return (
    <Card
      className={itemVisible ? "card-item" : "card-item card-item-hidden"}
      style={{ width: 240, borderColor: thisTheme.token.colorBorderSecondary }}
      cover={<img alt="example" src={data.ref} />}
    >
      <Meta title={data.source} description={data.type} />
      {isAdm && itemVisible && (
        <div className="card-item-actions">
          <Button
            onClick={handleDelete}
            danger
            size="small"
            icon={<FontAwesomeIcon icon={faXmark} />}
          />
        </div>
      )}
      {!itemVisible && (
        <div className="card-item-dead">
          <FontAwesomeIcon icon={faSkull} />
        </div>
      )}
    </Card>
  );
}
