import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import {Colors} from "react-native/Libraries/NewAppScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {
    FlatList,
    Modal,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableOpacity, TouchableWithoutFeedback,
    useColorScheme,
    View
} from "react-native";
// redux
import {RootState} from "../../../store";
import {addNewList, initCardsData} from "../../../store/cards";
// components
import Card from "./components/card";
import {RootStackParamList} from "../../../contracts/rootStackParamList";
import MyText from "../../../shared/myText";

interface PropsInterface {
    navigation: NativeStackNavigationProp<RootStackParamList>,
}

const HomeScreen = ({navigation}: PropsInterface) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [addNew, setaddNew] = useState<boolean | "newList" | "newCard">(false);

    const isDarkMode = useColorScheme() === "dark";
    const cards = useSelector((state: RootState) => state.cards);
    const backgroundStyle = {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter};

    useEffect(() => {
        const getData = async () => {
            const value = await AsyncStorage.getItem("my-data");
            dispatch(initCardsData(JSON.parse(value ?? "")));
        };
        getData();
    }, []);
    useEffect(() => {
        const save = async () => {
            await AsyncStorage.setItem("my-data", JSON.stringify(cards));
        };
        save();
    }, [cards]);

    let addNewListHandler = () => {
        if (name) {
            dispatch(addNewList(name));
            setaddNew(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => setaddNew(false)}>
            <View style={[backgroundStyle, Styles.container]}>
                <FlatList
                    numColumns={2}
                    data={cards?.list}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => <Card navigation={navigation} data={item} />}
                />
                <TouchableHighlight style={Styles.addNewList} onPress={() => setaddNew(!addNew)}>
                    <Icon name="plus" size={27} color="white"/>
                </TouchableHighlight>
                {
                    addNew === true &&
                    <View style={Styles.dropDown}>
                        <TouchableOpacity onPress={() => setaddNew("newList")}>
                            <MyText style={Styles.dropDownText}>افزودن لیست جدید</MyText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("AddNewCard")}>
                            <MyText style={Styles.dropDownText}>افزودن کارت جدید</MyText>
                        </TouchableOpacity>
                    </View>
                }
                {
                    addNew === "newList" &&
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={addNew && true}>
                        <View style={Styles.centeredView}>
                            <View style={Styles.modalView}>
                                <MyText style={{color: 'white'}}>نام لیست جدید خود را وارد کنید</MyText>
                                <TextInput style={Styles.addNewListInput} onChangeText={(e) => setName(e)}/>
                                <View style={{flexDirection: "row", marginTop: 10}}>
                                    <TouchableOpacity style={{
                                        margin: 5,
                                        backgroundColor: "rgb(206,200,200)",
                                        padding: 10,
                                        borderRadius: 10
                                    }}>
                                        <MyText onPress={() => setaddNew(false)}>انصراف</MyText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{margin: 5, backgroundColor: "blue", padding: 10, borderRadius: 10}}>
                                        <MyText style={{color: "white"}} onPress={addNewListHandler}>ذخیره</MyText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                }
            </View>
        </TouchableWithoutFeedback>

    );
};
export default HomeScreen;

const Styles = StyleSheet.create({
    container: {
        flex:1
    },
    addNewList: {
        position: "absolute",
        bottom: 20,
        right: 20,
        padding: 15,
        borderRadius: 50,
        backgroundColor: "#7778b7"
    },
    addNewListInput: {
        borderColor: "rgb(0,0,0)",
        borderWidth: 1,
        width: "80%",
        borderRadius: 10,
        marginTop: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        justifyContent: "space-around",
        alignContent: "center",
        backgroundColor: "#5a5ba2",
        borderRadius: 20,
        width: 300,
        height: 180,
        alignItems: "center",
    },
    dropDown: {
        position: "absolute",
        backgroundColor: "white",
        right: 70,
        bottom: 70,
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOpacity: 2,
        shadowRadius: 10,
        shadowOffset: {
            height: 100,
            width: 500
        },
        borderWidth: 1,
        borderColor: '#5a5ba2'
    },
    dropDownText: {
        color: "black",
        fontSize: 18,
        marginHorizontal: 7,
        marginVertical: 3,
        borderColor: "#5a5ba2",
        borderBottomWidth: 1,
        padding: 8,
        paddingHorizontal: 3,
        borderRadius: 10
    }
});