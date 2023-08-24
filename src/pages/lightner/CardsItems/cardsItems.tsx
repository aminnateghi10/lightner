import {Colors} from "../../../constants/colors";
import ArrowLeft from "react-native-vector-icons/AntDesign";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";

import Card from "./components/card";
import {useAppSelector} from "../../../store";
import MyText from "../../../shared/myText";
import { useState } from "react";

const CardsItems = ({route, navigation}: any) => {
    const {listName} = route.params;
    const [dropDown, setDropDown] = useState(null);

    const cards = useAppSelector(state => state.cards);
    let list = cards.list.find(item => item.name == listName);
    navigation.setOptions({
        header: () => (
            <View style={Styles.headerContainer}>
                <ArrowLeft style={{textAlign:'left'}} name="arrowleft" size={27}
                           onPress={()=>navigation.goBack()}/>
                <View style={{flexDirection:"row-reverse",alignItems:'center'}}>
                    <MyText style={Styles.headerTitle}>دسته: {listName}</MyText>
                    <MyText style={{
                        marginHorizontal: 10,
                        padding: 4,
                        backgroundColor: Colors.button,
                        borderRadius: 5,
                    }}>{list?.cards.length}</MyText>
                </View>
            </View>
        ),
    })

    return (
        <ScrollView
          style={Styles.container}
        contentContainerStyle={{paddingBottom:80}}>
            {
                list?.cards.map((item,index) =>(
                  <Card dropDown={dropDown} setDropDown={setDropDown} index={index} navigation={navigation} data={item} listName={list?.name ?? ''}/>
                ))
            }
        </ScrollView>
    );
};

export default CardsItems;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.card,
        height: 55,
        padding:12,
        borderColor: 'red',
    },
    headerTitle: {
        fontSize: 18
    },
});
