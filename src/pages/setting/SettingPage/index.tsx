import { StyleSheet, TouchableHighlight, View } from "react-native";
import ArrowLeftIcon from "react-native-vector-icons/SimpleLineIcons";
import UserIcon from "react-native-vector-icons/AntDesign";
import CloudDownIcon from "react-native-vector-icons/Fontisto";
import SupportAgentIcon from "react-native-vector-icons/MaterialIcons";
import EmailIcon from "react-native-vector-icons/Fontisto";

import MyText from "../../../shared/myText";
import DarkMode from "./components/darkMode";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingParamList } from "../../../contracts/rootParamList";
import { useTheme } from "../../../context/themeContext";


interface PropsInterface {
  navigation: NativeStackNavigationProp<SettingParamList>;
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
    },
    icon:{
      marginLeft:8,
      color:currentTheme.text,
      opacity:.5
    },
    arrowIcon:{
      color:currentTheme.text,
      opacity:.5,
      flexGrow:1
    }
  });

  return (
    <View style={{marginTop:10}}>
      <TouchableHighlight style={Styles.card} onPress={()=>navigation.navigate("Me")}>
        <>
          <>
            <UserIcon name="user" style={Styles.icon} size={25} />
            <MyText>حساب کاربری</MyText>
          </>
          <ArrowLeftIcon name="arrow-left" size={20} style={Styles.arrowIcon} />
        </>
      </TouchableHighlight>
      <DarkMode parentStyle={Styles} />
      <TouchableHighlight style={Styles.card} onPress={()=>navigation.navigate("Backup")}>
        <>
          <CloudDownIcon name="cloud-down" style={Styles.icon} size={25} />
          <MyText>پشتیبان گیری و بازیابی</MyText>
          <ArrowLeftIcon name="arrow-left" size={20} style={Styles.arrowIcon} />
        </>
      </TouchableHighlight>
      <TouchableHighlight style={Styles.card} onPress={()=>navigation.navigate('Messages')}>
        <>
          <EmailIcon name="email" style={Styles.icon} size={25} />
          <MyText>پیام ها</MyText>
          <ArrowLeftIcon name="arrow-left" size={20} style={Styles.arrowIcon} />
        </>
      </TouchableHighlight>
      <TouchableHighlight style={Styles.card} onPress={() => navigation.navigate("SupportPage")}>
        <>
          <SupportAgentIcon name="support-agent" style={Styles.icon} size={25} />
          <MyText>پشتیبانی</MyText>
          <ArrowLeftIcon name="arrow-left" size={20} style={Styles.arrowIcon}/>
        </>
      </TouchableHighlight>
    </View>
  );
};

export default SettingPage;
