import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "../../../context/themeContext";
import MyCard from "../../../shared/myCard";
import MyText from "../../../shared/myText";
import callApi from "../../../helpers/callApi";
import MyModal from "../../../shared/myModal";
import { updateLocale } from "jalali-moment";
import MyTextInput from "../../../shared/myTextInput";

const Index = ({navigation}) => {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    card:{
      flexDirection:'row',
      justifyContent:'flex-end',
      padding:12,
      borderBottomWidth:1,
      borderBottomColor:currentTheme.border,
      borderRadius:4,
      alignItems:'center'
    },
    btn:{
      marginHorizontal:6,
      marginTop:10,
      backgroundColor:currentTheme.button,
      alignItems:'center',
      paddingVertical:5,
      borderRadius:4
    },
    input:{
      borderColor:currentTheme.border,
      borderWidth:.5,
      flexGrow:1,
      height:35,
      padding:0,
      paddingHorizontal:5
    }
  });


  const [data , setData] = useState({
    "id": 4,
    "name": null,
    "email": null,
    "mobile": "09900209627",
    "email_verified_at": null,
    "created_at": "2023-11-28T20:15:41.000000Z",
    "updated_at": "2023-11-28T20:15:41.000000Z"
});
  const [edit , setEdit] = useState(false);
  const [logoutModal , setLogoutModal] = useState(false);

  useEffect(() => {
    (async ()=>{      
      await AsyncStorage.setItem('token','bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L2FwaS92MS9hdXRoL3JlZnJlc2giLCJpYXQiOjE3MDEzNDUwODUsImV4cCI6MTcwNjUyOTA5NCwibmJmIjoxNzAxMzQ1MDk0LCJqdGkiOiJFZERrTWFsdHVRQ0hCU0pKIiwic3ViIjoiNCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.M4VtxHd26852cQ4Rxmn-tEgfpBioYjrSUp6WOiM69OY')
      let {data} = await callApi().get('/api/v1/auth/me');
      setData(data.data);
    })()
  }, [edit]);

  const changeInformation = (key,value)=>{
    setData({ ...data, [key]: value });
  }

  const updateInformation =async ()=>{
    try {
      let res = await callApi().put("/api/v1/auth/me",data);
      setEdit(false);
      ToastAndroid.show("اطلاعات با موفقیت ذخیره شد.", ToastAndroid.SHORT);
    } catch(err){
      console.log(err);
    }
  }

  const logout =async ()=>{
    try {
      let res = await callApi().post("/api/v1/auth/logout");
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
      setLogoutModal(false);
      ToastAndroid.show("با موفقیت انجام شد.", ToastAndroid.SHORT);
    } catch(err){
      console.log(err);
    }
  }

  return (
    <SafeAreaView>
      {
        edit ?
        <MyCard style={{marginHorizontal:6,borderRadius:4,marginTop:10,elevation:3}}>
        <MyCard style={styles.card}>
          <MyTextInput style={styles.input} value={data.name} onChangeText={(e)=>changeInformation('name',e)}/>
          <MyText>نام کاربری : </MyText>
        </MyCard>
        <MyCard style={styles.card}>
        <MyTextInput style={styles.input} value={data.email} onChangeText={(e)=>changeInformation('email',e)}/>
          <MyText>ایمیل : </MyText>
        </MyCard>
      <TouchableOpacity style={[styles.btn,{marginTop:5,marginBottom:6,backgroundColor:'green'}]} onPress={updateInformation}>
        <MyText style={{color:'white'}}>ویرایش</MyText>
      </TouchableOpacity>
      </MyCard>
        :
        <MyCard style={{marginHorizontal:6,borderRadius:4,marginTop:10,elevation:3}}>
        <MyCard style={styles.card}>
          <MyText>{data.name}</MyText>
          <MyText>نام کاربری : </MyText>
        </MyCard>
        <MyCard style={styles.card}>
          <MyText>{data.mobile}</MyText>
          <MyText>شماره همراه : </MyText>
        </MyCard>
        <MyCard style={styles.card}>
          <MyText>{data.email}</MyText>
          <MyText>ایمیل : </MyText>
        </MyCard>
        <MyCard style={[styles.card,{borderBottomWidth:0}]}>
          <MyText>{data.created_at}</MyText>
          <MyText>تاریخ پیوستن :</MyText>
        </MyCard>
        <TouchableOpacity style={styles.btn} onPress={()=>setEdit(true)}>
        <MyText style={{color:'white'}}>ویرایش اطلاعات</MyText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn,{marginTop:5,marginBottom:6,backgroundColor:'red'}]} onPress={()=>setLogoutModal(true)}>
        <MyText style={{color:'white'}}>خروج از حساب</MyText>
      </TouchableOpacity>
      </MyCard>
      }

      {/* logout modal */}
      {
        logoutModal &&
        <MyModal
          submit={logout}
          cancel={()=>setLogoutModal(false)} title="خروج از حساب"
           body="آیا میخواهید از حساب کاربری خود خارج شوید؟" />
      }

    </SafeAreaView>
  );
};

export default Index;
