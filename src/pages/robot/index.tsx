import {createNativeStackNavigator} from "@react-navigation/native-stack";

import RobotPage from "./robotPage";
import HeaderStyles from "../../shared/headerStyles";

const Index = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerTitleAlign: "center",
            statusBarHidden: true,
            // @ts-ignore
            headerStyle: HeaderStyles.headerStyle,
            headerTitleStyle: HeaderStyles.headerTitleStyle
        }}>
            <Stack.Screen name="RobotPage" options={{title: "ربات"}} component={RobotPage}/>
        </Stack.Navigator>
    );
}

export default Index;
