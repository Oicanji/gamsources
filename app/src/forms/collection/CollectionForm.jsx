import {
  Button,
  Col,
  Typography,
  Form,
  Input,
  Modal,
  Row,
  Divider,
} from "antd";
import { ThemeContext } from "../../context/Theme";
import { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/Auth";
import { MessageContext } from "../../context/Message";
import apiCollections from "../../api/collection";
import { useNavigate, useParams } from "react-router";
import { CollectionFormTags } from "./CollectionFormTags";

export function CollectionForm({
  setCollection,
  setItems,
  setSaveItems,
  updateItems,
  setUpdateItems,
}) {
  const [collectionForm] = Form.useForm();
  const { thisTheme } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);
  const { message } = useContext(MessageContext);
  const [thisCollection, setThisCollection] = useState({ name: "", date: "" });
  const [seletedTags, setSeletedTags] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (thisCollection.name == "") {
      collectionForm.setFieldValue("name", thisCollection.date_created);
    } else {
      collectionForm.setFieldValue("name", thisCollection.name);
    }
  }, [thisCollection]);

  const { id } = useParams();

  async function getCollection() {
    try {
      const res = await apiCollections.getById(id);
      message.success(res.data.msg);
      setCollection(res.data.collection.id);
      setThisCollection(res.data.collection.collection);
      setItems(res.data.collection.items);
      setRenderDiv(1);
    } catch (err) {
      navigate("/collection/0");
    }
  }

  async function getUpdateItems() {
    try {
      const res = await apiCollections.getById(id);
      setItems(res.data.collection.items);
      setUpdateItems(false);
    } catch (err) {
      navigate("/collection/0");
    }
  }

  useEffect(() => {
    if (!updateItems) {
      return;
    }
    getUpdateItems();
  }, [updateItems]);

  useEffect(() => {
    if (id == 0) return;
    getCollection();
  }, [id]);

  async function addCollection() {
    try {
      const res = await apiCollections.add(auth);
      message.success(res.data.msg);
      navigate("/collection/" + res.data.collection.id);
    } catch (err) {
      message.catch(err, "Add tag");
    }
  }

  async function saveCollection() {
    setSaveItems(true);

    if (
      collectionForm.getFieldValue("name") == thisCollection.date_created ||
      thisCollection.date_created == ""
    ) {
      return;
    }
    try {
      const res = await apiCollections.update(
        thisCollection.id,
        collectionForm.getFieldValue("name"),
        null,
        auth
      );
      message.success(res.data.msg);

      setThisCollection(res.data.collection);
    } catch (err) {
      message.catch(err, "Add tag");
    }
  }

  const templates = [
    <div
      style={{
        padding: "10px",
        backgroundColor: thisTheme.token.colorBgBase,
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <Button
        type="text"
        style={{
          color: thisTheme.token.colorPrimary,
          textAlign: "center",
          fontSize: "1.5rem",
          margin: "10px 0",
          padding: "0 20px 40px 20px",
        }}
        onClick={addCollection}
      >
        <FontAwesomeIcon icon={faAdd} />{" "}
        <span style={{ marginLeft: "10px" }}>Create new collection</span>
      </Button>
    </div>,
    <>
      <div
        style={{
          padding: "10px",
          backgroundColor: thisTheme.token.colorBgBase,
          borderRadius: "5px",
          margin: "10px",
        }}
      >
        <Row>
          <Col span={12}>
            <p
              style={{
                color: thisTheme.token.colorPrimary,
                textAlign: "left",
              }}
            >
              By registering the new item, you agree with the
              <a
                href="/terms"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: thisTheme.token.colorPrimary,
                  textDecoration: "underline",
                }}
              >
                {" "}
                usage terms (view more)
              </a>
              .
            </p>
          </Col>
          <Col
            span={12}
            style={{
              textAlign: "right",
            }}
          >
            <Button
              type="primary"
              size="small"
              ghost
              danger
              icon={<FontAwesomeIcon icon={faTrash} />}
              onClick={() => {}}
              style={{ marginRight: "10px" }}
            >
              Delete
            </Button>
            <Button
              type="primary"
              size="small"
              ghost
              icon={<FontAwesomeIcon icon={faSave} />}
              onClick={saveCollection}
            >
              Save
            </Button>
          </Col>
        </Row>
      </div>
      <div
        style={{
          padding: "10px",
          backgroundColor: thisTheme.token.colorBgBase,
          borderRadius: "5px",
          margin: "10px",
        }}
      >
        <Form
          form={collectionForm}
          style={{
            textAlign: "left",
          }}
        >
          <Divider orientation="left">Your collection</Divider>
          <Typography.Title level={4}>Name Collection:</Typography.Title>
          <Form.Item name="name">
            <Input
              style={{
                borderColor: thisTheme.token.colorPrimary,
              }}
            />
          </Form.Item>
          {thisCollection.name == "" && (
            <small>
              If not have a name, the name will be the date of creation.
            </small>
          )}
          <CollectionFormTags
            seletedTags={seletedTags}
            setSeletedTags={setSeletedTags}
          />
        </Form>
      </div>
    </>,
  ];

  const [renderDiv, setRenderDiv] = useState(0);

  return <>{templates[renderDiv]}</>;
}
