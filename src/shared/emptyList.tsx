import React from "react";
import { View } from "react-native";
import FileText1Icon from "react-native-vector-icons/AntDesign";

import MyText from "./myText";

const EmptyList = () => {
  return (
    <View style={{alignItems:'center',justifyContent:'center',height:'100%'}}>
      <FileText1Icon name="filetext1" style={{opacity:.4}} size={100}/>
      <MyText style={{opacity:.6,marginTop:5,fontSize:15}}>لیست خالی است!</MyText>
    </View>
  );
};

export default EmptyList;
