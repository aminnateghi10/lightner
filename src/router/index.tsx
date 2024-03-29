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

import { initTheme } from "../store/theme";
import { useAppDispatch, useAppSelector } from "../store";
import { CustomDarkTheme, CustomDefaultTheme } from "../constants/themeMode";
import HeaderStyles from "../shared/headerStyles";
import TranslatePage from "../pages/translate/translatePage";
import HistoryPage from "../pages/translate/historyPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardsItems from "../pages/lightner/CardsItems/cardsItems";
import ShowCard from "../pages/lightner/showCard/showCard";
import EditCard from "../pages/lightner/editCard/editCard";
import Review from "../pages/lightner/review/review";
import AddNewCard from "../pages/lightner/addNewCard/addNewCard";
import HomeScreen from "../pages/lightner/homeScreen/homeScreen";
import RobotPage from "../pages/robot/robotPage";
import SettingPage from "../pages/setting/SettingPage";
import SupportPage from "../pages/setting/supportPage";
import Me from "../pages/setting/me";
import Login from "../pages/auth/login";
import Otp from "../pages/auth/otp";
import Messages from "../pages/setting/messages";
import SingleMassage from "../pages/setting/singleMassage";
import Backup from "../pages/setting/backup";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TabBar = () => {
  return (
      <Tab.Navigator
        initialRouteName="Lightner"
        screenOptions={{
          headerTitleAlign:"center",
          tabBarLabelStyle: { fontFamily: "Vazir-Medium-FD-WOL" },
          tabBarStyle: { height: 47 },
          tabBarHideOnKeyboard: true,
          headerShown:false,
        }}>
        <Tab.Screen name="Translate" component={TranslatePage}
                    options={{
                      title: "مترجم",
                      tabBarIcon: ({ color, size }) => <TranslateIcon name="translate" color={color} size={size} />
                    }}
        />
        <Tab.Screen name="Lightner" component={HomeScreen}
                    options={{
                      title: "لایتنر",
                      tabBarIcon: ({ color, size }) => <BoxIcon name="box" color={color} size={size} />
                    }} />
        <Tab.Screen name="Robot" component={RobotPage}
                    options={{
                      title: "ربات",
                      headerShown:true,
                      tabBarStyle:{display:'none'},
                      tabBarIcon: ({ color, size }) => <RobotIcon name="robot" color={color} size={size} />
                    }}
        />
        <Tab.Screen name="Setting" component={SettingPage}
                    options={{
                      title: "تنظیمات",
                      tabBarIcon: ({ color, size }) => <SettingIcon name="setting" color={color} size={size} />
                    }}
        />
      </Tab.Navigator>
  )
}

const Index = () => {

  const scheme = useColorScheme();
  const dispatch = useAppDispatch();

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
      <Stack.Navigator screenOptions={{
        headerTitleAlign: "center",
        statusBarHidden: true,
        // @ts-ignore
        headerStyle: HeaderStyles.headerStyle,
        headerTitleStyle: HeaderStyles.headerTitleStyle
      }}>
        <Stack.Screen name="TabBar" options={{headerShown: false}} component={TabBar}/>
        <Stack.Screen name="Backup" options={{title: "پشتیبان گیری و بازیابی"}} component={Backup}/>
        <Stack.Screen name="Login" options={{headerShown: false}} component={Login}/>
        <Stack.Screen name="Otp" options={{headerShown: false}} component={Otp}/>
        <Stack.Screen name="CardsItems" component={CardsItems}/>
        <Stack.Screen name="ShowCard" options={{title:"نمایش کارت", headerShadowVisible: false}} component={ShowCard}/>
        <Stack.Screen name="EditCard" options={{title: "ویرایش کارت"}} component={EditCard}/>
        <Stack.Screen name="Review" options={{title: "جعبه لایتنر"}} component={Review}/>
        <Stack.Screen name="Messages" options={{title: "پیام ها"}} component={Messages}/>
        <Stack.Screen name="Me" options={{title: "حساب کاربری"}} component={Me}/>
        <Stack.Screen name="SingleMassage" options={{title: "پیام ها"}} component={SingleMassage}/>
        <Stack.Screen name="AddNewCard" options={{title: "افزودن کارت جدید"}} component={AddNewCard}/>
        <Stack.Screen name="HistoryPage" options={{title: "تاریخچه"}} component={HistoryPage}/>
        <Stack.Screen name="SupportPage" options={{title: "پشتیبانی"}} component={SupportPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
