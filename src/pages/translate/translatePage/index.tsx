import Tts from "react-native-tts";
import { useEffect, useState } from "react";
import Voice from "@react-native-voice/voice";
import { RouteProp } from "@react-navigation/native";
import Clipboard from "@react-native-clipboard/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActivityIndicator, Modal, StyleSheet, TouchableOpacity, View, ToastAndroid } from "react-native";
// Icons
import CloseIcon from "react-native-vector-icons/AntDesign";
import ArrowSwitchIcon from "react-native-vector-icons/Octicons";
import TranslateIcon from "react-native-vector-icons/MaterialIcons";
import CopyOutlineIcon from "react-native-vector-icons/Ionicons";
import Volume2Icon from "react-native-vector-icons/Feather";
import HistoryIcon from "react-native-vector-icons/FontAwesome";
import BoxOpenIcon from "react-native-vector-icons/FontAwesome5";
import MicrophoneIcon from "react-native-vector-icons/FontAwesome5";

import MyText from "../../../shared/myText";
import MyCard from "../../../shared/myCard";
import { Colors } from "../../../constants/colors";
import { translate } from "../../../utils/translate";
import MyTextInput from "../../../shared/myTextInput";
import { useTheme } from "../../../context/themeContext";
import { LightnerParamList } from "../../../contracts/rootParamList";
import HistoreyItems from "../../../components/translate/historeyItems";

interface PropsInterface {
  navigation: NativeStackNavigationProp<LightnerParamList>,
  route: RouteProp<LightnerParamList, "Translate">
}

