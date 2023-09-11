import EmailIcon from "react-native-vector-icons/Fontisto";
import TelegramIcon from "react-native-vector-icons/FontAwesome";
import FeedbackIcon from "react-native-vector-icons/MaterialIcons";
import ArrowLeftIcon from "react-native-vector-icons/SimpleLineIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {  Linking, SafeAreaView, StyleSheet, TouchableHighlight, View } from "react-native";

import MyText from "../../../shared/myText";
import MyTextInput from "../../../shared/myTextInput";
import { useTheme } from "../../../context/themeContext";
import { LightnerParamList } from "../../../contracts/rootParamList";


interface PropsInterface {
  navigation: NativeStackNavigationProp<LightnerParamList>;
}

const SettingPage = ({ navigation }: PropsInterface) => {
  const { currentTheme } = useTheme();
  const Styles = StyleSheet.create({
    container: {
      padding: 10,
      paddingTop:5
    },
    information: {
      borderColor: currentTheme.border,
      borderWidth: 1,
      marginHorizontal: 15,
      marginTop: 10,
      borderRadius: 8,
      padding: 8
    },
    informationSubmit: {
      textAlign: "center",
      backgroundColor: currentTheme.button,
      alignItems: "center",
      marginHorizontal: 15,
      marginTop: 10,
      borderRadius: 8,
      padding: 8
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 5,
      backgroundColor: currentTheme.card,
      marginTop: 8,
      padding: 5,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
    }
  });

  const openURL = async (url: string) => await Linking.openURL(url);

  return (
    <SafeAreaView>
      <View style={Styles.container}>
        <TouchableHighlight style={Styles.card} onPress={() => navigation.navigate("FeedbackPage")}>
          <>
            <FeedbackIcon name="feedback" size={30} />
            <MyText>ارسال بازخورد</MyText>
          </>
        </TouchableHighlight>
        <TouchableHighlight style={Styles.card} onPress={() => openURL("mailto:aminnateghi10@gmail.com")}>
          <>
            <EmailIcon name="email" size={30} />
            <MyText>ارسال ایمیل</MyText>
          </>
        </TouchableHighlight>
        <TouchableHighlight style={Styles.card} onPress={() => openURL("https://t.me/aminnateghi10")}>
          <>
            <TelegramIcon name="telegram" color="#33a9df" size={30} />
            <MyText>ارتباط با تلگرام</MyText>
          </>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default SettingPage;
