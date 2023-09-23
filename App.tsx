import { Provider } from "react-redux";

import Router from "./src/router";
import { store } from "./src/store";
import ThemeContext from "./src/context/themeContext";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeContext>
        <Router />
      </ThemeContext>
    </Provider>
  );
};

export default App;
