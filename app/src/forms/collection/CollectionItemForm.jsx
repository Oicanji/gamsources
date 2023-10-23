import { Card, Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../context/Auth";
import { MessageContext } from "../../context/Message";
import Dragger from "antd/es/upload/Dragger";
import { NewItemForm } from "./NewItemForm";
import { extensionsConvert, extensionsSupports } from "../../types/items";
import apiItems from "../../api/items";
import { ItemForm } from "./ItemForm";

import "./collection-item-form.styles.scss";
import { ThemeContext } from "../../context/Theme";

export function CollectionItemForm({
  collection,
  items,
  setItems,
  saveItems,
  setSaveItems,
  setUpdateItems,
}) {
  const [collectionForm] = Form.useForm();
  const { message } = useContext(MessageContext);
  const { auth } = useContext(AuthContext);
  const { thisTheme } = useContext(ThemeContext);
  const [newItems, setNewItems] = useState([]);

  const saveNewItems = async () => {
    const indexToRemoves = [];
    const newItemsArray = [...newItems];

    for (let index = 0; index < newItems.length; index++) {
      const item = newItems[index];

      try {
        const res = await apiItems.add(
          item.type,
          item.collection_id,
          item.ref,
          item.file,
          item.name,
          item.source,
          item.attr,
          item.extra,
          null,
          item.is_ia,
          item.sensitive_content,
          auth,
          item.hasOwnProperty("fileParams") ? item.fileParams : null
        );
        indexToRemoves.push(index);
      } catch (err) {
        message.catch(err, "Add item");
      }
    }

    indexToRemoves.forEach((index) => {
      newItemsArray.splice(index, 1);
    });
    setNewItems(newItemsArray);
    setUpdateItems(true);
  };

  useEffect(() => {
    if (newItems != undefined && saveItems === true) {
      saveNewItems();
      setSaveItems(false);
    }
  }, [saveItems]);

  const rewriteItem = async (itemId, newItem) => {
    try {
      const res = await apiItems.update(newItem, auth);
    } catch (err) {
      message.catch(err, "Update item");
      return;
    }

    const itemIndex = items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
      console.log(`Item com ID ${itemId} não encontrado.`);
      return;
    }

    const rewriteItems = [...items];
    rewriteItems[itemIndex] = newItem;

    setItems(rewriteItems);
  };

  const rewriteNewItem = (itemId, newItem) => {
    const itemIndex = newItems.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
      console.log(`Item com ID ${itemId} não encontrado.`);
      return;
    }

    const rewriteNewItems = [...newItems];
    rewriteNewItems[itemIndex] = newItem;

    setNewItems(rewriteNewItems);
  };

  const props = {
    name: "file",
    multiple: true,
    action: false,
    customRequest: ({ onSuccess, onError, file }) => {
      var fileType = file.type;
      var noOpen = false;

      if (extensionsSupports.includes(file.name.split(".")[1])) {
        fileType = extensionsConvert[file.name.split(".")[1]];
        noOpen = true;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        setNewItems((prevItems) => [
          ...prevItems,
          { fileParams: file, file: imageDataURL, fileType, noOpen },
        ]);
        onSuccess();
      };
      reader.readAsDataURL(file);
    },
  };

  const cardAdd = (
    <div
      style={{
        display: "flex",
      }}
    >
      <Card
        className="card-add"
        size="small"
        style={{ width: 300, height: 400 }}
      >
        <Dragger
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
          }}
          {...props}
        >
          <p style={{ fontSize: "50px" }}>
            <FontAwesomeIcon icon={faUpload} />
          </p>
          <p className="ant-upload-text">
            Click or drag file or files to this area to upload
          </p>
          <p
            className="ant-upload-hint"
            style={{
              padding: "0 10px",
            }}
          >
            <small
              style={{
                fontStyle: "italic",
                fontSize: "10px",
              }}
            >
              No supports files more than 32MB, and only images, text documents
              or audios
            </small>
          </p>
        </Dragger>
      </Card>
      <div
        className="or-div"
        style={{
          backgroundColor: thisTheme.token.colorBgContainer,
          border: `1px solid ${thisTheme.token.colorBorderSecondary}`,
        }}
      >
        OR
      </div>
      <div
        className="link-div"
        style={{
          backgroundColor: thisTheme.token.colorBgContainer,
          border: `1px solid ${thisTheme.token.colorBorderSecondary}`,
        }}
      >
        <Form.Item name="link" label="Link of image">
          <Input
            placeholder="https://www..."
            style={{
              border: `1px solid ${thisTheme.token.colorPrimary}`,
            }}
          />
        </Form.Item>
      </div>
    </div>
  );

  return (
    <>
      <div
        style={{
          padding: "0 10px",
        }}
      >
        {items &&
          items.map((item, index) => (
            <ItemForm
              item={item.item}
              key={index}
              credits={item.credits}
              rewriteItem={rewriteItem}
            />
          ))}
        {newItems.map((item, index) => (
          <NewItemForm
            item={item}
            key={index}
            rewriteNewItem={rewriteNewItem}
          />
        ))}
      </div>
      <Form
        form={collectionForm}
        layout="horizontal"
        style={{ width: "100%", padding: "5px 15px" }}
      >
        {cardAdd}
      </Form>
    </>
  );
}
