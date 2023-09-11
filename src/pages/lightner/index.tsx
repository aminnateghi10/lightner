import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Review from "./review/review";
import EditCard from "./editCard/editCard";
import ShowCard from "./showCard/showCard";
import HomeScreen from "./homeScreen/homeScreen";
import CardsItems from "./CardsItems/cardsItems";
import AddNewCard from "./addNewCard/addNewCard";
import HeaderStyles from "./../../shared/headerStyles";

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
            <Stack.Screen name="Home" options={{title: "لایتنر"}} component={HomeScreen}/>
            <Stack.Screen name="ShowCard" options={{title: "نمایش کارت"}} component={ShowCard}/>
            <Stack.Screen name="EditCard" options={{title: "ویرایش کارت"}} component={EditCard}/>
            <Stack.Screen name="Review" options={{title: "جعبه لایتنر"}} component={Review}/>
            <Stack.Screen name="CardsItems" component={CardsItems}/>
            <Stack.Screen name="AddNewCard" options={{title: "افزودن کارت جدید"}} component={AddNewCard}/>
        </Stack.Navigator>
    );
}

export default Index;
