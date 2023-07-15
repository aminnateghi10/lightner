import Tts from "react-native-tts";
import { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text, TextInput,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
import Edit from "react-native-vector-icons/Feather";
import Refresh from "react-native-vector-icons/Ionicons";
import Delete from "react-native-vector-icons/AntDesign";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Card from "./components/card";
import { RootStackParamList } from "../../contracts/rootStackParamList";
// reducx
import { useAppDispatch } from "../../store";
import { deleteCard } from "../../store/cards";

interface PropsInterface {
  navigation: NativeStackNavigationProp<RootStackParamList>,
  route: RouteProp<RootStackParamList, "ShowCard">,
}

const ShowCard = ({ route, navigation }: PropsInterface) => {
  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };
  const { data, listName } = route.params;
  const [lang, setLang] = useState(true);
  const [show, setShow] = useState(false);

  let sayAgain = () => Tts.speak(data.english);

  useEffect(() => {
    Tts.speak(data.english);
  }, []);

  const deleteHandler = () => {
    dispatch(deleteCard({ listName, id: data.id }));
    navigation.goBack();
  };

  return (
    <View style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <TouchableOpacity style={Styles.card} onPress={() => setLang(!lang)}>
        <Text style={{ fontSize: 30, color: "rgb(0,0,0)" }}>{lang ? data.english : data.persian}</Text>
        {
          lang &&
          <View style={Styles.sayAgainCard}>
            <Refresh name="refresh" onPress={sayAgain} size={27} color="rgb(0,49,255)" style={Styles.icon} />
            <Edit name="edit-2" size={27} color="rgb(0,49,255)" style={Styles.icon}
                  onPress={() => navigation.navigate("EditCard", { data, listName })} />
            <Delete name="delete" size={27} color="rgb(0,49,255)" style={Styles.icon} onPress={() => setShow(true)} />
          </View>
        }
      </TouchableOpacity>
      {
        show &&
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <Text>آیا کارت مورد نظر حذف شود.</Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <TouchableOpacity style={Styles.btn}>
                  <Text onPress={() => setShow(false)}>انصراف</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.btn, { backgroundColor: "rgb(161,7,7)" }]}>
                  <Text style={{ color: "white" }} onPress={deleteHandler}>حذف</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      }
    </View>
  );
};

export default ShowCard;

const Styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(0,132,255,0.43)",
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
    backgroundColor: "rgb(255,255,255)",
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
  }
});
