import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, StyleSheet, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
// icons
import Icon from "react-native-vector-icons/AntDesign";
import Delete from "react-native-vector-icons/AntDesign";
import ReaderOutline from "react-native-vector-icons/Ionicons";
import EllipsisVertical from "react-native-vector-icons/Ionicons";
import FolderRemoveOutline from "react-native-vector-icons/MaterialCommunityIcons";
import FolderEditOutline from "react-native-vector-icons/MaterialCommunityIcons";
import CardsOutlineIcon from "react-native-vector-icons/MaterialCommunityIcons";

import MyText from "../../../../shared/myText";
import { deleteList, editListName, removeAllCards } from "../../../../store/cards";
import { useTheme } from "../../../../context/themeContext";
import MyModal from "../../../../shared/myModal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LightnerParamList } from "../../../../contracts/rootParamList";

interface PropsInterface {
  cards?: [];
  listName: string;
  navigation: NativeStackNavigationProp<LightnerParamList>,
}

const Controller = ({ cards, listName, navigation }: PropsInterface) => {
  const { currentTheme } = useTheme();
  const Styles = StyleSheet.create({
    container: {
      backgroundColor: currentTheme.button,
      width: "100%",
      height: 50,
      flexDirection: "row-reverse",
      justifyContent: "space-around",
      alignItems: "center"
    },
    textColor: {
      color: "white"
    },
    dropDown: {
      position: "absolute",
      bottom: 55,
      left: 30,
      marginTop: 10,
      flex: 1,
      backgroundColor: currentTheme.background,
      elevation: 10
    },
    dropDownBtn: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: 5
    },
    dropDownIcon: {
      color: currentTheme.text
    },
    dropDownText: {
      color: currentTheme.text,
      marginLeft: 10
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
    addNewListInput: {
      borderColor: currentTheme.border,
      borderWidth: 1,
      width: "90%",
      borderRadius: 2,
      height: 38
    }
  });

  const dispatch = useDispatch();

  const [dropdown, setDropdown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [removeAllCardsModal, setRemoveAllCardsModal] = useState(false);
  const [name, setName] = useState(listName);

  const browseList = cards?.filter(element => element.browsing_time <= Date.now());

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
    setDropdown(false);
  };

  const deleteListHandler = () => {
    dispatch(deleteList(listName));
    navigation.navigate("Home");
  };
  const removeAllCardsModalHandler = () => {
    dispatch(removeAllCards(listName));
    setRemoveAllCardsModal(false);
  };

  const editListNameHandler = () => {
    dispatch(editListName({ oldName: listName, newName: name }));
    navigation.navigate("Lightner");
    ToastAndroid.show("تغییر اسم لیست انجام شد.", ToastAndroid.SHORT);
  };

  const reviewHandler = () => {
    if (browseList?.length) {
      const singleBrowseList: any = {
        cards: browseList,
        name: "مرور"
      };
      navigation.navigate("Review", { data: singleBrowseList });
    } else {
      ToastAndroid.show("کارتی برای مرور وجود ندارد.", ToastAndroid.SHORT);
    }
  };

  const practiceHandler = () => {
    if (cards?.length) {
      const singleBrowseList: any = {
        cards: cards,
        name: "تمرین"
      };
      navigation.navigate("Review", { data: singleBrowseList });
    } else {
      ToastAndroid.show("کارتی برای تمرین وجود ندارد.", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={Styles.container}>
      <EllipsisVertical
        size={27}
        onPress={() => setDropdown(!dropdown)}
        style={{ flexGrow: 1, paddingHorizontal: 10, paddingVertical: 10, color: "white" }}
        name="md-ellipsis-vertical-sharp" />
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flexGrow: 8 }} onPress={practiceHandler}>
        <>
          <MyText style={Styles.textColor}>تمرین</MyText>
          <ReaderOutline name="reader-outline" style={[{ marginLeft: 5 }, Styles.textColor]} size={25} />
        </>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flexGrow: 8 }}
                        onPress={reviewHandler}>
        <>
          <MyText style={Styles.textColor}>آماده مرور</MyText>
          <MyText style={Styles.textColor}>{browseList?.length} کارت</MyText>
          <CardsOutlineIcon name="cards-outline" style={[{ marginLeft: 5 }, Styles.textColor]} size={25} />
        </>
      </TouchableOpacity>

      {/* dropDown */}
      {
        dropdown &&
        <View style={Styles.dropDown}>
          <TouchableOpacity style={Styles.dropDownBtn} onPress={() => {setEditModal(true);setDropdown(false)}}>
            <>
              <FolderEditOutline style={Styles.dropDownIcon} size={25} name="folder-edit-outline" />
              <MyText style={Styles.dropDownText}>ویرایش نام دسته</MyText>
            </>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.dropDownBtn} onPress={toggleDeleteModal}>
            <>
              <FolderRemoveOutline style={Styles.dropDownIcon} size={25} name="folder-remove-outline" />
              <MyText style={Styles.dropDownText}>حذف دسته</MyText>
            </>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.dropDownBtn} onPress={() => {
            setRemoveAllCardsModal(true);
            setDropdown(false);
          }}>
            <>
              <Delete style={Styles.dropDownIcon} name="delete" size={20} />
              <MyText style={Styles.dropDownText}>حذف همه کارت ها</MyText>
            </>
          </TouchableOpacity>
        </View>
      }
      {/* end dropDown */}

      {/* delete Modal */}
      {
        deleteModal &&
        <MyModal
          submit={deleteListHandler}
          cancel={toggleDeleteModal} title="حذف دسته کارت" body="این دسته بندی به همراه کارت های داخل آن حذف شود؟" />
      }
      {/* end delete Modal */}

      {/* Remove all cards  Modal */}
      {
        removeAllCardsModal &&
        <MyModal
          submit={removeAllCardsModalHandler}
          cancel={() => setRemoveAllCardsModal(false)} title="حذف همه کارت ها" body="همه کارت های داخل جعبه حذف شود؟" />
      }
      {/* end Remove all cards Modal */}

      {/*  edit Modal*/}
      {
        editModal &&
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}>
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <MyText style={{ marginTop: 10, color: currentTheme.text }}>نام لیست را وارد کنید:</MyText>
              <TextInput style={Styles.addNewListInput} value={name} onChangeText={(e) => setName(e)} placeholder="" />
              <View style={{ flexDirection: "row", borderTopColor: currentTheme.modalBorder, borderTopWidth: 1 }}>
                <TouchableOpacity onPress={() => setEditModal(false)}
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
                          onPress={editListNameHandler}>ذخیره</MyText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      }
      {/*  end edit Modal*/}

    </View>
  );
};

export default Controller;
