import { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Modal, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";

import ArrowLeftIcon from "react-native-vector-icons/SimpleLineIcons";
import MyText from "../../../../shared/myText";

const DarkMode = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <TouchableHighlight style={Styles.card} onPress={() => setShow(true)}>
        <>
          <MyText>حالت تاریک</MyText>
          <ArrowLeftIcon name="arrow-left" size={20} />
        </>
      </TouchableHighlight>
      {
        show &&
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}>
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <BouncyCheckbox onPress={(isChecked: boolean) => {}} />
              <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%'}}>
                <TouchableOpacity style={{
                  margin: 5,
                  backgroundColor: "rgb(206,200,200)",
                  padding: 10,
                  borderRadius: 10
                }}>
                  <MyText onPress={() => setShow(false)}>انصراف</MyText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ margin: 5, backgroundColor: "blue", padding: 10, borderRadius: 10 }}>
                  <MyText style={{ color: "white" }} onPress={() => console.log("handle change mode")}>ذخیره</MyText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      }
    </>
  );
};

export default DarkMode;

const Styles = StyleSheet.create({
  card: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    margin: 10,
    backgroundColor: "#f6f6f6",
    padding: 12,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    justifyContent: "space-around",
    alignContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: 300,
    elevation:300,
    height: 180,
    alignItems: "center",
  },
});
