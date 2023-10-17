import { Divider, Tag, Typography } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./collection-cards.styles.scss";
import { useNavigate } from "react-router";

export function CollectionCards({ data }) {
  const { thisTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div
      className={"card-collection"}
      style={{
        borderColor: thisTheme.token.colorBorderSecondary,
        backgroundColor: thisTheme.token.colorBgBase,
        textAlign: "left",
      }}
    >
      <Typography.Title
        level={4}
        style={{
          margin: "0px 0 12px 0",
          color: thisTheme.token.colorPrimary,
        }}
      >
        ID [{data.id}] {data.name}
      </Typography.Title>

      <p>{data.date_created}</p>
      <Divider
        style={{
          marginTop: "10px",
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
      <br />
      <Typography.Text className="card-collection-likes">
        <FontAwesomeIcon icon={faHeart} /> {data.likes || 0}
      </Typography.Text>
      <br />

      <Typography.Text
        className="card-collection-link"
        onClick={() => {
          navigate(`/collection/${data.id}`);
        }}
      >
        See more in full collection.
      </Typography.Text>
    </div>
  );
}
