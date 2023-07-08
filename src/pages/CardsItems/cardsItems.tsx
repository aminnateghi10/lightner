import React from 'react';
import {FlatList, StyleSheet, useColorScheme, View} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import Card from "./components/card";

const CardsItems = ({route,navigation}:any) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter};
    const { data } = route.params;
    return (
        <View style={[backgroundStyle, Styles.contener]}>
            <FlatList
              contentContainerStyle={{flex:1}}
              data={data.cards}
                renderItem={({item}) => <Card navigation={navigation} data={item} listName={data.name}/>}/>
        </View>
    );
};

export default CardsItems;

const Styles = StyleSheet.create({
    contener: {
        flex:1,
    }
})
