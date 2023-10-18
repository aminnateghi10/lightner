import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import ChartLineIcon from "react-native-vector-icons/FontAwesome5";
import MoveIcon from "react-native-vector-icons/Ionicons";
import EditIcon from "react-native-vector-icons/MaterialIcons";
import DeleteIcon from "react-native-vector-icons/MaterialIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

import MyText from "../../../../shared/myText";
import { deleteCard } from "../../../../store/cards";
import { useTheme } from "../../../../context/themeContext";
import { LightnerParamList } from "../../../../contracts/rootParamList";
import { useEffect, useRef } from "react";

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
      color: currentTheme.text
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft:5,
    },
    dropDown: {
      position: "absolute",
      top: "auto",
      left: 60,
      marginTop: 10,
      backgroundColor: currentTheme.card,
      elevation: 6,
      borderRadius: 4
    },
    dropDownText: {
      color: "black",
      fontSize: 14,
      marginVertical: 4,
      padding: 10,
      borderRadius: 10,
    }
  });

  const dispatch = useDispatch();

  const toggleDropDown = () => {
    if (data.id === dropDown) setDropDown(null);
    else setDropDown(data.id);
  };

  const myComponentRef = useRef(null);

  useEffect(() => {
    if (myComponentRef.current) {
      console.log('myComponentRef');
      myComponentRef.current.measure((fx, fy, width, height, px, py) => {
        // Do positioning checks here using the measured values
        console.log('Component dimensions and position:');
        console.log('x:', fx);
        console.log('y:', fy);
        console.log('width:', width);
        console.log('height:', height);
        console.log('pageX:', px);
        console.log('pageY:', py);
      });
    }
  }, []);

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
          <TouchableOpacity style={Styles.item} onPress={() => navigation.navigate("EditCard", { data, listName })}  ref={myComponentRef}>
            <>
              <ChartLineIcon name="chart-line" size={25} style={Styles.icon} />
              <Text style={Styles.dropDownText}>پیشرفت</Text>
            </>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.item} onPress={() => navigation.navigate("EditCard", { data, listName })}>
            <>
              <MoveIcon name="move" size={25} style={Styles.icon} />
              <Text style={Styles.dropDownText}>انتقال به دسته دیگر</Text>
            </>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.item} onPress={() => navigation.navigate("EditCard", { data, listName })}>
            <EditIcon name="edit" size={25} style={Styles.icon} />
            <Text style={Styles.dropDownText}>ویرایش کارت</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.item} onPress={() => dispatch(deleteCard({ listName, id: data.id }))}>
            <DeleteIcon name="delete" size={25} style={Styles.icon} />
            <Text style={Styles.dropDownText}>حذف کارت</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );

};

export default Card;


