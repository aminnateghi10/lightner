import React, { useState } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Card from "./components/card";
import Tts from "react-native-tts";

const ShowCard = ({ route, navigation }: any) => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };
  const { data } = route.params;
  const [lang, setLang] = useState(true);

  let toggleLang = () => {
    if (!lang) Tts.speak(data.english);
    setLang(!lang);
  };

  return (
    <View style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <TouchableOpacity style={Styles.card} onPress={toggleLang}>
        <Text style={{ fontSize: 30, color: "rgb(0,0,0)" }}>{lang ? data.english : data.persian}</Text>
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
  }
});
