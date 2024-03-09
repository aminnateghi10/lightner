import { Dispatch, SetStateAction, useState } from "react";
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CardsInterface, listCardsInterface } from "../contracts/list";
import MyText from "../shared/myText";
import MyTextInput from "../shared/myTextInput";
import { Colors } from "../constants/colors";
import PlusIcon from "react-native-vector-icons/AntDesign";
import { useTheme } from "../context/themeContext";

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
  const { currentTheme } = useTheme();
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
      borderColor: Colors.border,
      flexGrow: 1
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
      fontSize: 18
    },
    input: {
      borderColor: Colors.border,
      borderWidth: 1,
      borderRadius: 10,
      height: 100,
      textAlignVertical: "top",
      margin: 12,
      padding: 5,
      marginTop: 10
    },
    submit: {
      backgroundColor: Colors.button,
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
    },
    addNewListInput: {
      borderColor: currentTheme.border,
      borderWidth: 1,
      width: "90%",
      borderRadius: 2,
      height: 38
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
      height: 160,
      alignItems: "center",
      elevation: 3
    },
    dropDown: {
      position: "absolute",
      backgroundColor: currentTheme.modalCard,
      right: 20,
      bottom: 15,
      padding: 7,
      borderRadius: 5,
      shadowColor: "#000000",
      shadowOpacity: 2,
      shadowRadius: 8,
      elevation: 8,
      borderWidth: 1,
      borderColor: currentTheme.border
    },
    dropDownText: {
      fontSize: 17,
      marginRight: 9
    },
    dropDownButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingHorizontal: 5,
      marginVertical: 1
    },
    addNewList: {
      position: "absolute",
      bottom: 20,
      right: 20,
      padding: 15,
      borderRadius: 50,
      backgroundColor: Colors.button
    }
  });

  let addNewListHandler = () => {
    // if (name) {
    //   dispatch(addNewList(name));
    //   setAddNew(false);
    //   setName("");
    // }
  };

  const [side, setSide] = useState<"english" | "persian">("english");
  const [AddNew, setAddNew] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  return (
    <SafeAreaView>
      <View style={styles.contener}>

        <MyText style={styles.title}>دسته بندی</MyText>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.pickerContener}>
            <Picker
              mode="dropdown"
              style={{ flexGrow: 1 }}
              selectedValue={listName}
              itemStyle={{ color: "red" }}
              onValueChange={(itemValue) => setListName(itemValue)}>
              {list.map(item => <Picker.Item key={item.id} label={item.name} value={item.name} />)}
            </Picker>
          </View>
          <PlusIcon name="plus" style={{
            width: 50,
            backgroundColor: currentTheme.button,
            marginLeft: 5,
            padding: 10,
            borderRadius: 4
          }}
                    onPress={() => setAddNew(true)} size={30} />
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
      </View>
      {
        AddNew &&
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <MyText style={{ marginTop: 10, color: currentTheme.text }}>نام لیست را وارد کنید:</MyText>
              <MyTextInput style={styles.addNewListInput} onChangeText={(e) => setName(e)} placeholder="لیست جدید" />
              <View style={{ flexDirection: "row", borderTopColor: currentTheme.modalBorder, borderTopWidth: 1 }}>
                <TouchableOpacity onPress={() => setAddNew(false)}
                                  style={{ width: "50%", height: 40, justifyContent: "center" }}>
                  <MyText
                    style={{ textAlign: "center", color: "#3b7edd" }}>انصراف</MyText>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  width: "50%",
                  borderLeftColor: currentTheme.modalBorder,
                  borderLeftWidth: 1,
                  justifyContent: "center"
                }}>
                  <MyText style={{ textAlign: "center", color: "#3b7edd" }}
                          onPress={addNewListHandler}>ذخیره</MyText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      }
    </SafeAreaView>
  );
};

export default InnerChangeCard;
