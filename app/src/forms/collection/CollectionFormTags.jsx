import { Button, ColorPicker, Divider, Form, Input, Tag, Tooltip } from "antd";
import { ThemeContext } from "../../context/Theme";
import { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faAdd,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/Auth";
import { MessageContext } from "../../context/Message";
import apiTag from "../../api/tags";

import "./collection-form-tags.styles.scss";

export function CollectionFormTags({ seletedTags, setSeletedTags }) {
  const { thisTheme } = useContext(ThemeContext);
  const { message } = useContext(MessageContext);
  const [tags, setTags] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(25);
  const [haveMore, setHaveMore] = useState(false);

  const getTags = async () => {
    try {
      const res = await apiTag.get(offset, limit);
      if (res.data.tags.length == 0) {
        setHaveMore(false);
      } else {
        var response = res.data.tags;
        response.pop();
        setTags([...tags, ...response]);
        setHaveMore(true);
        setOffset(offset + limit);
        setLimit(limit);
      }
    } catch (err) {
      message.catch(err);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Divider orientation="left">All Tags</Divider>
      <div className="tags-container">
        {tags.map((tag, index) => (
          <Tag color={tag.color} key={index + "_tag"} className="tag-created">
            <div className="tag-name">{tag.name}</div>
            <div className="tag-icon">
              <FontAwesomeIcon icon={faAdd} /> Add
            </div>
          </Tag>
        ))}
      </div>
      <br></br>
      <br></br>
      {haveMore && (
        <Button
          type="link"
          style={{
            color: thisTheme.token.colorPrimary,
            borderBottom: "1px solid " + thisTheme.token.colorPrimary,
            borderRadius: "0px",
          }}
          onClick={() => {
            getTags();
          }}
        >
          Show more tags
        </Button>
      )}
    </div>
  );
}
