import { StyleSheet, View, ViewProps } from "react-native";
import {Colors} from "../constants/colors";
const MyCard = (props : ViewProps) => {
  return <View {...props} style={[props.style,Styles.myCard]}/>
};

export default MyCard;


const Styles = StyleSheet.create({
  myCard:{
    backgroundColor:Colors.card,
  }
})
