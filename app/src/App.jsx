import { ThemeProvider } from "./context/Theme";
import Navegation from "./page";
import { BrowserRouter } from "react-router-dom";

import "./App.styles.scss";
import { MessageProvider } from "./context/Message";
import { AuthProvider } from "./context/Auth";
import { Loading } from "./components/loading/Loading";

function App() {
  return (
    <>
      <ThemeProvider>
        <MessageProvider>
          <AuthProvider>
            <Loading>
              <BrowserRouter>
                <Navegation />
              </BrowserRouter>
            </Loading>
          </AuthProvider>
        </MessageProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
