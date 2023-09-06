import { Provider } from "react-redux";
import { StyleSheet, useColorScheme } from "react-native";
import BoxIcon from "react-native-vector-icons/Feather";
import SettingIcon from "react-native-vector-icons/AntDesign";
import TranslateIcon from "react-native-vector-icons/MaterialIcons";
import RobotIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { store } from "./src/store";

import ShowCard from "./src/pages/lightner/showCard/showCard";
import EditCard from "./src/pages/lightner/editCard/editCard";
import HomeScreen from "./src/pages/lightner/homeScreen/homeScreen";
import AddNewCard from "./src/pages/lightner/addNewCard/addNewCard";
import CardsItems from "./src/pages/lightner/CardsItems/cardsItems";
import Review from "./src/pages/lightner/review/review";

import RobotPage from "./src/pages/robot/robotPage";
import SettingPage from "./src/pages/setting/SettingPage";
import TranslatePage from "./src/pages/translate/translatePage";
import { CustomDarkTheme, CustomDefaultTheme } from "./src/constants/themeMode";
import ThemeContext from "./src/context/themeContext";
import { useState } from "react";
import SupportPage from "./src/pages/setting/supportPage";
import FeedbackPage from "./src/pages/setting/feedbackPage";

function LightnerTab() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerTitleAlign: "center",
      statusBarHidden: true,
      headerStyle: styles.headerStyle,
      headerTitleStyle: {
        fontFamily: "Vazir-Medium-FD-WOL"
      }
    }}>
      <Stack.Screen name="Home" options={{ title: "لایتنر" }} component={HomeScreen} />
      <Stack.Screen name="ShowCard" options={{ title: "نمایش کارت" }} component={ShowCard} />
      <Stack.Screen name="EditCard" options={{ title: "ویرایش کارت" }} component={EditCard} />
      <Stack.Screen name="Review" options={{ title: "جعبه لایتنر" }} component={Review} />
      <Stack.Screen name="CardsItems" component={CardsItems} />
      <Stack.Screen name="AddNewCard" options={{ title: "افزودن کارت جدید" }} component={AddNewCard} />
    </Stack.Navigator>
  );
}

function SettingsTab() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="SettingPage" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingPage" component={SettingPage} />
      <Stack.Screen name="SupportPage" component={SupportPage} />
      <Stack.Screen name="FeedbackPage" component={FeedbackPage} />
    </Stack.Navigator>
  );
}

const App = () => {
  const scheme = useColorScheme();
  const [themeMode, setThemeMode] = useState("");
  const Tab = createBottomTabNavigator();
  const theme = scheme == "dark" ? CustomDarkTheme : CustomDefaultTheme;
  return (
    <Provider store={store}>
      <ThemeContext>
        <NavigationContainer theme={theme}>
          <Tab.Navigator
            initialRouteName="LightnerTab"
            screenOptions={{
              headerShown: false,
              tabBarLabelStyle: {
                fontFamily: "Vazir-Medium-FD-WOL"
              },
              tabBarStyle: { height: 47 },
              tabBarHideOnKeyboard: true
            }}>
            <Tab.Screen
              name="translate"
              component={TranslatePage}
              options={{
                title: "مترجم",
                tabBarIcon: ({ color, size }) => <TranslateIcon name="translate" color={color} size={size} />
              }}
            />
            <Tab.Screen
              name="LightnerTab"
              component={LightnerTab}
              options={{
                title: "لایتنر",
                tabBarIcon: ({ color, size }) => <BoxIcon name="box" color={color} size={size} />
              }} />
            <Tab.Screen
              name="Robot"
              component={RobotPage}
              options={{
                title: "ربات",
                tabBarIcon: ({ color, size }) => <RobotIcon name="robot" color={color} size={size} />
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsTab}
              options={{
                title: "تنظیمات",
                tabBarIcon: ({ color, size }) => <SettingIcon name="setting" color={color} size={size} />
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeContext>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  headerStyle: {
    color: "#b2b3d8",
    borderRadius: 80,
    fontFamily: "Vazir-Medium-FD-WOL"
  }
});
