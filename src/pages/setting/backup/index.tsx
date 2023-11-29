import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "../../../context/themeContext";
import MyCard from "../../../shared/myCard";
import MyText from "../../../shared/myText";
import callApi from "../../../helpers/callApi";
import MyModal from "../../../shared/myModal";

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
    },
    btn:{
      marginHorizontal:6,
      marginTop:10,
      backgroundColor:currentTheme.button,
      alignItems:'center',
      paddingVertical:5,
      borderRadius:4
    }
  });

  const [data , setData] = useState([]);
  const [modal , setModal] = useState(false);
  const [recoveryModal , setRecoveryModal] = useState(false);

  useEffect(() => {
    (async ()=>{      
      let {data} = await callApi().get('/api/v1/cards/show');
      console.log(data,'my data');
      let cards = JSON.parse(data.data.content);
      setData(cards.list);
    })()
  }, []);

  const getTotalCardsLength = () => data?.reduce((acc, item) => acc + item?.cards?.length, 0);
  

  const totalCardsLength = getTotalCardsLength();

  const backupData =async ()=>{
    setModal(false);
    let content = await AsyncStorage.getItem('my-data');
    try {
      let res = await callApi().post("/api/v1/cards",{content});
      ToastAndroid.show("پشتیبان گیری با موفقیت انجام شد.", ToastAndroid.SHORT);
    } catch(err){
      console.log(err);
    }
  }

  const recoveryData =async ()=>{
    setRecoveryModal(false);
    if(data){
      await AsyncStorage.setItem('my-data',JSON.stringify({list:data}));
      ToastAndroid.show("بازیابی با موفقیت انجام شد.", ToastAndroid.SHORT);
    }
  }

  return (
    <SafeAreaView>
      <MyCard style={{marginHorizontal:6,borderRadius:4,marginTop:10,elevation:3}}>
        <MyCard style={styles.card}>
          <MyText>1402,3,2</MyText>
          <MyText>آخرین پشتیبان گیری:  </MyText>
        </MyCard>
        <MyCard style={styles.card}>
          <MyText>1402,3,2</MyText>
          <MyText>از دستگاه:  </MyText>
        </MyCard>
        <MyCard style={styles.card}>
          <MyText>جعبه لایتنر ({totalCardsLength} کارت)</MyText>
        </MyCard>
      </MyCard>
      <TouchableOpacity style={styles.btn} onPress={()=>setModal(true)}>
        <MyText style={{color:'white'}}>پشتیبان گیری</MyText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn,{marginTop:5}]} onPress={()=>setRecoveryModal(true)}>
        <MyText style={{color:'white'}}>بازیابی کارت ها ({totalCardsLength} کارت)</MyText>
      </TouchableOpacity>

      {/* back up modal */}
      {
        modal &&
        <MyModal
          submit={backupData}
          cancel={()=>setModal(false)} title="پشتیبان گیری اطلاعات روی سرور برنامه"
           body="اطلاعات جعبه لایتنر روی سرور پشتیبان گرفته میشود.
           هشدار:اطلاعات ارسالی جایگزین اطلاعات قبلی سمت سرور می شود و این عملیات قابل برگشت نیست." />
      }

      {/* recovery modal */}
      {
        recoveryModal &&
        <MyModal
          submit={recoveryData}
          cancel={()=>setRecoveryModal(false)} title="بازیابی اطلاعات"
           body="اطلاعات کنونی روی دستگاه حذف و آخرین اطلاعات ذخیره شده روی سرور دانلود و جایگزین می شود." />
      }

    </SafeAreaView>
  );
};

export default Index;
