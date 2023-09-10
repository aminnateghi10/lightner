import {useState} from "react";
import {Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";

import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowLeftIcon from "react-native-vector-icons/SimpleLineIcons";

import MyText from "../../../../shared/myText";
import CustomToast from "../../../../shared/customToast";
import { useTheme } from "../../../../context/themeContext";

const DarkMode = () => {
    const { currentTheme } = useTheme();
    const Styles = StyleSheet.create({
        card: {
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            margin: 10,
            marginTop: 0,
            backgroundColor: currentTheme.card,
            padding: 12,
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 2
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
        },
        modalView: {
            justifyContent: "space-around",
            alignContent: "center",
            backgroundColor: "#ffffff",
            borderRadius: 20,
            width: 300,
            elevation: 300,
            height: 200,
            alignItems: "center",
        },
    });


    const [show, setShow] = useState<boolean>(false);
    const [activeBox, setActiveBox] = useState('automatic');
    const changeModeHandler = async () => {
        await AsyncStorage.setItem('ThemeMode', activeBox);
        setShow(false);
        Toast.show({type: "success", text1: 'تم با موفقیت تغییر کرد.'});
    }

    const listCheckBox = [
        {text: 'حالت اتوماتیک', value: 'automatic'},
        {text: 'حالت تاریک', value: 'dark'},
        {text: 'حالت روشن', value: 'light'},
    ]
    return (
        <>
            <TouchableHighlight style={Styles.card} onPress={() => setShow(true)}>
                <>
                    <MyText>حالت تاریک</MyText>
                    <ArrowLeftIcon name="arrow-left" size={20}/>
                </>
            </TouchableHighlight>
            {
                show &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={true}>
                    <View style={Styles.centeredView}>
                        <View style={Styles.modalView}>
                            <View style={{width: '80%', marginVertical: 10}}>
                                {
                                    listCheckBox.map(item => (
                                        <TouchableOpacity
                                            key={item.value}
                                            onPress={() => setActiveBox(item.value)}
                                            style={{
                                                flexDirection: 'row-reverse',
                                                justifyContent: 'space-between',
                                                borderRadius: 50,
                                                borderColor: `${item.value === activeBox ? 'blue' : 'rgb(126,118,118)'}`,
                                                borderWidth: 1,
                                                padding: 5,
                                                marginVertical: 3
                                            }}>
                                            <>
                                                <MyText>{item.text}</MyText>
                                                <Text style={{
                                                    width: 25,
                                                    height: 25,
                                                    backgroundColor: `${item.value === activeBox ? 'blue' : 'rgb(199,199,199)'}`,
                                                    borderRadius: 50
                                                }}></Text>
                                            </>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                                <TouchableOpacity style={{
                                    margin: 5,
                                    backgroundColor: "rgb(206,200,200)",
                                    padding: 10,
                                    borderRadius: 10
                                }}>
                                    <MyText onPress={() => setShow(false)}>انصراف</MyText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{margin: 5, backgroundColor: "blue", padding: 10, borderRadius: 10}}>
                                    <MyText style={{color: "white"}} onPress={changeModeHandler}>ذخیره</MyText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            }
            <CustomToast/>
        </>
    );
};

export default DarkMode;
