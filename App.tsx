import {Provider} from "react-redux";
import type {PropsWithChildren} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {store} from "./src/store";

import ShowCard from "./src/pages/showCard/showCard";
import EditCard from "./src/pages/editCard/editCard";
import HomeScreen from "./src/pages/homeScreen/homeScreen";
import AddNewCard from "./src/pages/addNewCard/addNewCard";
import CardsItems from "./src/pages/CardsItems/cardsItems";
import {StyleSheet} from "react-native";

import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function LightnerTab() {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerTitleAlign: "center",
        statusBarHidden: true,
        headerStyle: styles.headerStyle,
        headerTintColor:'#ffffff',
        headerTitleStyle:{
          fontFamily: "Vazir-Medium-FD-WOL",
        }
      }}>
        <Stack.Screen name="Home" options={{title:'لایتنر'}} component={HomeScreen}/>
        <Stack.Screen name="ShowCard" component={ShowCard}/>
        <Stack.Screen name="EditCard" options={{title:'ویرایش کارت'}} component={EditCard}/>
        <Stack.Screen name="CardsItems" component={CardsItems}/>
        <Stack.Screen name="AddNewCard" options={{title:'افزودن کارت جدید'}} component={AddNewCard}/>
      </Stack.Navigator>
  );
}

function SettingsTab() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const App = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown:false}}>
          <Tab.Screen name="LightnerTab" component={LightnerTab} />
          <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#5a5ba2',
    color:'#b2b3d8',
    borderRadius:80,
    fontFamily: "Vazir-Medium-FD-WOL",
  },
})
