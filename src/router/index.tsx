import { useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import BoxIcon from "react-native-vector-icons/Feather";
import { NavigationContainer } from "@react-navigation/native";
import SettingIcon from "react-native-vector-icons/AntDesign";
import TranslateIcon from "react-native-vector-icons/MaterialIcons";
import RobotIcon from "react-native-vector-icons/MaterialCommunityIcons";

// components
import Robot from "../pages/robot";
import Translate from "../pages/translate";
import Lightner from "../pages/lightner";
import Setting from "../pages/setting";

import { initTheme } from "../store/theme";
import { useAppDispatch, useAppSelector } from "../store";
import { CustomDarkTheme, CustomDefaultTheme } from "../constants/themeMode";

const Index = () => {

  const scheme = useColorScheme();
  const dispatch = useAppDispatch();
  const Tab = createBottomTabNavigator();
  const themeMode = useAppSelector(state => state.theme.mode);
  const theme = themeMode === "auto" ? scheme === "dark" ? CustomDarkTheme : CustomDefaultTheme : themeMode === "dark" ? CustomDarkTheme : CustomDefaultTheme;

  useEffect(() => {
    AsyncStorage.getItem("ThemeMode").then(res => {
      if (res) {
        dispatch(initTheme(res));
      }
    });
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName="Lightner"
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { fontFamily: "Vazir-Medium-FD-WOL" },
          tabBarStyle: { height: 47 },
          tabBarHideOnKeyboard: true
        }}>
        <Tab.Screen name="Translate" component={Translate}
                    options={{
                      title: "مترجم",
                      tabBarIcon: ({ color, size }) => <TranslateIcon name="translate" color={color} size={size} />
                    }}
        />
        <Tab.Screen name="Lightner" component={Lightner}
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
        <Tab.Screen name="Setting" component={Setting}
                    options={{
                      title: "تنظیمات",
                      tabBarIcon: ({ color, size }) => <SettingIcon name="setting" color={color} size={size} />
                    }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Index;
