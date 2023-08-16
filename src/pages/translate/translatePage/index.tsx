import React, {useState} from 'react';
import Toast from "react-native-toast-message";
import Clipboard from '@react-native-clipboard/clipboard';
import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
// Icons
import CloseIcon from "react-native-vector-icons/AntDesign";
import ArrowRightIcon from "react-native-vector-icons/AntDesign";
import TranslateIcon from "react-native-vector-icons/MaterialIcons";
import CopyOutlineIcon from "react-native-vector-icons/Ionicons";
import BoxOpenIcon from "react-native-vector-icons/FontAwesome5";

import MyText from "../../../shared/myText";
import {translate} from "../../../utils/translate";
import MyTextInput from "../../../shared/myTextInput";
import CustomToast from "../../../shared/customToast";
import {RootStackParamList} from "../../../contracts/rootParamList";
import MyCard from "../../../shared/myCard";

interface PropsInterface {
    navigation: NativeStackNavigationProp<RootStackParamList>,
}

const TranslatePage = ({navigation}: PropsInterface) => {
    const [translation, setTranslation] = useState('');
    const [loading, setLoading] = useState(false);
    const [textToTranslation, setTextToTranslation] = useState<string>('');
    const [translationIcon, setTranslationIcon] = useState<boolean>(false);
    const [translatedLang, setTranslatedLang] = useState<'en' | 'fa'>('en');


    const handleTranslate = async () => {
        setLoading(true);
        const source = translatedLang;
        const target = translatedLang === "en" ? "fa" : 'en';
        const text = textToTranslation;
        try {
            let res: any = await translate(source, target, text);
            setTranslationIcon(false);
            setTranslation(res?.sentences);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setTextToTranslation('');
        setTranslation('');
    }

    const handleSaveToLightner = () => {
        if (translatedLang === "en") {
            navigation.navigate("AddNewCard", {
                data: {
                    english: textToTranslation,
                    persian: translation,
                    id: Date.now()
                }
            });
        } else {
            navigation.navigate("AddNewCard", {
                data: {
                    english: translation,
                    persian: textToTranslation,
                    id: Date.now()
                }
            });
        }
    }

    const copyToClipboard = () => {
        Clipboard.setString(translation);
        Toast.show({type: "success", text1:'متن کپی شد.',visibilityTime:500});

    }

    const changeTranslatedLang = () => {
        setTranslatedLang((prev) => {
            if (prev === 'en') return 'fa';
            else return 'en';
        })
    }

    return (
        <View>
            <MyCard style={Styles.container}>
                <View style={Styles.header}><MyText style={Styles.headerTitle}>ترجمه</MyText></View>
                <View
                    style={[Styles.languageChangeBox, {flexDirection: `${translatedLang == 'en' ? 'row-reverse' : 'row'}`}]}>
                    <View><MyText>فارسی</MyText></View>
                    <TouchableOpacity onPress={changeTranslatedLang}>
                        <ArrowRightIcon name="arrowright" size={25}/>
                    </TouchableOpacity>
                    <View><MyText>انگلیسی</MyText></View>
                </View>
                <View style={Styles.languageTypeBox}>
                    {
                        textToTranslation &&
                        <CloseIcon name="close" style={{marginLeft: 5}} size={24} onPress={handleClose}/>
                    }
                    <MyTextInput placeholder="متن خود را وارد کنید..." value={textToTranslation}
                                 onChangeText={(e) => {
                                     setTextToTranslation(e);
                                     setTranslationIcon(true);
                                 }}/>
                    {
                        translationIcon &&
                        <TouchableOpacity style={Styles.translationIcon} onPress={handleTranslate}>
                            {loading ?
                                <ActivityIndicator size="small" color="#ffffff"/>
                                :
                                <>
                                    <MyText style={{color: 'rgb(255,255,255)'}}> ترجمه</MyText>
                                    <TranslateIcon name="translate" color='rgb(255,255,255)' size={25}/>
                                </>
                            }

                        </TouchableOpacity>
                    }
                </View>
            </MyCard>
            {
                translation &&
                <MyCard style={Styles.answerBox}>
                    <MyText>{translation}</MyText>
                    <View style={{flexDirection: "row", marginTop: 10}}>
                        <CopyOutlineIcon
                            size={23}
                            color="#01a4f5"
                            name="copy-outline"
                            style={{marginRight: 5}}
                            onPress={copyToClipboard}/>
                        <BoxOpenIcon onPress={handleSaveToLightner} name="box-open" color="#01a4f5" size={21}/>
                    </View>
                </MyCard>
            }
            <CustomToast/>
        </View>
    );
};

export default TranslatePage;

const Styles = StyleSheet.create({
    container: {
        elevation: 30
    },
    header: {
        flexDirection: "row",
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 18,
    },
    languageChangeBox: {
        width: "100%",
        justifyContent: 'space-around',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(50,50,50)',
        paddingBottom: 12,
        marginBottom: 5,
    },
    languageTypeBox: {
        paddingBottom: 20
    },
    translationIcon: {
        flexDirection: 'row-reverse',
        backgroundColor: 'rgb(0,130,255)',
        width: 65,
        height: 46,
        marginRight: 10,
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10
    },
    answerBox: {
        marginTop: 15,
        marginHorizontal: 6,
        paddingVertical: 30,
        paddingHorizontal: 10,
        elevation: 30
    }
})
