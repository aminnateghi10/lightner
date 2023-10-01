import Icon from "react-native-vector-icons/AntDesign";
import ReaderOutline from "react-native-vector-icons/Ionicons";
import EllipsisVertical from "react-native-vector-icons/Ionicons";
import FolderRemoveOutline from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FolderEditOutline from "react-native-vector-icons/MaterialCommunityIcons";
import CardsOutlineIcon from "react-native-vector-icons/MaterialCommunityIcons";

import MyText from "../../../../shared/myText";
import { useTheme } from "../../../../context/themeContext";
import { deleteList } from "../../../../store/cards";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Delete from "react-native-vector-icons/AntDesign";


interface PropsInterface {
  cards?: [];
  listName: string;
}

const Controller = ({ cards, listName }: PropsInterface) => {
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
      bottom: 50,
      left: 60,
      marginTop: 10,
      flex:1,
      backgroundColor: "#EAEAEA",
      zIndex: 999
    },
    dropDownText: {
      color: "black",
      borderRadius: 10,
      textAlign: "center"
    }
  });

  const dispatch = useDispatch();

  const [dropdown, setDropdown] = useState(false);
  const browseList = cards.filter(element => element.browsing_time <= Date.now());

  return (
    <View style={Styles.container}>
      <EllipsisVertical
        size={27}
        onPress={()=>setDropdown(true)}
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

      {/* modal */}
      {
        dropdown &&
        <View style={Styles.dropDown}>
          <TouchableOpacity onPress={() => console.log("edig")}>
            <MyText style={Styles.dropDownText}>
              ویرایش نام دسته
              <FolderEditOutline size={25} name="folder-edit-outline" />
            </MyText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(deleteList(listName))}>
            <MyText style={Styles.dropDownText}>
              حذف دسته
              <FolderRemoveOutline size={25} name="folder-remove-outline" />
            </MyText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(deleteList(listName))}>
            <MyText style={Styles.dropDownText}>
              حذف همه کارت ها
              <Delete name="delete" size={20}  />
            </MyText>

          </TouchableOpacity>
        </View>
      }
      {/* end modal */}
    </View>
  );
};

export default Controller;
