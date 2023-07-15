import { useState } from "react";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, useColorScheme, View } from "react-native";

import { deleteCard } from "../../../store/cards";
import { RootStackParamList } from "../../../contracts/rootStackParamList";

interface PropsInterface {
  data:any,
  navigation:NativeStackNavigationProp<RootStackParamList>,
  listName:string
}
const Card = ({ data, navigation, listName }: PropsInterface) => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === "dark";
  const colorStyle = { color: isDarkMode ? "black" : "white" };
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.lighter : Colors.darker };
  const [drapDown, setDrapDown] = useState(false);

  return (
    <TouchableHighlight
      style={[Styles.card, backgroundStyle]}
      onPress={() => navigation.navigate("ShowCard", { data: data , listName })}>
      <>
        <Icon name="ellipsis-horizontal" size={27} onPress={() => setDrapDown(!drapDown)} style={Styles.icon} />
        {
          drapDown &&
          <View style={Styles.drapDown}>
            <TouchableOpacity onPress={() => navigation.navigate("EditCard", { data,listName })}>
              <Text style={Styles.drapDownText}>ویرایش</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(deleteCard({ listName, id: data.id }))}>
              <Text style={Styles.drapDownText}>حذف</Text>
            </TouchableOpacity>
          </View>
        }
        <Text style={[Styles.title, colorStyle]}>{data.english}</Text>
      </>
    </TouchableHighlight>
  );
};

export default Card;

const Styles = StyleSheet.create({
  card: {
    marginHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 15,
    marginVertical: 10
  },
  title: {
    textAlign: "center"
  },
  icon: {
    color: "rgb(0,129,255)",
    position: "absolute",
    top: 1,
    left: 4,
    padding: 20,
    zIndex: 2
  },
  drapDown: {
    position: "absolute",
    backgroundColor: "rgb(199,199,199)",
    left: 55,
    top: 28,
    borderRadius: 8,
    zIndex: 3
  },
  drapDownText: {
    color: "black",
    fontSize: 18,
    marginHorizontal: 7,
    marginVertical: 6,
    borderColor: "rgb(75,74,74)",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    textAlign: "center"
  }
});
