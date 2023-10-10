import { ThemeProvider } from "./context/Theme";
import { MessageProvider } from "./context/Message";
import { AuthProvider } from "./context/Auth";
import { AdminProvider } from "./context/Admin";

import { Loading } from "./components/loading/Loading";

import "./App.styles.scss";

function App({ children }) {
  return (
    <>
      <ThemeProvider>
        <MessageProvider>
          <AuthProvider>
            <AdminProvider>
              <Loading>{children}</Loading>
            </AdminProvider>
          </AuthProvider>
        </MessageProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
