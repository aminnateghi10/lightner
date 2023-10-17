import { useState } from "react";
import ArrowLeft from "react-native-vector-icons/AntDesign";
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import Card from "./components/card";
import MyText from "../../../shared/myText";
import { useAppSelector } from "../../../store";
import { Colors } from "../../../constants/colors";
import Controller from "./components/controller";
import EmptyList from "../../../shared/emptyList";
import { useTheme } from "../../../context/themeContext";

const CardsItems = ({ route, navigation }: any) => {
  const { currentTheme } = useTheme();
  const Styles = StyleSheet.create({
    container: {
      flex: 1
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems:'center',
      backgroundColor:currentTheme.card,
      height: 55,
      padding: 12,
      borderColor: "red"
    },
    headerTitle: {
      fontSize: 17,
    }
  });

  const { listName } = route.params;
  const [dropDown, setDropDown] = useState(null);

  const cards = useAppSelector(state => state.cards);
  let list = cards.list.find(item => item.name == listName);
  navigation.setOptions({
    header: () => (
      <View style={Styles.headerContainer}>
        <ArrowLeft style={{ textAlign: "left" }} name="arrowleft" size={27} onPress={() => navigation.goBack()} />
        <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
          <MyText style={Styles.headerTitle}>{`دسته: ${listName} (${list?.cards.length} کارت)`}</MyText>
        </View>
      </View>
    )
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {
        list?.cards.length ?
          <ScrollView style={Styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
            {
              list?.cards.map((item, index) => (
                <Card dropDown={dropDown} setDropDown={setDropDown} index={index} navigation={navigation} data={item}
                      listName={list?.name ?? ""} />
              ))
            }
          </ScrollView>
          : <View style={Styles.container}><EmptyList /></View>
      }
      <Controller cards={list?.cards} listName={list?.name} navigation={navigation} />
    </SafeAreaView>
  );
};

export default CardsItems;

