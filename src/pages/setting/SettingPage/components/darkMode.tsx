import { useState } from "react";
import {
  Modal,
  StyleSheet,
  ViewStyle,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";

import MoonIcon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowLeftIcon from "react-native-vector-icons/SimpleLineIcons";

import MyText from "../../../../shared/myText";
import { initTheme } from "../../../../store/theme";
import { useTheme } from "../../../../context/themeContext";
import { useAppDispatch, useAppSelector } from "../../../../store";

interface PropsInterface {
  parentStyle: any;
}

const DarkMode = ({ parentStyle }: PropsInterface) => {
  const { currentTheme } = useTheme();
  const Styles = StyleSheet.create({
    card: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      margin: 8,
      marginTop: 0,
      backgroundColor: currentTheme.card,
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
      marginTop: 22
    },
    modalView: {
      backgroundColor: currentTheme.card,
      borderRadius: 10,
      width: 300,
      elevation: 300,
      alignItems: "center"
    }
  });

  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(state => state.theme.mode);

  const [show, setShow] = useState<boolean>(false);
  const [activeBox, setActiveBox] = useState(themeMode);

  const changeModeHandler = async () => {
    await AsyncStorage.setItem("ThemeMode", activeBox);
    dispatch(initTheme(activeBox));
    setShow(false);
  };

  const listCheckBox = [
    { text: "حالت اتوماتیک", value: "auto" },
    { text: "حالت تاریک", value: "dark" },
    { text: "حالت روشن", value: "light" }
  ];
  return (
    <>
      <TouchableHighlight style={Styles.card} onPress={() => setShow(true)}>
        <>
          <MoonIcon name="moon" style={parentStyle.icon} size={25} />
          <MyText>حالت تاریک</MyText>
          <ArrowLeftIcon name="arrow-left" size={20} style={parentStyle.arrowIcon} />
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
              <View style={{ width: "93%", marginVertical: 10 }}>
                {
                  listCheckBox.map(item => (
                    <TouchableOpacity
                      key={item.value}
                      // @ts-ignore
                      onPress={() => setActiveBox(item.value)}
                      style={{
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                        borderRadius: 7,
                        borderColor: `${item.value === activeBox ? "blue" : "rgb(126,118,118)"}`,
                        borderWidth: 1,
                        paddingVertical: 3,
                        paddingHorizontal: 5,
                        marginVertical: 3,
                        alignItems: "center"
                      }}>
                      <>
                        <MyText>{item.text}</MyText>
                        <Text style={{
                          width: 20,
                          height: 20,
                          borderColor: `${item.value === activeBox ? "blue" : "rgb(199,199,199)"}`,
                          backgroundColor: `${item.value === activeBox ? "blue" : "rgba(0,0,0,0)"}`,
                          borderWidth: 1,
                          borderRadius: 50
                        }}></Text>
                      </>
                    </TouchableOpacity>
                  ))
                }
              </View>
              <View style={{ flexDirection: "row", borderTopColor: currentTheme.modalBorder, borderTopWidth: 1 }}>
                <TouchableOpacity onPress={() => setShow(false)}
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
                          onPress={changeModeHandler}>ذخیره</MyText>
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
