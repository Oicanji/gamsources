import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Skeleton,
  Typography,
} from "antd";
import { Register } from "../register/Register";
import { MessageContext } from "../../context/Message";
import apiUser from "../../api/user";
import { AuthContext } from "../../context/Auth";

export function Login({ children }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [formLogin] = Form.useForm();

  const innerForm = (
    <div
      style={{
        textAlign: "center",
        marginBottom: "40px",
      }}
    >
      <Divider />
      <Typography.Title level={3}>Login</Typography.Title>
      <Form form={formLogin} layout="vertical" onFinish={() => handleOk()}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
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
      </Form>
      <Register />
    </div>
  );

  const innerLoading = <Skeleton active />;

  const [modalText, setModalText] = useState(innerForm);
  const { setTokens } = useContext(AuthContext);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setModalText(innerLoading);
    setConfirmLoading(true);

    try {
      const res = await apiUser.login(
        formLogin.getFieldValue("username"),
        formLogin.getFieldValue("password")
      );

      message.success("Login successfully!");
      setTokens(res.data.access_token, res.data.refresh_token);
    } catch (err) {
      message.catch(err, "Login");
    }

    setOpen(false);
    setConfirmLoading(false);
    setModalText(innerForm);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const { message } = useContext(MessageContext);

  return (
    <>
      <span onClick={showModal}>{children}</span>
      <Modal
        title="Authentication - User login"
        open={open}
        onOk={handleOk}
        okText="Login"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}
