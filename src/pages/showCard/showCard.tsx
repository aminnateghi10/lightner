import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Card from "./components/card";
import Tts from "react-native-tts";

const ShowCard = ({ route, navigation }: any) => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };
  const { data } = route.params;
  const [lang, setLang] = useState(true);

  let sayAgain = () => Tts.speak(data.english);

  useEffect(() => {
    Tts.speak(data.english);
  }, []);

  return (
    <View style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <TouchableOpacity style={Styles.card} onPress={() => setLang(!lang)}>
        <Text style={{ fontSize: 30, color: "rgb(0,0,0)" }}>{lang ? data.english : data.persian}</Text>
        {
          lang &&
          <TouchableHighlight style={Styles.sayAgainCard} onPress={sayAgain}>
            <Icon name="refresh" size={27} color="rgb(0,49,255)" />
          </TouchableHighlight>
        }
      </TouchableOpacity>
    </View>
  );
};

export default ShowCard;

const Styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(0,132,255,0.43)",
    width: "80%",
    height: "80%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    opacity: .8
  },
  sayAgainCard: {
    position: "absolute",
    bottom: 20,
    left: "45%",
    backgroundColor: "rgb(255,85,0)",
    padding: 10,
    borderRadius: 50
  }
});