const TranslatePage = ({ navigation, route }: PropsInterface) => {
  const { currentTheme } = useTheme();

  const Styles = StyleSheet.create({
    container: {
      elevation: 5,
      paddingTop: 10
    },
    header: {
      flexDirection: "row",
      justifyContent: "center"
    },
    headerTitle: {
      fontSize: 18,
      color: currentTheme.text,
      marginVertical: 5
    },
    languageChangeBox: {
      width: "100%",
      justifyContent: "space-around",
      marginTop: 15,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
      paddingBottom: 12,
      marginBottom: 5
    },
    languageTypeBox: {
      paddingBottom: 20
    },
    translationIcon: {
      flexDirection: "row-reverse",
      backgroundColor: "rgb(0,130,255)",
      width: 65,
      height: 40,
      marginRight: 10,
      justifyContent: "center",
      borderRadius: 20,
      padding: 10
    },
    answerBox: {
      marginTop: 15,
      marginHorizontal: 6,
      paddingVertical: 15,
      paddingHorizontal: 10,
      elevation: 30
    },
    historyCard: {
      backgroundColor: currentTheme.card,
      borderBottomColor: currentTheme.modalBorder,
      marginBottom: 4,
      padding: 5,
      borderBottomWidth: 1,
      marginHorizontal: 10
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      justifyContent: "space-between",
      alignContent: "center",
      backgroundColor: currentTheme.modalCard,
      borderRadius: 10,
      width: 300,
      height: 130,
      alignItems: "center",
      elevation: 3
    },
    history: {
      top: 13,
      left: 18,
      position: "absolute",
      zIndex: 1,
      padding: 7
    }
  });

  const params = route?.params;

  const [translation, setTranslation] = useState("");
  const [recognizedText, setRecognizedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [textToTranslation, setTextToTranslation] = useState<string>("");
  const [translationIcon, setTranslationIcon] = useState<boolean>(false);
  const [translatedLang, setTranslatedLang] = useState<"en" | "fa">("en");
  const [history, setHistory] = useState([]);
  const [deleteHistoryModal, setDeleteHistoryModal] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem("translatorHistory").then(res => {
        if (res) setHistory(JSON.parse(res));
        else setHistory([]);

        // handle add history to Translation
        if (params?.data) {
          let { data } = params;
          setTextToTranslation(data.text);
          setTranslation(data.sentences);
          if (data.target === "en") setTranslatedLang("fa");
          else setTranslatedLang("en");
        }

      });
    });

    return unsubscribe;
  }, [navigation]);

  let syncHistory = (history: []) => {
    AsyncStorage.setItem("translatorHistory", JSON.stringify(history));
  };

  let speak = (text: string) => Tts.speak(text);
  const handleTranslate = async () => {
    setLoading(true);
    const source = translatedLang;
    const target = translatedLang === "en" ? "fa" : "en";
    const text = textToTranslation;
    try {
      let res: any = await translate(source, target, text);
      setTranslationIcon(false);
      const sentences = res?.sentences;
      setTranslation(sentences);
      if (res) {
        const newHistory = [{ text, sentences, target, id: Date.now() }, ...history];
        setHistory(newHistory);
        syncHistory(newHistory);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    // Set up event listener for speech recognition results
    Voice.onSpeechResults = (e) => {
      setTextToTranslation(e.value[0]);
      setTranslationIcon(true);
    };

    // Clean up event listener when component unmounts
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecognition = async () => {
    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    setTextToTranslation("");
    setTranslation("");
  };

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
  };

  const copyToClipboard = () => {
    ToastAndroid.show("متن کپی شد", ToastAndroid.SHORT);
    Clipboard.setString(translation);
  };

  const changeTranslatedLang = () => {
    setTranslatedLang((prev) => {
      if (prev === "en") return "fa";
      else return "en";
    });
  };

  const historyToTranslator = (item) => {
    setTextToTranslation(item.text);
    setTranslation(item.sentences);
    if (item.target === "en") setTranslatedLang("fa");
    else setTranslatedLang("en");
  };

  const deleteHistory = async () => {
    setDeleteHistoryModal(false);
    AsyncStorage.removeItem("translatorHistory");
    setHistory([]);

  };

  return (
    <View>
      <MyCard style={Styles.container}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <MyText>{recognizedText}</MyText>
        </View>
        <TouchableOpacity style={Styles.history} onPress={() => navigation.navigate("HistoryPage")}>
          <HistoryIcon name="history" style={{ color: currentTheme.text }} size={24} />
        </TouchableOpacity>
        <View style={Styles.header}>
          <MyText style={Styles.headerTitle}>ترجمه</MyText>
        </View>
        <View
          style={[Styles.languageChangeBox, { flexDirection: `${translatedLang == "en" ? "row-reverse" : "row"}` }]}>
          <View style={{ width: "33%", alignItems: "center" }}><MyText style={{ opacity: .6 }}>فارسی</MyText></View>
          <TouchableOpacity style={{ width: "33%", alignItems: "center" }} onPress={changeTranslatedLang}>
            <ArrowSwitchIcon name="arrow-switch" style={{ color: currentTheme.text }} size={25} />
          </TouchableOpacity>
          <View style={{ width: "33%", alignItems: "center" }}><MyText style={{ opacity: .6 }}>انگلیسی</MyText></View>
        </View>
        <View style={Styles.languageTypeBox}>
          {
            textToTranslation &&
            <View style={{ flexDirection: "row" }}>
              <CloseIcon name="close" style={{ marginLeft: 5, color: currentTheme.text }} size={24}
                         onPress={handleClose} />
              {
                translatedLang === "en" &&
                <Volume2Icon onPress={() => speak(textToTranslation)} name="volume-2"
                             style={{ color: currentTheme.text }} size={26} />
              }
            </View>

          }
          <MyTextInput placeholder="متن خود را وارد کنید..." value={textToTranslation}
                       style={{ opacity: textToTranslation.length ? 1 : .5 }}
                       onChangeText={(e) => {
                         setTextToTranslation(e);
                         setTranslationIcon(true);
                       }} />
          <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center" }} onPress={startRecognition}>
            {!textToTranslation && translatedLang !== "fa" &&
              <MicrophoneIcon color={currentTheme.text} name="microphone" size={24} />}
          </TouchableOpacity>
          {
            translationIcon &&
            <TouchableOpacity style={Styles.translationIcon} onPress={handleTranslate}>
              {loading ?
                <ActivityIndicator size="small" color="#ffffff" />
                :
                <>
                  <MyText style={{ color: "white", fontSize: 12 }}> ترجمه</MyText>
                  <TranslateIcon name="translate" color="white" size={20} />
                </>
              }
            </TouchableOpacity>
          }
        </View>
      </MyCard>
      {
        translation ?
          <MyCard style={Styles.answerBox}>
            <MyText>{translation}</MyText>
            <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
              <CopyOutlineIcon
                size={23}
                color="#01a4f5"
                name="copy-outline"
                style={{ marginRight: 5 }}
                onPress={copyToClipboard} />
              <BoxOpenIcon onPress={handleSaveToLightner} style={{ marginRight: 5 }} name="box-open" color="#01a4f5"
                           size={21} />
              {
                translatedLang === "fa" &&
                <Volume2Icon onPress={() => speak(translation)} name="volume-2" color="#01a4f5" size={26} />
              }
            </View>
          </MyCard>
          :
          <View style={{ marginTop: 20 }}>
            <HistoreyItems navigation={navigation} style={{ marginTop: 5 }} history={history}
                           historyToTranslator={historyToTranslator} syncHistory={syncHistory}
                           setHistory={setHistory} />
            {
              history.length ?
                <MyText style={{ textAlign: "center", marginTop: 5, paddingVertical: 8 }}
                        onPress={() => setDeleteHistoryModal(true)}>
                  حذف کل تاریخچه
                </MyText> : null
            }
          </View>
      }
      {
        deleteHistoryModal &&
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}>
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <View>
                <MyText style={{ marginTop: 8, color: currentTheme.text, textAlign: "center" }}>تاریخچه ترجمه</MyText>
                <MyText style={{ marginTop: 10, fontSize: 13 }}>کل تاریخچه پاکسازی شود؟</MyText>
              </View>
              <View style={{ flexDirection: "row", borderTopColor: currentTheme.modalBorder, borderTopWidth: 1 }}>
                <TouchableOpacity onPress={() => setDeleteHistoryModal(false)}
                                  style={{ width: "50%", height: 40, justifyContent: "center" }}>
                  <MyText style={{ textAlign: "center", color: "#3b7edd" }}>انصراف</MyText>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  width: "50%",
                  borderLeftColor: currentTheme.modalBorder,
                  borderLeftWidth: 1,
                  justifyContent: "center"
                }}>
                  <MyText style={{ textAlign: "center", color: "#3b7edd" }} onPress={deleteHistory}>تایید</MyText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      }
    </View>
  );
};

export default TranslatePage;
