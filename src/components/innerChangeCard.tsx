import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomToast from "../shared/customToast";
import { CardsInterface, listCardsInterface } from "../contracts/list";
import MyText from "../shared/myText";
import MyTextInput from "../shared/myTextInput";

interface PropsInterface {
  listName: string,
  setListName: Dispatch<SetStateAction<string>>,
  list: listCardsInterface[],
  setNewCard: Dispatch<SetStateAction<{ persian: string; english: string; id: number; }>>,
  newCard: CardsInterface,
  sumbitBtn: () => void,
  btnText: string,
}

const InnerChangeCard = ({ setNewCard, newCard, sumbitBtn, listName, setListName, list, btnText }: PropsInterface) => {
  const [side, setSide] = useState<"english" | "persian">("english");
  return (
    <View style={styles.contener}>
      <MyText style={styles.title}>دسته بندی</MyText>
      <View style={styles.pickerContener}>
        <Picker
          mode="dropdown"
          selectedValue={listName}
          itemStyle={{color:'red'}}
          onValueChange={(itemValue) => setListName(itemValue)}>
          {list.map(item => <Picker.Item key={item.id} fontFamily="Vazir-Medium-FD-WOL" label={item.name} value={item.name} />)}
        </Picker>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => setSide("persian")}
          style={[styles.tabTitleCard, { borderBottomColor: side === "persian" ? "rgba(0,124,255,0.44)" : "rgb(129,127,127)" }]}>
          <MyText style={styles.tabTitle}>پشت کارت</MyText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSide("english")}
          style={[styles.tabTitleCard, { borderBottomColor: side === "english" ? "rgba(0,124,255,0.44)" : "rgb(129,127,127)" }]}>
          <MyText style={styles.tabTitle}>روی کارت</MyText>
        </TouchableOpacity>
      </View>
      {
        side === "english" ?
          <View>
            <MyTextInput
              value={newCard.english}
              onChangeText={(e) => setNewCard({ ...newCard, english: e })}
              style={styles.input}
              multiline={true}
              numberOfLines={5}
              placeholder="لطفا متن انگلیسی خود را اینجا وارد کنید" />
          </View>
          :
          <View>
            <MyTextInput
              value={newCard.persian}
              onChangeText={(e) => setNewCard({ ...newCard, persian: e })}
              style={styles.input}
              multiline={true}
              numberOfLines={5}
              placeholder="لطفا متن فارسی خود را اینجا وارد کنید" />
          </View>
      }
      <TouchableOpacity style={styles.submit} onPress={sumbitBtn}>
        <Text style={styles.submitText}>{btnText}</Text>
      </TouchableOpacity>
      <CustomToast />
    </View>
  );
};

export default InnerChangeCard;

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
