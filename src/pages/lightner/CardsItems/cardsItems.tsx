import {Colors} from "../../../constants/colors";
import ArrowLeft from "react-native-vector-icons/AntDesign";
import {FlatList, StyleSheet, Text, View} from "react-native";

import Card from "./components/card";
import cards from "../../../store/cards";
import {RootState, useAppSelector} from "../../../store";

const CardsItems = ({route, navigation}: any) => {
    const {listName} = route.params;

    const cards = useAppSelector(state => state.cards);
    let list = cards.list.find(item => item.name == listName);
    navigation.setOptions({
        header: () => (
            <View style={Styles.headerContainer}>
                <ArrowLeft style={{textAlign:'left'}} name="arrowleft" size={27} color="white"
                           onPress={()=>navigation.goBack()}/>
                <View style={{flexDirection:"row-reverse",alignItems:'center'}}>
                    <Text style={Styles.headerTitle}>دسته: {listName}</Text>
                    <Text style={{
                        marginHorizontal: 10,
                        padding: 4,
                        backgroundColor: Colors,
                        borderRadius: 5,
                        color:'white'
                    }}>{list?.cards.length}</Text>
                </View>
            </View>
        ),
    })

    return (
        <View style={Styles.container}>
            <FlatList
                data={list?.cards}
                // style={{flex:2}}
                // contentContainerStyle={{flex:1}}
                renderItem={({item}) => <Card navigation={navigation} data={item} listName={list?.name ?? ''}/>}/>
        </View>
    );
};

export default CardsItems;

const Styles = StyleSheet.create({
    container: {
        flex: 1
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
        color: 'white',
        fontSize: 18
    },
});
