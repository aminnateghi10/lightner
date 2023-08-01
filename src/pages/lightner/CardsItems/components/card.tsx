import {useState} from "react";
import {useDispatch} from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, useColorScheme, View} from "react-native";

import {deleteCard} from "../../../../store/cards";
import {RootStackParamList} from "../../../../contracts/rootParamList";

interface PropsInterface {
    data: any,
    navigation: NativeStackNavigationProp<RootStackParamList>,
    listName: string
}

const Card = ({data, navigation, listName}: PropsInterface) => {
    const dispatch = useDispatch();
    const isDarkMode = useColorScheme() === "dark";
    const colorStyle = {color: isDarkMode ? "black" : "white"};
    const backgroundStyle = {backgroundColor: isDarkMode ? Colors.lighter : "#5a5ba2"};
    const [dropDown, setDropDown] = useState(false);

    return (
        <View style={{position:"relative"}}>
            <TouchableHighlight
                style={[Styles.card, backgroundStyle]}
                onPress={() => navigation.navigate("ShowCard", {data: data, listName})}>
                <>
                    <Icon name="ellipsis-horizontal" size={27} onPress={() => setDropDown(!dropDown)}
                          style={Styles.icon}/>
                    <Text style={[Styles.title, colorStyle]}>{data.english}</Text>
                </>
            </TouchableHighlight>
            {
                dropDown &&
                <View style={Styles.dropDown}>
                            <TouchableOpacity onPress={() => navigation.navigate("EditCard", {data, listName})}>
                                <Text style={Styles.dropDownText}>ویرایش</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => dispatch(deleteCard({listName, id: data.id}))}>
                                <Text style={Styles.dropDownText}>حذف</Text>
                            </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default Card;

const Styles = StyleSheet.create({
    card: {
        marginHorizontal: 8,
        paddingVertical: 25,
        borderRadius: 15,
        marginVertical: 10
    },
    title: {
        textAlign: "center"
    },
    icon: {
        color: "rgb(0,0,0)",
        position: "absolute",
        top: 1,
        left: 4,
        padding: 20,
        zIndex: 2
    },
    dropDown: {
        position: 'absolute',
        top: 10,
        marginTop: 10,
        backgroundColor: '#EAEAEA',
        zIndex: 999,
    },
    dropDownText: {
        color: "black",
        fontSize: 18,
        marginHorizontal: 7,
        marginVertical: 6,
        borderColor: "rgb(75,74,74)",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        textAlign: "center"
    }
});
