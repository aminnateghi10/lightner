import { StyleSheet, View, ViewProps } from "react-native";

import { useTheme } from "../context/themeContext";
const MyCard = (props : ViewProps) => {
  const { currentTheme } = useTheme();

  const Styles = StyleSheet.create({
    myCard:{
      backgroundColor:currentTheme.card,
    }
  });

  return <View {...props} style={[props.style,Styles.myCard]}/>
};

export default MyCard;

