import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Toast from "react-native-toast-message";
import {
    Dimensions
} from "react-native";

import {RootState} from "../../../store";
import {addNewCard} from "../../../store/cards";
import InnerChangeCard from "../../../components/innerChangeCard";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../../contracts/rootParamList";

interface PropsInterface {
    route: RouteProp<RootStackParamList, "AddNewCard">
}

const AddNewCard = ({route}: PropsInterface) => {
    const dispatch = useDispatch();
    const initialState = route.params;
    const list = useSelector((state: RootState) => state.cards.list);
    const [listName, setListName] = useState(list[0].name);
    const [newCard, setNewCard] = useState(initialState?.data ?? {persian: "", english: "", id: Date.now()});

    const windowWidth = Dimensions.get("window").width;

    let addNewCardHandler = () => {
        if (newCard.persian || newCard.english && listName) {
            dispatch(addNewCard({newCard, listName}));
            setNewCard({english: "", persian: "", id: Date.now()});
            Toast.show({type: "success", text1: "با موفقیت ثبت شد"});
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
            sumbitBtn={addNewCardHandler}/>);
};

export default AddNewCard;


