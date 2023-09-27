import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import ReaderOutline from "react-native-vector-icons/Ionicons";
import MyText from "../../../../shared/myText";
import CardsOutlineIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EllipsisVertical from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../../../context/themeContext";

const Controller = () => {
  const { currentTheme } = useTheme();
  const Styles = StyleSheet.create({
    container: {
      backgroundColor:currentTheme.button,
      width: "100%",
      height: 50,
      flexDirection: "row-reverse",
      justifyContent: "space-around",
      alignItems: "center"
    },
    textColor:{
      color:currentTheme.darkText
    }
  });

  return (
    <View style={Styles.container}>
      <EllipsisVertical
        size={27}
        style={{flexGrow:1,paddingHorizontal:10,paddingVertical:10}}
        name="md-ellipsis-vertical-sharp" />
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center',flexGrow:8}}>
        <>
          <MyText style={Styles.textColor}>تمرین</MyText>
          <ReaderOutline name="reader-outline" style={{marginLeft:5}} size={25}/>
        </>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'center',flexGrow:8}}>
        <>
          <MyText style={Styles.textColor}>آماده مرور</MyText>
          <CardsOutlineIcon name="cards-outline" style={{marginLeft:5}} size={25}/>
        </>
      </TouchableOpacity>
    </View>
  );
};

export default Controller;
