import { Provider } from "react-redux";
import messaging from '@react-native-firebase/messaging';

import Router from "./src/router";
import { store } from "./src/store";
import ThemeContext from "./src/context/themeContext";
import { useEffect } from "react";
import { Alert } from 'react-native';

const App = () => {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

    });

    return unsubscribe;
  }, []);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('this id my token:',token);
  }

  useEffect(()=>{
    requestUserPermission();
    getToken();
  },[])

  return (
    <Provider store={store}>
      <ThemeContext>
        <Router />
      </ThemeContext>
    </Provider>
  );
};

export default App;
