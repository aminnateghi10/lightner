import { StyleSheet, View, ViewProps } from "react-native";
import {Colors} from "../constants/colors";
import { useTheme } from "../context/themeContext";
const MyCard = (props : ViewProps) => {
  const { currentTheme } = useTheme();

  console.log(currentTheme , 'cuucuccu');

  const Styles = StyleSheet.create({
    myCard:{
      // backgroundColor:currentTheme.card,
    }
  })

  return <View {...props} style={[props.style,Styles.myCard]}/>
};

export default MyCard;

