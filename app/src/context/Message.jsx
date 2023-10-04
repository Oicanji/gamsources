import useMessage from "antd/es/message/useMessage";
import { createContext } from "react";

export const MessageContext = createContext({
  message: {
    info: (msg) => {},
    error: (msg) => {},
    success: (msg) => {},
    warning: (msg) => {},
  },
});

export function MessageProvider({ children }) {
  const [messageApi, contextHolder] = useMessage();

  const info = (msg) => {
    messageApi.info(msg);
  };

  const error = (msg) => {
    messageApi.error(msg);
  };

  const success = (msg) => {
    messageApi.success(msg);
  };

  const warning = (msg) => {
    messageApi.warning(msg);
  };

  const message = {
    info,
    error,
    success,
    warning,
  };

  return (
    <MessageContext.Provider value={{ message }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
}
