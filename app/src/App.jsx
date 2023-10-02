import { ThemeProvider } from "./context/Theme";
import Navegation from "./page";
import { BrowserRouter } from "react-router-dom";

import "./App.styles.scss";

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Navegation />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
