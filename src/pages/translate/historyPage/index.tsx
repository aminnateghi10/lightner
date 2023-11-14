import { useEffect, useState } from "react";
import Tts from "react-native-tts";
import Clipboard from "@react-native-clipboard/clipboard";
import { Modal, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DeleteEmptyIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MyText from "../../../shared/myText";
import { LightnerParamList } from "../../../contracts/rootParamList";
import { Colors } from "../../../constants/colors";
import { useTheme } from "../../../context/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowLeft from "react-native-vector-icons/AntDesign";
import EmptyList from "../../../shared/emptyList";
import HistoreyItems from "../../../components/translate/historeyItems";

interface PropsInterface {
  navigation: NativeStackNavigationProp<LightnerParamList>,
}

const Index = ({ navigation }: PropsInterface) => {
  const { currentTheme } = useTheme();

  const historyToTranslator = (item) => {
    navigation.navigate("Translate", { data: item });
  };

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
        <DeleteEmptyIcon name="delete-empty" color={currentTheme.textIcon} size={30}
                         onPress={() => setDeleteHistoryModal(true)} />
      </View>
    )
  });

  const [history, setHistory] = useState<[]>([]);
  const [deleteHistoryModal, setDeleteHistoryModal] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("translatorHistory").then(res => {
      if (res) setHistory(JSON.parse(res));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("translatorHistory", JSON.stringify(history));
  }, [history]);



  const deleteHistory = async () => {
    setDeleteHistoryModal(false);
    await AsyncStorage.removeItem("translatorHistory");
    setHistory([]);
  };

  return (
    <SafeAreaView>
      {
        history.length ?
          <HistoreyItems navigation={navigation} historyToTranslator={historyToTranslator} style={{ marginTop: 5 }} history={history} setHistory={setHistory} />
          : <EmptyList />
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
