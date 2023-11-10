import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, TouchableOpacity, StyleSheet, Vibration } from "react-native";

import MyText from "../../../shared/myText";
import callApi from "../../../helpers/callApi";
import MyTextInput from "../../../shared/myTextInput";
import { LightnerParamList } from "../../../contracts/rootParamList";
import { validateCellphoneNumber } from "../../../utils/validateCellphoneNumber";

interface PropsInterface {
  navigation: NativeStackNavigationProp<LightnerParamList>,
}

const Index = ({ navigation }: PropsInterface) => {
  const [cellPhone, setCellPhone] = useState("");
  const [errMassage, setErrMassage] = useState("");

  const handleLogin = async () => {
    if (validateCellphoneNumber(cellPhone)) {
      try {
        let res = await callApi().post("/api/v1/auth/login", { "mobile": cellPhone });
        navigation.navigate("Otp", { cellPhone });
      } catch (err) {
        console.log(err,'sdsd');
      }
    } else {
      setErrMassage("شماره خود را صحیح وارد نمایید.");
      Vibration.vibrate(10);
    }
  };

  const consthandleChangeCellPhone = (text: string) => {
    setCellPhone(text);
    setErrMassage('');
  }

  return (
    <View style={styles.container}>
      <MyText style={styles.title}>شماره موبایل خود را وارد کنید</MyText>
      <MyTextInput
        style={styles.input}
        placeholder="مثال: 09xxxxxxxxx"
        value={cellPhone}
        onChangeText={consthandleChangeCellPhone}
      />
      <MyText style={{ color: 'red', textAlign: 'right', width: '80%' }}>{errMassage}</MyText>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <MyText style={styles.buttonText}>ادامه</MyText>
      </TouchableOpacity>
    </View>
  );
};



export default Index;

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
    padding: 10,
    textAlign: "left"
  },
  loginButton: {
    marginTop: 20,
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