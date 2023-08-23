import {
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    useColorScheme,
    View,
    TouchableOpacity,
} from "react-native";
import {useState} from "react";
import {Colors} from "../../../../constants/colors";
import EllipsisVertical from "react-native-vector-icons/Ionicons";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import {RootStackParamList} from "../../../../contracts/rootParamList";
import {deleteCard, deleteList} from "../../../../store/cards";
import {useAppDispatch} from "../../../../store";
import MyText from "../../../../shared/myText";

const {width} = Dimensions.get("window");

interface PropsInterface {
    data: any,
    navigation: NativeStackNavigationProp<RootStackParamList>,
    index:number,
}

const Card = ({data,index ,navigation , dropdown , setDropdown}: PropsInterface) => {
    const isDarkMode = useColorScheme() === "dark";
    const dispatch = useAppDispatch();

    return (
        <View style={[Styles.col_3,{zIndex:-index}]}>
            <TouchableHighlight
                style={Styles.card}
                onPress={() => navigation.navigate("CardsItems", {listName: data.name})}>
                <>
                    <EllipsisVertical
                        size={27}
                        onPress={() => setDropdown(data.id)}
                        style={Styles.icon}
                        name="md-ellipsis-vertical-sharp"/>
                    <MyText style={Styles.title}>{data.name}</MyText>
                </>
            </TouchableHighlight>
            {
              dropdown === data.id &&
                <View style={Styles.dropDown}>
                    <TouchableOpacity onPress={() => console.log('edig')}>
                        <MyText style={Styles.dropDownText}>ویرایش</MyText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(deleteList(data.name))}>
                        <MyText style={Styles.dropDownText}>حذف</MyText>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default Card;

const Styles = StyleSheet.create({
    col_3: {
        width: width / 2
    },
    card: {
        margin: 10,
        padding: 10,
        paddingVertical: 30,
        borderRadius: 10,
        backgroundColor:Colors.card,
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
        left: 40,
        top: 20,
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
