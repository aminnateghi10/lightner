import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

import MyText from "../../../../shared/myText";
import { deleteCard } from "../../../../store/cards";
import { useTheme } from "../../../../context/themeContext";
import { LightnerParamList } from "../../../../contracts/rootParamList";

interface PropsInterface {
  data: any,
  navigation: NativeStackNavigationProp<LightnerParamList>,
  listName: string
}

const Card = ({ data, navigation, listName, index, setDropDown, dropDown }: PropsInterface) => {
  const { currentTheme } = useTheme();

  const Styles = StyleSheet.create({
    card: {
      marginHorizontal: 8,
      paddingVertical: 8,
      borderRadius: 3,
      paddingHorizontal: 4,
      marginVertical: 4,
      backgroundColor: currentTheme.card,
      elevation: 3
    },
    icon: {
      color: currentTheme.text,
    },
    dropDown: {
      position: "absolute",
      top: 20,
      left: 60,
      marginTop: 10,
      backgroundColor: "#EAEAEA",
      zIndex: 999
    },
    dropDownText: {
      color: "black",
      fontSize: 18,
      marginHorizontal: 7,
      marginVertical: 6,
      borderColor: "rgb(75,74,74)",
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      textAlign: "center"
    }
  });

  const dispatch = useDispatch();

  const toggleDropDown = () => {
    if (data.id === dropDown) setDropDown(null);
    else setDropDown(data.id);
  };

  return (
    <View style={{ position: "relative", zIndex: -index }}>
      <TouchableHighlight
        style={Styles.card}
        onPress={() => navigation.navigate("ShowCard", { data: data, listName })}>
        <>
          <MyText style={{ opacity: .5, fontSize: 11 }}>{`جعبه ${data.level}`}</MyText>
          <MyText style={{ textAlign: "left" }}>{data.english}</MyText>
          <MyText style={{ opacity: .5 }}>{data.persian}</MyText>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Icon name="ellipsis-vertical" size={25} onPress={toggleDropDown}
                  style={Styles.icon} />
            <MyText style={{ fontSize: 11, color: currentTheme.button }}>{`جعبه ${data.level}`}</MyText>
          </View>
        </>
      </TouchableHighlight>
      {
        data.id === dropDown &&
        <View style={Styles.dropDown}>
          <TouchableOpacity onPress={() => navigation.navigate("EditCard", { data, listName })}>
            <Text style={Styles.dropDownText}>ویرایش</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(deleteCard({ listName, id: data.id }))}>
            <Text style={Styles.dropDownText}>حذف</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );

};

export default Card;


