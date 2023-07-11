import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
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

import { RootState } from "../../store";
import { addNewCard } from "../../store/cards";
import Card from "../homeScreen/components/card";
import CustomToast from "../../shared/customToast";
import InnerChangeCard from "../../components/innerChangeCard";

const AddNewCard = () => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.cards.list);
  const [listName, setListName] = useState(list[0].name);
  const [newCard, setNewCard] = useState({ persian: "", english: "", id: Date.now() });

  const windowWidth = Dimensions.get("window").width;

  let addNewCardHandler = () => {
    if (newCard.persian || newCard.english && listName) {
      dispatch(addNewCard({ newCard, listName }));
      setNewCard({ english: "", persian: "", id: Date.now() });
      Toast.show({ type: "success", text1: "با موفقیت ثبت شد" });
    }
  };

  return (
    <InnerChangeCard
      btnText="ذخیره"
      list={list}
      newCard={newCard}
      listName={listName}
      setNewCard={setNewCard}
      setListName={setListName}
      sumbitBtn={addNewCardHandler} />);
};

export default AddNewCard;


