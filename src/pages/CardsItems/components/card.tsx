import React from 'react';
import {StyleSheet, Text, TouchableHighlight, useColorScheme, View} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

const Card = ({data, navigation}: any) => {

    const isDarkMode = useColorScheme() === 'dark';
    const colorStyle = {color: isDarkMode ? "black" : "white"};
    const backgroundStyle = {backgroundColor: isDarkMode ? Colors.lighter : Colors.darker};
    return (
        <TouchableHighlight onPress={()=>navigation.navigate('')} style={[Styles.card,backgroundStyle]}>
            <Text style={[Styles.title,colorStyle]}>{data.english}</Text>
        </TouchableHighlight>
    );
};

export default Card;

const Styles = StyleSheet.create({
    card: {
        marginHorizontal:15,
        paddingVertical:25,
        borderRadius:15,
        marginVertical:10,
    },
    title: {
        textAlign:"center",
    }
})
