import useMessage from "antd/es/message/useMessage";
import { createContext } from "react";

export const MessageContext = createContext({
  message: {
    /**
     * Send info message to user
     * @param {string} msg
     */
    info: (msg) => {},
    /**
     * Send error message to user
     * @param {string} msg
     */
    error: (msg) => {},
    /**
     * Send success message to user
     * @param {string} msg
     */
    success: (msg) => {},
    /**
     * Send warning message to user
     * @param {string} msg
     */
    warning: (msg) => {},
    /**
     * Use to response error to server to user
     * @param {any} err
     * @param {string} action
     */
    catch: (err, action) => {},
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

  const catch_error = (err, action) => {
    var error = err.request.response;
    error = JSON.parse(error);

    message.error(
      error
        ? error.hasOwnProperty("error")
          ? error.error
          : error.hasOwnProperty("msg")
          ? error.msg
          : action + " failed!"
        : action + " failed!"
    );
  };

  const message = {
    info,
    error,
    success,
    warning,
    catch: catch_error,
  };

  return (
    <MessageContext.Provider value={{ message }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
}
