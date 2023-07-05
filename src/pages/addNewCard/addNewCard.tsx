import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, TouchableHighlight } from "react-native";

import { RootState } from "../../store";
import Card from "../homeScreen/components/card";
import { addNewCard } from "../../store/cards";

const AddNewCard = () => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.cards.list);
  const [listName, setListName] = useState(list[0].name);
  const [newCard, setNewCard] = useState({ persian: "", english: "" });
  const [side, setSide] = useState<"english" | "persian">("english");


  let addNewCardHandler = () => {
    if (newCard.persian || newCard.english && listName) {
      dispatch(addNewCard({ newCard, listName }));
    }
  };

  return (
    <View style={styles.contener}>
      <Text style={styles.title}>دسته بندی</Text>
      <View style={styles.pickerContener}>
        <Picker
          mode="dropdown"
          selectedValue={listName}
          onValueChange={(itemValue) => setListName(itemValue)}>
          {list.map(item => <Picker.Item key={item.id} label={item.name} value={item.name} />)}
        </Picker>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => setSide("persian")}
          style={[styles.tabTitleCard, { borderBottomColor: side === "persian" ? "rgba(0,124,255,0.44)" : "rgb(129,127,127)" }]}>
          <Text style={styles.tabTitle}>پشت کارت</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSide("english")}
          style={[styles.tabTitleCard, { borderBottomColor: side === "english" ? "rgba(0,124,255,0.44)" : "rgb(129,127,127)" }]}>
          <Text style={styles.tabTitle}>روی کارت</Text>
        </TouchableOpacity>
      </View>
      {
        side === "english" ?
          <View>
            <TextInput
              value={newCard.english}
              onChangeText={(e) => setNewCard({ ...newCard, english: e })}
              style={styles.input}
              multiline={true}
              numberOfLines={5}
              placeholder="لطفا متن انگلیسی خود را اینجا وارد کنید" />
          </View>
          :
          <View>
            <TextInput
              value={newCard.persian}
              onChangeText={(e) => setNewCard({ ...newCard, persian: e })}
              style={styles.input}
              multiline={true}
              numberOfLines={5}
              placeholder="لطفا متن فارسی خود را اینجا وارد کنید" />
          </View>
      }
      <TouchableOpacity style={styles.submit} onPress={addNewCardHandler}>
        <Text style={styles.submitText}>ذخیره</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNewCard;

const styles = StyleSheet.create({
  contener: {
    marginHorizontal: 10,
    height: "100%"
  },
  title: {
    marginTop: 30,
    marginBottom: 10
  },
  pickerContener: {
    borderWidth: 1,
    borderColor: "black"
  },
  tabTitleCard: {
    marginTop: 10,
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 2,
    paddingBottom: 5
  },
  tabTitle: {
    fontSize: 18,
    color: "rgb(0,0,0)"
  },
  input: {
    borderColor: "rgb(0,0,0)",
    borderWidth: 1,
    borderRadius: 10,
    height: 100,
    textAlignVertical: "top",
    margin: 12,
    padding: 5,
    marginTop: 10
  },
  submit: {
    backgroundColor: "rgba(0,45,227,0.84)",
    position: "absolute",
    height: 60,
    width: "100%",
    bottom: 15,
    borderRadius: 20,
    justifyContent: "center"
  },
  submitText: {
    textAlign: "center",
    color: "rgb(255,255,255)",
    fontSize: 20
  }
});
