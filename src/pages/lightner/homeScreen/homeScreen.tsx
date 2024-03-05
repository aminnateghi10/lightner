// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Icon from "react-native-vector-icons/AntDesign";
// import AddFolderIcon from "react-native-vector-icons/AntDesign";
// import PostAddIcon from "react-native-vector-icons/MaterialIcons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import {
//   Alert,
//   Modal, SafeAreaView, ScrollView,
//   StyleSheet,
//   TextInput,
//   TouchableHighlight,
//   TouchableOpacity, TouchableWithoutFeedback,
//   useColorScheme,
//   View
// } from "react-native";
// // redux
// import { RootState } from "../../../store";
// import { addNewList, initCardsData } from "../../../store/cards";
//
// import Card from "./components/card";
// import MyText from "../../../shared/myText";
// import BrowseBar from "./components/browseBar";
// import { Colors } from "../../../constants/colors";
// import MyTextInput from "../../../shared/myTextInput";
// import { useTheme } from "../../../context/themeContext";
// import { LightnerParamList } from "../../../contracts/rootParamList";
//
// interface PropsInterface {
//   navigation: NativeStackNavigationProp<LightnerParamList>,
// }
//
// const HomeScreen = ({ navigation }: PropsInterface) => {
//   const { currentTheme } = useTheme();
//   const dispatch = useDispatch();
//
//   const Styles = StyleSheet.create({
//     container: {
//       flex: 1
//     },
//     addNewList: {
//       position: "absolute",
//       bottom: 20,
//       right: 20,
//       padding: 15,
//       borderRadius: 50,
//       backgroundColor: Colors.button
//     },
//     addNewListInput: {
//       borderColor: currentTheme.border,
//       borderWidth: 1,
//       width: "90%",
//       borderRadius: 2,
//       height: 38
//     },
//     centeredView: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       marginTop: 22
//     },
//     modalView: {
//       justifyContent: "space-between",
//       alignContent: "center",
//       backgroundColor: currentTheme.modalCard,
//       borderRadius: 10,
//       width: 300,
//       height: 160,
//       alignItems: "center",
//       elevation: 3
//     },
//     dropDown: {
//       position: "absolute",
//       backgroundColor: currentTheme.modalCard,
//       right: 20,
//       bottom: 15,
//       padding: 7,
//       borderRadius: 5,
//       shadowColor: "#000000",
//       shadowOpacity: 2,
//       shadowRadius: 8,
//       elevation: 8,
//       borderWidth: 1,
//       borderColor: currentTheme.border
//     },
//     dropDownText: {
//       fontSize: 17,
//       marginRight: 9
//     },
//     dropDownButton: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "flex-end",
//       paddingHorizontal: 5,
//       marginVertical: 1
//     }
//   });
//
//   const [name, setName] = useState("");
//   const [addNew, setAddNew] = useState<boolean | "newList" | "newCard">(false);
//
//   const isDarkMode = useColorScheme() === "dark";
//   const cards = useSelector((state: RootState) => state.cards);
//   const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };
//
//   useEffect(() => {
//     const getData = async () => {
//       const value = await AsyncStorage.getItem("my-data");
//       dispatch(initCardsData(JSON.parse(value ?? "")));
//     };
//     getData();
//   }, []);
//   useEffect(() => {
//     const save = async () => {
//       await AsyncStorage.setItem("my-data", JSON.stringify(cards));
//     };
//     save();
//   }, [cards]);
//
//   useEffect(() => {
//     const unsubscribe = navigation.addListener("focus", () => {
//         setAddNew(false);
//     });
//
//     return unsubscribe;
//   }, [navigation]);
//
//   let addNewListHandler = () => {
//     if (name) {
//       dispatch(addNewList(name));
//       setAddNew(false);
//       setName("");
//     }
//   };
//
//   const addNewCardHandler = () => {
//     if (cards.list.length) navigation.navigate("AddNewCard");
//     else {
//       Alert.alert(
//         "لیستی پیدا نشد!",
//         "لطفا یک لیست اضافه کنید و سپس کارت اضافه کنید.",
//         [{ text: "باشه" }],
//         { cancelable: false }
//       );
//     }
//   };
//
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <BrowseBar navigation={navigation} />
//       <TouchableWithoutFeedback onPress={() => {setAddNew(false)}}>
//         <View style={[backgroundStyle, Styles.container]}>
//           <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", paddingBottom: 80 }}>
//             {
//               cards.list.map((item) => (
//                 <Card navigation={navigation} data={item}/>
//               ))
//             }
//           </ScrollView>
//           <TouchableHighlight style={Styles.addNewList} onPress={() => setAddNew(!addNew)}>
//             <Icon name="plus" size={27} color="white" />
//           </TouchableHighlight>
//           {
//             addNew === true &&
//             <View style={Styles.dropDown}>
//               <TouchableOpacity onPress={() => setAddNew("newList")} style={Styles.dropDownButton}>
//                 <>
//                   <MyText style={Styles.dropDownText}>افزودن لیست</MyText>
//                   <AddFolderIcon name="addfolder" size={20} />
//                 </>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={addNewCardHandler} style={Styles.dropDownButton}>
//                 <>
//                   <MyText style={Styles.dropDownText}>افزودن کارت</MyText>
//                   <PostAddIcon name="post-add" size={23} />
//                 </>
//               </TouchableOpacity>
//             </View>
//           }
//           {
//             addNew === "newList" &&
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={addNew && true}>
//               <View style={Styles.centeredView}>
//                 <View style={Styles.modalView}>
//                   <MyText style={{ marginTop: 10, color: currentTheme.text }}>نام لیست را وارد کنید:</MyText>
//                   <MyTextInput style={Styles.addNewListInput} onChangeText={(e) => setName(e)} placeholder="لیست جدید" />
//                   <View style={{ flexDirection: "row", borderTopColor: currentTheme.modalBorder, borderTopWidth: 1 }}>
//                     <TouchableOpacity onPress={() => setAddNew(false)}
//                                       style={{ width: "50%", height: 40, justifyContent: "center" }}>
//                       <MyText
//                         style={{ textAlign: "center", color: "#3b7edd" }}>انصراف</MyText>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={{
//                       width: "50%",
//                       borderLeftColor: currentTheme.modalBorder,
//                       borderLeftWidth: 1,
//                       justifyContent: "center"
//                     }}>
//                       <MyText style={{ textAlign: "center", color: "#3b7edd" }}
//                               onPress={addNewListHandler}>ذخیره</MyText>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </Modal>
//           }
//         </View>
//       </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// };
// export default HomeScreen;



import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Voice from '@react-native-voice/voice';

const SpeechToTextApp = () => {
  const [recognizedText, setRecognizedText] = useState('');


  useEffect(() => {
    // Set up event listener for speech recognition results
    Voice.onSpeechResults = (e) => {
      console.log(e.value,'vvvvvvv');
      setRecognizedText(e.value[0]);
    };

    // Clean up event listener when component unmounts
    return () => {
      console.log(
        'asdfasdf'
      );
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecognition = async () => {
    try {
      await Voice.start('en-US');
      console.log('start');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{recognizedText}</Text>
      <Button title="Start Recording" onPress={startRecognition} />
    </View>
  );
};

export default SpeechToTextApp;
