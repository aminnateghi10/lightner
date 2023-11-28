import { FlatList, Linking, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useState } from "react";

import { useTheme } from "../../../context/themeContext";
import MyCard from "../../../shared/myCard";
import MyText from "../../../shared/myText";
import callApi from "../../../helpers/callApi";

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    await Linking.openURL(url);
  }, [url]);

  return <MyText children={children} style={{color:"#6598e6",marginTop:10}} onPress={handlePress} />;
};

const Index = ({navigation,route}) => {
  const { currentTheme } = useTheme();

  let {id} = route.params;
  
  const [data , setData] = useState({});

  const styles = StyleSheet.create({});

  useEffect(() => {
    (async ()=>{      
      let {data} = await callApi().get(`/api/v1/messages/${id}`);
      setData(data.data);
    })()
  }, []);

  console.log(data);
  

  return (
    <SafeAreaView>
      <MyCard style={{marginHorizontal:5,marginTop:10,padding:5}}>
        <MyText style={{fontSize:18}}>{data.title}</MyText>
        <MyText style={{marginTop:10}}>{data.body}</MyText>
        {
          data.link &&
            <OpenURLButton url={data.link}>لینک ورود</OpenURLButton>
        }
      </MyCard>
    </SafeAreaView>
  );
};

export default Index;
