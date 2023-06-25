import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import { Colors } from "react-native/Libraries/NewAppScreen";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
// redux
import { RootState } from "../../store";
import { addNewList } from "../../store/cards";
// components
import Card from "./components/card";
import { RootStackParamList } from "../../contracts/rootStackParamList";

interface PropsInterface {
  navigation: NativeStackNavigationProp<RootStackParamList>,
}

const HomeScreen = ({ navigation }: PropsInterface) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [newList, setNewList] = useState(false);

  const isDarkMode = useColorScheme() === "dark";
  const list = useSelector((state: RootState) => state.cards.list);
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };

  let addNewListHandler = () => {
    if (name) {
      dispatch(addNewList(name));
      setNewList(false);
    }
  };

  return (
    <View style={[backgroundStyle, Styles.contener]}>
      <FlatList
        numColumns={3}
        data={list}
        renderItem={({ item }) => <Card navigation={navigation} data={item} />} />
      <TouchableHighlight style={Styles.addNewList}>
        <Icon name="plus" size={27} color="black" onPress={() => setNewList(!newList)} />
      </TouchableHighlight>
      {
        newList ?
          <Modal
            animationType="slide"
            transparent={true}
            visible={newList}>
            <View style={Styles.centeredView}>
              <View style={Styles.modalView}>
                <Text>نام لیست جدید خود را وارد کنید</Text>
                <TextInput style={Styles.addNewListInput} onChangeText={(e) => setName(e)} />
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <TouchableOpacity style={{
                    margin: 5,
                    backgroundColor: "rgb(126,118,118)",
                    padding: 10,
                    borderRadius: 10
                  }}>
                    <Text onPress={() => setNewList(false)}>انصراف</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ margin: 5, backgroundColor: "blue", padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: "white" }} onPress={addNewListHandler}>ذخیره</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          : null
      }

    </View>
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
    bottom: 40,
    right: 30,
    padding: 15,
    borderRadius: 50,
    backgroundColor: "rgb(255,85,0)"
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
    elevation: 50
  }
});
