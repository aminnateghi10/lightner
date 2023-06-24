/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Provider } from "react-redux";
import type { PropsWithChildren } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { store } from "./src/store";

import ShowCard from "./src/pages/showCard/showCard";
import HomeScreen from "./src/pages/homeScreen/homeScreen";
import AddNewList from "./src/pages/addNewList/addNewList";
import AddNewCard from "./src/pages/addNewCard/addNewCard";
import CardsItems from "./src/pages/CardsItems/cardsItems";

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddNewList" component={AddNewList} />
          <Stack.Screen name="CardsItems" component={CardsItems} />
          <Stack.Screen name="AddNewCard" component={AddNewCard} />
          <Stack.Screen name="ShowCard" component={ShowCard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
    ;
}

export default App;
