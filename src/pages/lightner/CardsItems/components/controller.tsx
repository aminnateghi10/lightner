import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
// icons
import Icon from "react-native-vector-icons/AntDesign";
import Delete from "react-native-vector-icons/AntDesign";
import ReaderOutline from "react-native-vector-icons/Ionicons";
import EllipsisVertical from "react-native-vector-icons/Ionicons";
import FolderRemoveOutline from "react-native-vector-icons/MaterialCommunityIcons";
import FolderEditOutline from "react-native-vector-icons/MaterialCommunityIcons";
import CardsOutlineIcon from "react-native-vector-icons/MaterialCommunityIcons";

import MyText from "../../../../shared/myText";
import { deleteList } from "../../../../store/cards";
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
    }
  });

  const dispatch = useDispatch();

  const [dropdown, setDropdown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const browseList = cards.filter(element => element.browsing_time <= Date.now());

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
    setDropdown(false);
  };
  const deleteListHandler = () => {
    dispatch(deleteList(listName));
    navigation.navigate("Home");
  };

  return (
    <View style={Styles.container}>
      <EllipsisVertical
        size={27}
        onPress={() => setDropdown(!dropdown)}
        style={{ flexGrow: 1, paddingHorizontal: 10, paddingVertical: 10, color: "white" }}
        name="md-ellipsis-vertical-sharp" />
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flexGrow: 8 }}>
        <>
          <MyText style={Styles.textColor}>تمرین</MyText>
          <ReaderOutline name="reader-outline" style={[{ marginLeft: 5 }, Styles.textColor]} size={25} />
        </>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flexGrow: 8 }}>
        <>
          <MyText style={Styles.textColor}>آماده مرور</MyText>
          <MyText style={Styles.textColor}>{browseList.length} کارت</MyText>
          <CardsOutlineIcon name="cards-outline" style={[{ marginLeft: 5 }, Styles.textColor]} size={25} />
        </>
      </TouchableOpacity>

      {/* dropDown */}
      {
        dropdown &&
        <View style={Styles.dropDown}>
          <TouchableOpacity style={Styles.dropDownBtn} onPress={() => console.log("edig")}>
            <>
              <FolderEditOutline style={Styles.dropDownIcon} size={25} name="folder-edit-outline" />
              <MyText style={Styles.dropDownText}>ویرایش نام دسته</MyText>
            </>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.dropDownBtn} onPress={toggleDeleteModal}>
            {/*<TouchableOpacity style={Styles.dropDownBtn} onPress={() => dispatch(deleteList(listName))}>*/}
            <>
              <FolderRemoveOutline style={Styles.dropDownIcon} size={25} name="folder-remove-outline" />
              <MyText style={Styles.dropDownText}>حذف دسته</MyText>
            </>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.dropDownBtn} onPress={() => dispatch(deleteList(listName))}>
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

    </View>
  );
};

export default Controller;
