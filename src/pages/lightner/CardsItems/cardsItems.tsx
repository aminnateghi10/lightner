import { useState } from "react";
import SearchIcon from "react-native-vector-icons/Feather";
import ArrowLeft from "react-native-vector-icons/AntDesign";
import CloseIcon from "react-native-vector-icons/AntDesign";
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import Card from "./components/card";
import MyText from "../../../shared/myText";
import { useAppSelector } from "../../../store";
import { Colors } from "../../../constants/colors";
import Controller from "./components/controller";
import EmptyList from "../../../shared/emptyList";
import MyTextInput from "../../../shared/myTextInput";
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
      alignItems: "center",
      backgroundColor: currentTheme.card,
      height: 55,
      padding: 12,
      borderColor: "red"
    },
    headerTitle: {
      fontSize: 17
    },
    search: {
      borderBottomColor: currentTheme.border,
      borderBottomWidth: .5,
      flex: 1,
      marginTop: 0,
      paddingHorizontal: 10,
      marginHorizontal: 40,
      paddingBottom: 5,
      height: 35,
    }
  });

  const { listName } = route.params;
  const [dropDown, setDropDown] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const cards = useAppSelector(state => state.cards);
  let list = cards.list.find(item => item.name == listName);

  let filterList = list?.cards?.filter((item) => {
    // Check if either "english" or "persian" property contains the query
    if (searchText) {
      if (item.english?.toLowerCase()?.includes(searchText.toLowerCase()) || item.persian?.includes(searchText.toLowerCase())) {
        return item;
      } else {
        return null;
      }
    } else return item;
  });

  navigation.setOptions({
    header: () => (
      <View style={Styles.headerContainer}>
        <ArrowLeft style={{ textAlign: "left" }} name="arrowleft" size={27} onPress={() => navigation.goBack()} />
        {
          search ?
            <View style={{flexDirection:"row",flex:1,alignItems:'center',marginLeft:20}}>
              <CloseIcon name="close" size={24} onPress={() => setSearch(false)} />
              <MyTextInput value={searchText} onChangeText={setSearchText} style={Styles.search}
                           placeholder="جستجو..." />
            </View>
            :
            <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
              <MyText style={Styles.headerTitle}>{`دسته: ${listName} (${list?.cards.length} کارت)`}</MyText>
            </View>
        }
        <SearchIcon style={{ textAlign: "left" }} name="search" size={27} onPress={() => setSearch(!search)} />
      </View>
    )
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {
        filterList?.length ?
          <ScrollView style={Styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
            {
              filterList.map((item, index) => (
                <Card dropDown={dropDown} setDropDown={setDropDown} key={index} index={index} navigation={navigation}
                      data={item}
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

