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
      <Form form={formLogin} layout="vertical" onFinish={() => handleLogin()}>
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
  const { setTokens, isAuth, auth } = useContext(AuthContext);

  const showModal = () => {
    setOpen(true);
  };

  const handleLogin = async () => {
    setModalText(innerLoading);
    setConfirmLoading(true);

    try {
      const res = await apiUser.login(
        formLogin.getFieldValue("username"),
        formLogin.getFieldValue("password")
      );

      message.success("Login successfully!");
      setTokens(
        res.data.access_token,
        res.data.refresh_token,
        res.data.is_admin,
        res.data.user
      );
    } catch (err) {
      message.catch(err, "Login");
    }

    setOpen(false);
    setConfirmLoading(false);
    setModalText(innerForm);
  };

  const handleLogoff = async () => {
    try {
      await apiUser.logout(auth);
      message.success("Logoff successfully!");
      setTokens(null, null, false, {});
    } catch (err) {
      message.catch(err, "Logoff");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { message } = useContext(MessageContext);

  return (
    <>
      <span onClick={isAuth ? handleLogoff : showModal}>{children}</span>
      <Modal
        title="Authentication - User login"
        open={open}
        onOk={handleLogin}
        okText="Login"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}
