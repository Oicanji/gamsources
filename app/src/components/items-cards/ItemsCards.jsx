import { Button, Divider, Tag, Tooltip, Typography } from "antd";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/Theme";
import { AuthContext } from "../../context/Auth";
import "./items-cards.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faSkull,
  faXmarksLines,
} from "@fortawesome/free-solid-svg-icons";
import { MessageContext } from "../../context/Message";
import apiItems from "../../api/items";
import { subType } from "../../types/items";

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

  console.log(data);

  return (
    <div
      className={itemVisible ? "card-item" : "card-item card-item-hidden"}
      style={{
        borderColor: thisTheme.token.colorBorderSecondary,
        backgroundColor: thisTheme.token.colorBgBase,
      }}
    >
      <Typography.Title
        level={4}
        style={{
          margin: "0px 0 12px 0",
        }}
      >
        {data.name}
        <span
          style={{
            color: thisTheme.token.colorPrimary,
            marginLeft: "10px",
          }}
        >
          {data.type.toUpperCase().slice(0, 1) + data.type.slice(1)}
        </span>
      </Typography.Title>
      <div className="canvas-file">
        {subType[data.type] == "image" && (
          <img
            className="card-item-image"
            src={data.ref.replace("api", import.meta.env.VITE_API)}
          />
        )}
        {subType[data.type] == "audio" && (
          <audio controls className="card-item-audio">
            <source src={data.ref.replace("api", import.meta.env.VITE_API)} />
          </audio>
        )}

        {subType[data.type] == "text" && (
          <iframe
            className="card-item-text"
            src={data.ref.replace("api", import.meta.env.VITE_API)}
          ></iframe>
        )}
      </div>
      <div className="canvas-search-utils">
        <div className="canvas-search-utils-items">
          {data.is_ia && (
            <Tooltip
              title="This item is IA generated"
              placement="bottomLeft"
              color="black"
            >
              <div
                className="item-ai"
                style={{
                  color: thisTheme.token.colorText,
                }}
              >
                AI
              </div>
            </Tooltip>
          )}
          {data.sensitive_content && (
            <Tooltip
              title="This item is sensitive content"
              placement="bottomLeft"
              color="red"
            >
              <div
                className="item-sensitive"
                style={{
                  color: thisTheme.token.colorError,
                }}
              >
                <FontAwesomeIcon icon={faXmarksLines} />
              </div>
            </Tooltip>
          )}
        </div>
      </div>
      <Divider
        style={{
          marginTop: "0",
          marginBottom: "10px",
        }}
      />
      <Tag color="blue">Basic</Tag>
      <Divider
        style={{
          marginBottom: "0",
          marginTop: "10px",
        }}
      />

      <Typography.Text className="card-item-link">
        See more, in the full collection.
      </Typography.Text>

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
    </div>
  );
}
