import OtpInputs from "react-native-otp-inputs";
import React, { useState, useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet, TouchableOpacity, Vibration } from "react-native";

import MyText from "../../../shared/myText";
import callApi from "../../../helpers/callApi";
import { LightnerParamList } from "../../../contracts/rootParamList";

interface PropsInterface {
  navigation: NativeStackNavigationProp<LightnerParamList>,
  route: RouteProp<LightnerParamList, "Otp">,
}

const Index = ({ navigation, route }: PropsInterface) => {
  let { cellPhone } = route.params;

  const [otp, setOpt] = useState("");
  const [time, setTime] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) clearInterval(timer);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async () => {
    if (otp.length === 6) {
      try {
        let res = await callApi().post("/api/v1/auth/verify", { "code": otp });
        console.log(res, 'my otp res');
      } catch (err) {
      }
    }else{
      Vibration.vibrate(10);
    }
  };
  const reSend = () => {
    console.log("submit 444");
  };

  return (
    <View style={styles.container}>
      <MyText style={styles.title}>هم اکنون یک کد 6 رقمی برای شماره {cellPhone} ارسال شد</MyText>
      <OtpInputs
        handleChange={(code) => setOpt(code)}
        numberOfInputs={6}
        style={{ flexDirection: "row", height: 100 }}
        inputStyles={{
          borderBottomWidth: 3,
          borderBottomColor: "blue",
          marginHorizontal: 3,
          width: 40,
          textAlign: "center"
        }}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <MyText style={styles.buttonText}>تایید</MyText>
      </TouchableOpacity>
      {
        time ?

          <TouchableOpacity style={styles.outlineButton}>
            <MyText style={[styles.buttonText, { color: "blue" }]}>{time}</MyText>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.outlineButton} onPress={reSend}>
            <MyText style={[styles.buttonText, { color: "blue" }]}>تلاش مجدد</MyText>
          </TouchableOpacity>
      }

      <TouchableOpacity style={styles.outlineButton} onPress={() => navigation.navigate("Login")}>
        <MyText style={[styles.buttonText, { color: "blue" }]}>تغییر شماره</MyText>
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
  buttonText: {
    color: "white",
    fontSize: 18
  },
  loginButton: {
    backgroundColor: "blue",
    width: "80%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  outlineButton: {
    backgroundColor: "#f0f0f0",
    width: "80%",
    height: 50,
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5
  },
  title: {
    fontSize: 20,
    width: "80%",
    marginBottom: 20,
    textAlign: "center"
  }
});

export default Index;
