import { Button, ColorPicker, Form, Input } from "antd";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faAdd } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/Auth";
import { MessageContext } from "../../context/Message";
import apiTag from "../../api/tags";

export function TagForm() {
  const [tagForm] = Form.useForm();
  const { thisTheme } = useContext(ThemeContext);
  const { message } = useContext(MessageContext);
  const { auth } = useContext(AuthContext);
  const [hasColor, setHasColor] = useState(false);

  const add = async (values) => {
    if (hasColor) {
      values.color = values.color.toHexString();
    }
    try {
      const res = await apiTag.add(values, auth);

      message.success(res.data.msg);
      getTags();
    } catch (err) {
      message.catch(err, "Add tag");
    }
  };

  return (
    <Form
      form={tagForm}
      layout="vertical"
      style={{ width: "100%", padding: "10px 30px" }}
      onFinish={add}
    >
      <Form.Item
        label="Name Tag"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input a name to tag!",
          },
        ]}
      >
        <Input
          style={{
            borderColor: thisTheme.token.colorPrimary,
          }}
        />
      </Form.Item>
      <Form.Item
        label="Color Tag"
        name="color"
        style={{
          textAlign: "left",
        }}
      >
        <ColorPicker
          size="large"
          showText
          style={{
            opacity: hasColor ? 1 : 0.5,
          }}
          onChange={(color) => {
            tagForm.setFieldsValue({ color: color });
            setHasColor(true);
          }}
        />
        {hasColor ? (
          <Button
            type="primary"
            ghost
            icon={<FontAwesomeIcon icon={faEraser} />}
            onClick={() => {
              tagForm.setFieldsValue({ color: undefined });
              setHasColor(false);
            }}
            style={{
              position: "absolute",
              top: "0",
              marginLeft: "10px",
              marginTop: "4px",
            }}
          />
        ) : (
          <p>
            <small>
              If you don't select a color, the tag will be created with a random
              color.
            </small>
          </p>
        )}
      </Form.Item>
      <Form.Item
        style={{
          textAlign: "right",
        }}
      >
        <Button
          type="primary"
          ghost
          htmlType="submit"
          icon={<FontAwesomeIcon icon={faAdd} />}
        />
      </Form.Item>
    </Form>
  );
}
