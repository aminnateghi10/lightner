import { useEffect, useState } from "react";
import Tts from "react-native-tts";
import Clipboard from "@react-native-clipboard/clipboard";
import { Modal, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// Icons
import CloseIcon from "react-native-vector-icons/AntDesign";
import ArrowRightIcon from "react-native-vector-icons/AntDesign";
import TranslateIcon from "react-native-vector-icons/MaterialIcons";
import CopyOutlineIcon from "react-native-vector-icons/Ionicons";
import Volume2Icon from "react-native-vector-icons/Feather";
import HistoryIcon from "react-native-vector-icons/FontAwesome";
import DeleteEmptyIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FileText1Icon from "react-native-vector-icons/AntDesign";

import BoxOpenIcon from "react-native-vector-icons/FontAwesome5";
import MyText from "../../../shared/myText";
import { translate } from "../../../utils/translate";
import MyTextInput from "../../../shared/myTextInput";
import { LightnerParamList } from "../../../contracts/rootParamList";
import MyCard from "../../../shared/myCard";
import { Colors } from "../../../constants/colors";
import { useTheme } from "../../../context/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowLeft from "react-native-vector-icons/AntDesign";
import EmptyList from "../../../shared/emptyList";

interface PropsInterface {
  navigation: NativeStackNavigationProp<LightnerParamList>,
}

const Index = ({ navigation }: PropsInterface) => {
  const { currentTheme } = useTheme();

  const Styles = StyleSheet.create({
    container: {},
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: Colors.card,
      height: 55,
      padding: 12,
      borderColor: "red"
    },
    headerTitle: {
      fontSize: 18
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
    }
  });

  navigation.setOptions({
    header: () => (
      <View style={Styles.headerContainer}>
        <ArrowLeft style={{ textAlign: "left" }} name="arrowleft" size={27} onPress={() => navigation.goBack()} />
        <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
          <MyText style={Styles.headerTitle}>تاریخچه</MyText>
        </View>
        <DeleteEmptyIcon name="delete-empty" color={currentTheme.textIcon} size={30} onPress={() => setDeleteHistoryModal(true)} />
      </View>
    )
  });


  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [textToTranslation, setTextToTranslation] = useState<string>("");
  const [translationIcon, setTranslationIcon] = useState<boolean>(false);
  const [translatedLang, setTranslatedLang] = useState<"en" | "fa">("en");
  const [history, setHistory] = useState<[]>([]);
  const [deleteHistoryModal, setDeleteHistoryModal] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("translatorHistory").then(res => {
      if (res) setHistory(JSON.parse(res));
    });
  }, []);

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
        const newHistory = [{ text, sentences, target }, ...history];
        await AsyncStorage.setItem("translatorHistory", JSON.stringify(newHistory));
        setHistory(newHistory);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
    navigation.navigate('Translate', { data: item })
  };

  const deleteHistory = async () => {
    setDeleteHistoryModal(false);
    await AsyncStorage.removeItem("translatorHistory");
    setHistory([]);

  };

  return (
    <SafeAreaView>
      {
        history.length ?
          <View style={{ marginTop: 10 }}>
            {
              history.map((item, index) => (
                <TouchableOpacity key={index} style={Styles.historyCard} onPress={() => historyToTranslator(item)}>
                  <>
                    <MyText style={{ fontSize: 14, color: "black" }}>{item?.text}</MyText>
                    <MyText>{item?.sentences}</MyText>
                  </>
                </TouchableOpacity>
              ))
            }
          </View>
          :<EmptyList/>
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
    </SafeAreaView>
  );
};

export default Index;
