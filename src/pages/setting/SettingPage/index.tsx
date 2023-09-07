import { StyleSheet, TouchableHighlight, View } from "react-native";
import ArrowLeftIcon from "react-native-vector-icons/SimpleLineIcons";

import MyText from "../../../shared/myText";
import DarkMode from "./components/darkMode";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../contracts/rootParamList";
import { useTheme } from "../../../context/themeContext";


interface PropsInterface {
    navigation:NativeStackNavigationProp<RootStackParamList>
}
const SettingPage = ({navigation}:PropsInterface) => {
    const { currentTheme } = useTheme();
    const Styles = StyleSheet.create({
        card: {
            flexDirection:'row-reverse',
            justifyContent:'space-between',
            margin: 10,
            marginTop:0,
            padding: 10, borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 2,
            backgroundColor:currentTheme.card
        }
    })

    return (
        <View>
            <DarkMode/>
            <TouchableHighlight style={Styles.card} onPress={() =>navigation.navigate('SupportPage')}>
                <>
                    <MyText>پشتیبانی</MyText>
                    <ArrowLeftIcon name="arrow-left" size={20}/>
                </>
            </TouchableHighlight>
        </View>
    );
};

export default SettingPage;
