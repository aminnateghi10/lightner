import Tts from "react-native-tts";
import {useEffect, useState} from "react";
import {RouteProp} from "@react-navigation/native";
import {
    Modal, SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Edit from "react-native-vector-icons/Feather";
import Refresh from "react-native-vector-icons/Ionicons";
import Delete from "react-native-vector-icons/AntDesign";
import DoubleArrowRight from "react-native-vector-icons/FontAwesome";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import {Colors} from "../../../constants/colors";
import {RootStackParamList} from "../../../contracts/rootParamList";
// reducx
import {useAppDispatch} from "../../../store";
import {deleteCard} from "../../../store/cards";
import MyText from "../../../shared/myText";
interface PropsInterface {
    navigation: NativeStackNavigationProp<RootStackParamList>,
    route: RouteProp<RootStackParamList, "ShowCard">,
}

const ShowCard = ({route, navigation}: PropsInterface) => {
    const dispatch = useAppDispatch();
    const {data, listName} = route.params;
    const [lang, setLang] = useState(true);
    const [show, setShow] = useState(false);

    let sayAgain = () => Tts.speak(data.english);

    useEffect(() => {
        Tts.speak(data.english);
    }, []);

    const deleteHandler = () => {
        dispatch(deleteCard({listName, id: data.id}));
        navigation.goBack();
    };

    return (
        <SafeAreaView>
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['rgb(114,72,72)', 'rgb(0,178,0)']}
                style={Styles.chartProgress}>
                <MyText>نمودار پیشرفت</MyText>
                <Text style={{position: 'absolute', left: `${data.level*13}%`, width: 50, bottom: -4}}>
                    <DoubleArrowRight name="angle-double-right" size={30} color="blue"/>
                </Text>
            </LinearGradient>
            <View style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
                <TouchableOpacity style={Styles.card} onPress={() => setLang(!lang)}>
                    <MyText style={{fontSize: 30}}>{lang ? data.english : data.persian}</MyText>
                    {
                        lang &&
                        <View style={Styles.sayAgainCard}>
                            <Refresh name="refresh" onPress={sayAgain} size={27} color="rgb(0,49,255)"
                                     style={Styles.icon}/>
                            <Edit name="edit-2" size={27} color="rgb(0,49,255)" style={Styles.icon}
                                  onPress={() => navigation.navigate("EditCard", {data, listName})}/>
                            <Delete name="delete" size={27} color="rgb(0,49,255)" style={Styles.icon}
                                    onPress={() => setShow(true)}/>
                        </View>
                    }
                </TouchableOpacity>
                {
                    show &&
                    <Modal animationType="slide" transparent={true} visible={true}>
                        <View style={Styles.centeredView}>
                            <View style={Styles.modalView}>
                                <Text>آیا کارت مورد نظر حذف شود.</Text>
                                <View style={{flexDirection: "row", marginTop: 10}}>
                                    <TouchableOpacity style={Styles.btn}>
                                        <Text onPress={() => setShow(false)}>انصراف</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[Styles.btn, {backgroundColor: "rgb(161,7,7)"}]}>
                                        <Text style={{color: "white"}} onPress={deleteHandler}>حذف</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                }
            </View>
        </SafeAreaView>
    );
};

export default ShowCard;

const Styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        width: "80%",
        height: "80%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        elevation: 1,
        opacity: .8
    },
    sayAgainCard: {
        position: "absolute",
        bottom: 20,
        flexDirection: "row"
    },
    icon: {
        backgroundColor: Colors.background,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 50
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
        width: 240,
        height: 150,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50
    },
    btn: {
        margin: 5,
        backgroundColor: "rgb(126,118,118)",
        padding: 10,
        borderRadius: 10
    },
    chartProgress: {
        height: 22,
        position: 'relative',
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        alignContent:'center'
    },
});
