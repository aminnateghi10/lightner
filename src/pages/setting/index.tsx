import {createNativeStackNavigator} from "@react-navigation/native-stack";

import SettingPage from "./SettingPage";
import SupportPage from "./supportPage";
import FeedbackPage from "./feedbackPage";
import HeaderStyles from "../../shared/headerStyles";

const Index = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="SettingPage" screenOptions={{
            headerTitleAlign: "center",
            statusBarHidden: true,
            // @ts-ignore
            headerStyle: HeaderStyles.headerStyle,
            headerTitleStyle: HeaderStyles.headerTitleStyle
        }}>
            <Stack.Screen name="SettingPage" options={{title: "تنظیمات"}} component={SettingPage}/>
            <Stack.Screen name="SupportPage" options={{title: "پشتیبانی"}} component={SupportPage}/>
            <Stack.Screen name="FeedbackPage" options={{title: "ارسال بازخورد"}} component={FeedbackPage}/>
        </Stack.Navigator>
    );
}

export default Index;
