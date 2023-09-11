import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Dimensions
} from "react-native";

import Card from "../homeScreen/components/card";
import CustomToast from "../../../shared/customToast";
import InnerChangeCard from "../../../components/innerChangeCard";
import { LightnerParamList } from "../../../contracts/rootParamList";
// redux
import { RootState, useAppDispatch } from "../../../store";
import { addNewCard, deleteCard } from "../../../store/cards";

interface PropsInterface {
  navigation: NativeStackNavigationProp<LightnerParamList>,
  route: RouteProp<LightnerParamList, "EditCard">
}

const EditCard = ({ route, navigation }: PropsInterface) => {
  const dispatch = useAppDispatch();
  const { data, listName: listNameItem } = route.params;

  const list = useSelector((state: RootState) => state.cards.list);
  const [listName, setListName] = useState(listNameItem);
  const [newCard, setNewCard] = useState({ persian: data.persian, english: data.english, id: data.id });
  const [side, setSide] = useState<"english" | "persian">("english");
  const windowWidth = Dimensions.get("window").width;

  let addNewCardHandler = () => {
    if (newCard.persian || newCard.english && listName) {
      dispatch(deleteCard({ listName: listNameItem, id: data.id }));
      dispatch(addNewCard({ newCard, listName }));
      Toast.show({ type: "success", text1: "با موفقیت ویرایش شد" });
      navigation.goBack();
    }
  };

  return (
    <InnerChangeCard
      btnText="ویرایش"
      list={list}
      newCard={newCard}
      listName={listName}
      setNewCard={setNewCard}
      setListName={setListName}
      sumbitBtn={addNewCardHandler} />);
};

export default EditCard;
