import { StyleSheet, View, ViewProps } from "react-native";
const MyCard = (props : ViewProps) => {
  return <View {...props} style={[props.style,Styles.myCard]}/>
};

export default MyCard;


const Styles = StyleSheet.create({
  myCard:{
    backgroundColor:'rgb(48,48,48)'
  }
})
