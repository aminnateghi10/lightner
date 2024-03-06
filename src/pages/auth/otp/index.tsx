import OtpInputs from "react-native-otp-inputs";
import React, { useState, useEffect, useRef } from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet, TouchableOpacity, Vibration } from "react-native";

import MyText from "../../../shared/myText";
import callApi from "../../../helpers/callApi";
import { useTheme } from "../../../context/themeContext";
import { LightnerParamList } from "../../../contracts/rootParamList";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PropsInterface {
  navigation: NativeStackNavigationProp<LightnerParamList>,
  route: RouteProp<LightnerParamList, "Otp">,
}

const Index = ({ navigation, route }: PropsInterface) => {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: currentTheme.background
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
      backgroundColor: currentTheme.card,
      width: "80%",
      height: 50,
      borderColor: currentTheme.modalBorder,
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

  let { cellPhone } = route.params;

  const [otp, setOpt] = useState("");
  const [time, setTime] = useState(0);

  const otpInputRef = useRef(null);
  //
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTime((prev) => {
  //       if (prev === 1) clearInterval(timer);
  //       return prev - 1;
  //     });
  //   }, 1000);
  //
  //   return () => clearInterval(timer);
  // }, []);

  const handleSubmit = async () => {
    if (otp.length === 6) {
      try {
        let {data} = await callApi().post("/api/v1/auth/verify", { "code": otp });
        console.log(data.data.access_token,'token');
        await AsyncStorage.setItem('token',`Bearer ${data.data.access_token}`);
        navigation.navigate('TabBar');
      } catch (err) {
      }
    }else{
      setOpt('');
      Vibration.vibrate(10);
    }
  };
  const reSend = async () => {
    if (otpInputRef.current){
        let res = await callApi().post("/api/v1/auth/login", { "mobile": cellPhone });
        otpInputRef.current.reset();
        setOpt('');
    }
  };

  return (
    <View style={styles.container}>
      <MyText style={styles.title}>هم اکنون یک کد 6 رقمی برای شماره {cellPhone} ارسال شد</MyText>
      <OtpInputs
        autoFocusOnLoad
        handleChange={(code) => setOpt(code)}
        numberOfInputs={6}
        value={+otp}
        ref={otpInputRef}
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
            <MyText style={[styles.buttonText, { color: "white" }]}>{time}</MyText>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.outlineButton} onPress={reSend}>
            <MyText style={[styles.buttonText, { color: currentTheme.text  }]}>تلاش مجدد</MyText>
          </TouchableOpacity>
      }

      <TouchableOpacity style={styles.outlineButton} onPress={() => navigation.navigate("Login")}>
        <MyText style={[styles.buttonText, { color: currentTheme.text }]}>تغییر شماره</MyText>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
