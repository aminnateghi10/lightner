import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    useColorScheme,
    View,
    TouchableOpacity,
    Modal, TextInput
} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import EllipsisVertical from "react-native-vector-icons/Ionicons";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import {RootStackParamList} from "../../../contracts/rootStackParamList";
import {useState} from "react";
import {deleteCard, deleteList} from "../../../store/cards";
import {useAppDispatch} from "../../../store";

const {width} = Dimensions.get("window");

interface PropsInterface {
    data: any,
    navigation: NativeStackNavigationProp<RootStackParamList>
}

const Card = ({data, navigation}: PropsInterface) => {
    const isDarkMode = useColorScheme() === "dark";
    const dispatch = useAppDispatch();
    const backgroundStyle = {backgroundColor: isDarkMode ? Colors.lighter : Colors.darker};
    const textColor = {color: isDarkMode ? "black" : "white"};

    const [dropdown, setDropdown] = useState<boolean>(false)

    return (
        <View style={Styles.col_3}>
            <TouchableHighlight
                style={[Styles.card, backgroundStyle]}
                onPress={() => navigation.navigate("CardsItems", {listName: data.name})}>
                <>
                    <EllipsisVertical
                        size={27}
                        onPress={() => setDropdown(!dropdown)}
                        style={Styles.icon}
                        name="md-ellipsis-vertical-sharp"/>
                    <Text style={[Styles.title, textColor]}>{data.name}</Text>
                </>
            </TouchableHighlight>
            {
                dropdown &&
                <View style={Styles.dropDown}>
                    <TouchableOpacity onPress={() => console.log('edig')}>
                        <Text style={Styles.dropDownText}>ویرایش</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(deleteList(data.name))}>
                        <Text style={Styles.dropDownText}>حذف</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default Card;

const Styles = StyleSheet.create({
    col_3: {
        width: width / 3
    },
    card: {
        margin: 10,
        padding: 10,
        paddingVertical: 30,
        borderRadius: 10
    },
    title: {
        textAlign: "center"
    },
    icon: {
        position: "absolute",
        top: 8,
        padding: 2,
    },

    dropDown: {
        position: "absolute",
        backgroundColor: "rgb(199,199,199)",
        left: 55,
        top: 28,
        borderRadius: 8,
        zIndex: 3
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
