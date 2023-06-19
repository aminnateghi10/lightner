import React from 'react';
import {FlatList, StyleSheet, useColorScheme, View} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import Card from "./components/card";

const CardsItems = ({route,navigation}:any) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter};
    const { data } = route.params;
    console.log(data ,'mm')
    return (
        <View style={[backgroundStyle, Styles.contener]}>
            <FlatList
                data={data}
                renderItem={({item}) => <Card navigation={navigation} data={item}/>}/>
        </View>
    );
};

export default CardsItems;

const Styles = StyleSheet.create({
    contener: {
        height: '100%',
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    }
})
