import { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import MyText from "../../../shared/myText";
import MyTextInput from "../../../shared/myTextInput";
import { LightnerParamList } from "../../../contracts/rootParamList";

interface PropsInterface {
  navigation: NativeStackNavigationProp<LightnerParamList>,
}

const Index = ({ navigation }: PropsInterface) => {
  const [cellPhone, setCellPhone] = useState("");

  const handleLogin = async () => {
    if (cellPhone) {
      navigation.navigate("Home");
      navigation.navigate("Otp", { cellPhone });
    }
  };

  return (
    <View style={styles.container}>
      <MyText style={styles.title}>شماره موبایل خود را وارد کنید</MyText>
      <MyTextInput
        style={styles.input}
        placeholder="مثال: 09xxxxxxxxx"
        value={cellPhone}
        onChangeText={(text) => setCellPhone(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <MyText style={styles.buttonText}>ادامه</MyText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0"
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    padding: 10
  },
  loginButton: {
    backgroundColor: "blue",
    width: "80%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }
});

export default Index;
