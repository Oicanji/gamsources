import React, { useContext, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Skeleton,
  Typography,
} from "antd";
import apiUser from "../../api/user";
import { MessageContext } from "../../context/Message";

export function Register() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [formRegister] = Form.useForm();

  const innerForm = (
    <div
      style={{
        textAlign: "center",
        marginBottom: "40px",
      }}
    >
      <Divider />
      <Typography.Title level={3}>Register new account:</Typography.Title>
      <br />
      <Form form={formRegister} layout="horizontal" onFinish={() => handleOk()}>
        <Form.Item
          label="Username"
          name="new-username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="new-password"
          rules={[
            {
              required: true,
              min: 8,
              max: 32,
              whitespace: false,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="password2"
          dependencies={["new-password"]}
          rules={[
            {
              required: true,
              min: 8,
              max: 32,
              whitespace: false,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new-password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  );

  const innerLoading = (
    <>
      <Skeleton active />
      <Skeleton active />
    </>
  );

  const [modalText, setModalText] = useState(innerForm);
  const { message } = useContext(MessageContext);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setModalText(innerLoading);
    setConfirmLoading(true);

    const res = await apiUser.register(
      formRegister.getFieldValue("new-username"),
      formRegister.getFieldValue("new-password"),
      formRegister.getFieldValue("email")
    );

    setOpen(false);
    setConfirmLoading(false);
    setModalText(innerForm);

    if (res.status == 200 || res.status == 201) {
      message.success("Register successfully!");
    } else {
      message.error("Register failed!");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="text" onClick={showModal}>
        Register now!
      </Button>
      <Modal
        title="Authentication - Create new account"
        open={open}
        onOk={formRegister.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}
