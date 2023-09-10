import { StyleSheet, TouchableHighlight, View } from "react-native";
import ArrowLeftIcon from "react-native-vector-icons/SimpleLineIcons";

import MyText from "../../../shared/myText";
import DarkMode from "./components/darkMode";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../contracts/rootParamList";
import { useTheme } from "../../../context/themeContext";


interface PropsInterface {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const SettingPage = ({ navigation }: PropsInterface) => {
  const { currentTheme } = useTheme();
  const Styles = StyleSheet.create({
    card: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      margin: 10,
      marginTop: 0,
      padding: 10, borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
      backgroundColor: currentTheme.card
    }
  });

  return (
    <View style={{marginTop:10}}>
      <TouchableHighlight style={Styles.card}>
        <>
          <MyText>حساب کاربری</MyText>
          <ArrowLeftIcon name="arrow-left" size={20} />
        </>
      </TouchableHighlight>
      <DarkMode />
      <TouchableHighlight style={Styles.card} onPress={() => navigation.navigate("SupportPage")}>
        <>
          <MyText>پشتیبان گیری و بازیابی</MyText>
          <ArrowLeftIcon name="arrow-left" size={20} />
        </>
      </TouchableHighlight>
      <TouchableHighlight style={Styles.card}>
        <>
          <MyText>جعبه لایتنر</MyText>
          <ArrowLeftIcon name="arrow-left" size={20} />
        </>
      </TouchableHighlight>
      <TouchableHighlight style={Styles.card}>
        <>
          <MyText>پیام ها</MyText>
          <ArrowLeftIcon name="arrow-left" size={20} />
        </>
      </TouchableHighlight>
      <TouchableHighlight style={Styles.card}>
        <>
          <MyText>پشتیبانی</MyText>
          <ArrowLeftIcon name="arrow-left" size={20} />
        </>
      </TouchableHighlight>
    </View>
  );
};

export default SettingPage;
