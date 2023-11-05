import React, { useState, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";

import MyText from "../../../shared/myText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LightnerParamList } from "../../../contracts/rootParamList";
import { RouteProp } from "@react-navigation/native";


const OTPInput = ({ setOpt, otp }) => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()]; // Refs for individual OTP input fields


  const handleInputChange = (index, value) => {
    if (isNaN(value)) {
      return; // Only allow numeric input
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOpt(newOTP);

    // Move to the next input field if a digit is entered
    if (index < 3 && value !== "") {
      inputRefs[index + 1].current.focus();
    }
  };
  const handleInputKeyPress = (index, event) => {
    if (event.nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <View style={styles.inputContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={digit}
          onChangeText={(value) => handleInputChange(index, value)}
          onKeyPress={(e) => handleInputKeyPress(index, e)}
          ref={inputRefs[index]}
          maxLength={1}
          keyboardType="numeric"
        />
      ))}
    </View>
  );
};

interface PropsInterface {
  navigation: NativeStackNavigationProp<LightnerParamList>,
  route: RouteProp<LightnerParamList, "Otp">,
}

const Index = ({ navigation, route }: PropsInterface) => {
  let { cellPhone } = route.params;
  const [otp, setOpt] = useState(["", "", "", "", "", ""]); // Initialize with 4 empty strings

  const handleSubmit = () => {
    const enteredOTP = otp.join("");
  };

  return (
    <View style={styles.container}>
      <MyText style={styles.title}>هم اکنون یک کد 6 رقمی برای شماره 09389857755 ارسال شد</MyText>
      <OTPInput setOpt={setOpt} otp={otp} />
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <MyText style={styles.buttonText}>تایید</MyText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.outlineButton} onPress={handleSubmit}>
        <MyText style={[styles.buttonText,{color:'blue'}]}>تلاش مجدد</MyText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.outlineButton} onPress={handleSubmit}>
        <MyText style={[styles.buttonText,{color:'blue'}]}>تغییر شماره</MyText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#f0f0f0'
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  input: {
    width: "10%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
    margin: 5,
    marginBottom: 25
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
    borderColor: "blue",      // Border color
    borderWidth: 2,           // Border width
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop:5
  },
  title: {
    fontSize: 20,
    width: "80%",
    marginBottom: 20,
    textAlign: "center"
  }
});

export default Index;
