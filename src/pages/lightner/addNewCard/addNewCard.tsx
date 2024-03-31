import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dimensions, ToastAndroid
} from "react-native";

import { RootState } from "../../../store";
import { addNewCard } from "../../../store/cards";
import InnerChangeCard from "../../../components/innerChangeCard";
import { RouteProp } from "@react-navigation/native";
import { LightnerParamList } from "../../../contracts/rootParamList";

interface PropsInterface {
  route: RouteProp<LightnerParamList, "AddNewCard">;
}

const AddNewCard = ({ route }: PropsInterface) => {
  const dispatch = useDispatch();
  const initialState = route.params;
  const list = useSelector((state: RootState) => state.cards.list);
  const [listName, setListName] = useState(list[0]?.name);
  const [newCard, setNewCard] = useState(initialState?.data ?? { persian: "", english: "", id: Date.now() });

  const windowWidth = Dimensions.get("window").width;

  let addNewCardHandler = () => {
    if (newCard.persian && newCard.english) {
      if (listName) {
        dispatch(addNewCard({ newCard, listName }));
        setNewCard({ english: "", persian: "", id: Date.now() });
      }else {
        ToastAndroid.show("یک دسته انتخاب کنید", ToastAndroid.SHORT);
      }
    }else {
      ToastAndroid.show("پشت و روی کارت نمیتواند خالی باشد", ToastAndroid.SHORT);
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


