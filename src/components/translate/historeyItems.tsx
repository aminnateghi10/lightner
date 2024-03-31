import { RouteProp } from "@react-navigation/native";
import Clipboard from "@react-native-clipboard/clipboard";
import { SwipeListView } from "react-native-swipe-list-view";
import DeleteIcon from "react-native-vector-icons/AntDesign";
import CopyOutlineIcon from "react-native-vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  StyleProp,
  StyleSheetProperties,
  ViewStyle
} from "react-native";

import MyText from "../../shared/myText";
import { useTheme } from "../../context/themeContext";
import { LightnerParamList } from "../../contracts/rootParamList";

type SetHistoryType = (newHistory: HistoryItemType[]) => void;

type HistoryItemType = {
  text: string,
  sentences: string,
  id: number
}


interface PropsInterface {
  navigation: NativeStackNavigationProp<LightnerParamList>,
  style: StyleProp<ViewStyle>,
  history: HistoryItemType[],
  setHistory: SetHistoryType,
  historyToTranslator: (item:HistoryItemType) => void,
  syncHistory:()=>void
}

const historeyItems = ({ history, setHistory, style, navigation, historyToTranslator,syncHistory }: PropsInterface) => {
  const { currentTheme } = useTheme();

  const copyToClipboard = (text: string) => {
    ToastAndroid.show("متن کپی شد", ToastAndroid.SHORT);
    Clipboard.setString(text);
  };

  const styles = StyleSheet.create({
    rowFront: {
      backgroundColor: "#FFF",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      justifyContent: "center",
      height: 50
    },
    rowBack: {
      alignItems: "center",
      backgroundColor: "#DDD",
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      marginHorizontal: 11,
      marginBottom: 4,
      borderRadius: 4,
      overflow: "hidden"
    },
    backRightBtn: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      width: 48
    },
    backRightBtnRight: {
      backgroundColor: "red",
      right: 0
    },
    backRightCopyBtn: {
      backgroundColor: "blue",
      right: 48
    },
    backTextWhite: {
      color: "#FFF"
    },
    historyCard: {
      backgroundColor: currentTheme.card,
      marginBottom: 4,
      padding: 6,
      paddingBottom:7,
      marginHorizontal: 10,
      borderRadius: 4
    }
  });


  const deleteItem = (id: number) => {
    // Filter out the item with the specified key
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    syncHistory(updatedHistory);
  };

  const renderItem = (rowData) => {
    let { item } = rowData;
    return (
      <TouchableOpacity activeOpacity={1} key={rowData} style={styles.historyCard}
                        onPress={() => historyToTranslator(item)}>
        <>
          <MyText>{item?.text}</MyText>
          <MyText>{item?.sentences}</MyText>
        </>
      </TouchableOpacity>
    );
  };

  const renderHiddenItem = (rowData) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => deleteItem(rowData.item.id)}
        >
          <DeleteIcon name="delete" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightCopyBtn]}
          onPress={() => copyToClipboard(rowData.item.sentences)}
        >
          <CopyOutlineIcon
            size={23}
            color="white"
            name="copy-outline" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SwipeListView
      style={style}
      data={history}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={0}
      rightOpenValue={-100}
    />
  );
};


export default historeyItems;
