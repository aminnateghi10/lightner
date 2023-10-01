import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

import MyText from "./myText";
import { useTheme } from "../context/themeContext";

interface PropsInterface {
  submit: () => void,
  cancel: () => void,
  title: string,
  body: string,
}

const MyModal = ({ submit, cancel, title, body }: PropsInterface) => {
  const { currentTheme } = useTheme();
  const Styles = StyleSheet.create({
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
      height: 130,
      alignItems: "center",
      elevation: 3
    }
  });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}>
      <View style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <View style={{ paddingHorizontal: 8 }}>
            <MyText style={{ marginTop: 8, color: currentTheme.text, textAlign: "center" }}>{title}</MyText>
            <MyText style={{ marginTop: 10, fontSize: 13, color: currentTheme.text, opacity: .6 }}>{body}</MyText>
          </View>
          <View style={{ flexDirection: "row", borderTopColor: currentTheme.modalBorder, borderTopWidth: 1 }}>
            <TouchableOpacity onPress={cancel} style={{ width: "50%", height: 40, justifyContent: "center" }}>
              <MyText style={{ textAlign: "center", color: "#3b7edd" }}>انصراف</MyText>
            </TouchableOpacity>
            <TouchableOpacity style={{
              width: "50%",
              borderLeftColor: currentTheme.modalBorder,
              borderLeftWidth: 1,
              justifyContent: "center"
            }}>
              <MyText style={{ textAlign: "center", color: "#3b7edd" }} onPress={submit}>تایید</MyText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MyModal;
