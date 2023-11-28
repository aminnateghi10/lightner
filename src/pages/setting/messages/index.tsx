import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import { useTheme } from "../../../context/themeContext";
import MyCard from "../../../shared/myCard";
import MyText from "../../../shared/myText";
import callApi from "../../../helpers/callApi";

const Index = ({navigation}) => {
  const { currentTheme } = useTheme();

  console.log(navigation,'navigation');
  
  const [data , setData] = useState([]);

  const styles = StyleSheet.create({});

  useEffect(() => {
    (async ()=>{      
      let {data} = await callApi().get('/api/v1/messages');
      setData(data.data);
    })()
  }, []);


  return (
    <SafeAreaView>
      <FlatList data={data} keyExtractor={item => item.id} renderItem={({ item }) => (
        <TouchableOpacity
        onPress={()=>navigation.navigate("SingleMassage",{id:item.id})}
          style={{ marginTop: 10, marginHorizontal: 5, borderRadius: 5, elevation: 2, padding: 5, paddingHorizontal: 10 ,backgroundColor:currentTheme.card}}>
          <MyText style={{ fontSize: 18 }}>{item.title}</MyText>
        </TouchableOpacity>
      )} />
    </SafeAreaView>
  );
};

export default Index;
