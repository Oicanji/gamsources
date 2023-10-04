import { ThemeProvider } from "./context/Theme";
import Navegation from "./page";
import { BrowserRouter } from "react-router-dom";

import "./App.styles.scss";
import { MessageProvider } from "./context/Message";

function App() {
  return (
    <>
      <ThemeProvider>
        <MessageProvider>
          <BrowserRouter>
            <Navegation />
          </BrowserRouter>
        </MessageProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
