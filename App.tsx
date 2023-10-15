import { useEffect } from "react";
import { Provider } from "react-redux";

import Router from "./src/router";
import { store } from "./src/store";
import ThemeContext from "./src/context/themeContext";
import usePushNotification from "./src/components/pushNotification";

const App = () => {
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, []);

  return (
    <Provider store={store}>
      <ThemeContext>
        <Router />
      </ThemeContext>
    </Provider>
  );
};

export default App;
