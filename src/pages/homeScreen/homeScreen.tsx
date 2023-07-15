import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import {Colors} from "react-native/Libraries/NewAppScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {
    Button,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity, TouchableWithoutFeedback,
    useColorScheme,
    View
} from "react-native";
// redux
import {RootState} from "../../store";
import {addNewList, initCardsData} from "../../store/cards";
// components
import Card from "./components/card";
import {RootStackParamList} from "../../contracts/rootStackParamList";

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
            <View style={[backgroundStyle, Styles.contener]}>
                <FlatList
                    numColumns={3}
                    data={cards?.list}
                    contentContainerStyle={{flex: 1}}
                    renderItem={({item}) => <Card navigation={navigation} data={item}/>}/>
                <TouchableHighlight style={Styles.addNewList} onPress={() => setaddNew(!addNew)}>
                    <Icon name="plus" size={27} color="white"/>
                </TouchableHighlight>
                {
                    addNew === true &&
                    <View style={Styles.dropDown}>
                        <TouchableOpacity onPress={() => setaddNew("newList")}>
                            <Text style={Styles.dropDownText}>افزودن لیست جدید</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("AddNewCard")}>
                            <Text style={Styles.dropDownText}>افزودن کارت جدید</Text>
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
                                <Text>نام لیست جدید خود را وارد کنید</Text>
                                <TextInput style={Styles.addNewListInput} onChangeText={(e) => setName(e)}/>
                                <View style={{flexDirection: "row", marginTop: 10}}>
                                    <TouchableOpacity style={{
                                        margin: 5,
                                        backgroundColor: "rgb(126,118,118)",
                                        padding: 10,
                                        borderRadius: 10
                                    }}>
                                        <Text onPress={() => setaddNew(false)}>انصراف</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{margin: 5, backgroundColor: "blue", padding: 10, borderRadius: 10}}>
                                        <Text style={{color: "white"}} onPress={addNewListHandler}>ذخیره</Text>
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
    contener: {
        height: "100%",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
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
        justifyContent: "center",
        alignContent: "center",
        margin: 20,
        backgroundColor: "rgb(189,185,185)",
        borderRadius: 20,
        width: 340,
        height: 200,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: {
            elevation: 5000,
            shadowColor: 'red',
        }
    },
    dropDown: {
        position: "absolute",
        backgroundColor: "white",
        right: 70,
        bottom: 70,
        borderRadius: 8,
        elevation: 300,
        borderWidth:1,
        borderColor:'#5a5ba2'
    },
    dropDownText: {
        color: "black",
        fontSize: 18,
        marginHorizontal: 7,
        marginVertical: 3,
        borderColor: "#5a5ba2",
        borderBottomWidth: 1,
        padding: 8,
        paddingHorizontal:3,
        borderRadius: 10
    }
});
