import {createNativeStackNavigator} from "@react-navigation/native-stack";

import HistoryPage from "../translate/historyPage";
import HeaderStyles from "../../shared/headerStyles";
import TranslatePage from "../translate/translatePage";

const Index = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: "center",
            statusBarHidden: true,
            // @ts-ignore
            headerStyle: HeaderStyles.headerStyle,
            headerTitleStyle: HeaderStyles.headerTitleStyle
        }}>
            <Stack.Screen name="TranslatePage" options={{headerShown: false}} component={TranslatePage}/>
            <Stack.Screen name="HistoryPage" options={{title: "تاریخچه"}} component={HistoryPage}/>
        </Stack.Navigator>
    );
}

export default Index;
