import { Provider } from "react-redux";
import type { PropsWithChildren } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { store } from "./src/store";

import ShowCard from "./src/pages/showCard/showCard";
import EditCard from "./src/pages/editCard/editCard";
import HomeScreen from "./src/pages/homeScreen/homeScreen";
import AddNewCard from "./src/pages/addNewCard/addNewCard";
import CardsItems from "./src/pages/CardsItems/cardsItems";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ShowCard" component={ShowCard} />
          <Stack.Screen name="EditCard" component={EditCard} />
          <Stack.Screen name="CardsItems" component={CardsItems} />
          <Stack.Screen name="AddNewCard" component={AddNewCard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
