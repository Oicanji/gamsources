import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/Theme";
import { Announcement } from "../../components/announcement/Announcement";
import { TopMenu } from "../../components/top-menu/TopMenu";
import { Button, Col, Divider, Row, Tag, Tooltip } from "antd";
import { TagForm } from "../../forms/tag/TagForm";
import apiTag from "../../api/tags";
import { MessageContext } from "../../context/Message";
import "./add-tag.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faTrash } from "@fortawesome/free-solid-svg-icons";

const AddTag = () => {
  const { thisTheme } = useContext(ThemeContext);
  const { message } = useContext(MessageContext);
  const [tags, setTags] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);

  const getTags = async () => {
    try {
      const res = await apiTag.get(offset, limit);
      setTags(res.data.tags);
    } catch (err) {
      message.catch(err);
    }
  };

  useEffect(() => {
    getTags();
  }, [limit]);

  return (
    <div
      style={{
        display: "block",
        textAlign: "center",
        backgroundColor: thisTheme.token.colorBgLayout,
        color: thisTheme.token.colorText,
        minHeight: "100vh",
      }}
    >
      <Announcement />
      <TopMenu />
      <div style={{ padding: "10px" }}>
        <Row justify={"space-between"}>
          <Col
            span={9}
            style={{
              padding: "10px",
              backgroundColor: thisTheme.token.colorBgBase,
              borderRadius: "5px",
            }}
          >
            <Divider orientation="left">Add Tag</Divider>
            <TagForm />
          </Col>
          <Col
            span={14}
            style={{
              padding: "10px",
              backgroundColor: thisTheme.token.colorBgBase,
              borderRadius: "5px",
            }}
          >
            <Divider orientation="left">Tags Register</Divider>
            {tags.map((tag, index) => (
              <Tag
                color={tag.color}
                key={index + "_tag"}
                className="tag-created"
              >
                {tag.name}
                <div
                  style={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                  }}
                >
                  <Button
                    danger
                    type="text"
                    size="small"
                    icon={<FontAwesomeIcon icon={faTrash} />}
                  />
                </div>
              </Tag>
            ))}
            <br></br>
            <br></br>
            {limit == tags.length - 1 && (
              <Button
                type="link"
                style={{
                  color: thisTheme.token.colorPrimary,
                  borderBottom: "1px solid " + thisTheme.token.colorPrimary,
                  borderRadius: "0px",
                }}
                onClick={() => {
                  setLimit(limit + 50);
                }}
              >
                Show more tags
              </Button>
            )}
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Tooltip
                title="Reload tags from server"
                color={thisTheme.token.colorPrimary}
                placement="left"
              >
                <Button
                  type="primary"
                  ghost
                  onClick={() => {
                    getTags();
                  }}
                  icon={<FontAwesomeIcon icon={faRotate} />}
                />
              </Tooltip>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddTag;
