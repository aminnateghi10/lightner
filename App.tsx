import { Provider } from "react-redux";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// icons
import BoxIcon from "react-native-vector-icons/Feather";
import SettingIcon from "react-native-vector-icons/AntDesign";
import TranslateIcon from "react-native-vector-icons/MaterialIcons";
import RobotIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { store } from "./src/store";
import ThemeContext from "./src/context/themeContext";
import { CustomDarkTheme, CustomDefaultTheme } from "./src/constants/themeMode";

// components
import Robot from "./src/pages/robot";
import Setting from "./src/pages/setting";
import Lightner from "./src/pages/lightner";
import TranslateTab from "./src/pages/translate";



const App = () => {
  const scheme = useColorScheme();
  const Tab = createBottomTabNavigator();
  const theme = scheme === "dark" ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <Provider store={store}>
      <ThemeContext>
        <NavigationContainer theme={theme}>
          <Tab.Navigator
            initialRouteName="LightnerTab"
            screenOptions={{
              headerShown: false,
              tabBarLabelStyle: {fontFamily: "Vazir-Medium-FD-WOL"},
              tabBarStyle: { height: 47 },
              tabBarHideOnKeyboard: true
            }}>
            <Tab.Screen name="TranslateTab" component={TranslateTab}
              options={{
                title: "مترجم",
                tabBarIcon: ({ color, size }) => <TranslateIcon name="translate" color={color} size={size} />
              }}
            />
            <Tab.Screen name="LightnerTab" component={Lightner}
              options={{
                title: "لایتنر",
                tabBarIcon: ({ color, size }) => <BoxIcon name="box" color={color} size={size} />
              }} />
            <Tab.Screen name="Robot" component={Robot}
              options={{
                title: "ربات",
                tabBarIcon: ({ color, size }) => <RobotIcon name="robot" color={color} size={size} />
              }}
            />
            <Tab.Screen name="Settings" component={Setting}
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
