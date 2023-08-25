import {useState} from "react";
import {useDispatch} from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, useColorScheme, View} from "react-native";

import MyText from "../../../../shared/myText"

import {deleteCard} from "../../../../store/cards";
import {RootStackParamList} from "../../../../contracts/rootParamList";
import { useTheme } from "../../../../context/themeContext";

interface PropsInterface {
    data: any,
    navigation: NativeStackNavigationProp<RootStackParamList>,
    listName: string
}

const Card = ({data, navigation, listName,index , setDropDown , dropDown}: PropsInterface) => {
    const { currentTheme } = useTheme();

    const Styles = StyleSheet.create({
        card: {
            marginHorizontal: 8,
            paddingVertical: 25,
            borderRadius: 15,
            marginVertical: 10,
            backgroundColor:currentTheme.card
        },
        title: {
            textAlign: "center"
        },
        icon: {
            color: "rgb(0,0,0)",
            position: "absolute",
            top: 1,
            left: 4,
            padding: 20,
            zIndex: 2
        },
        dropDown: {
            position: 'absolute',
            top: 20,
            left:60,
            marginTop: 10,
            backgroundColor: '#EAEAEA',
            zIndex: 999,
        },
        dropDownText: {
            color: "black",
            fontSize: 18,
            marginHorizontal: 7,
            marginVertical: 6,
            borderColor: "rgb(75,74,74)",
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            textAlign: "center"
        }
    });

    const dispatch = useDispatch();

    const toggleDropDown = ()=>{
        if (data.id === dropDown)setDropDown(null);
        else setDropDown(data.id);
    }

    return (
        <View style={{position:"relative",zIndex:-index}}>
            <TouchableHighlight
                style={Styles.card}
                onPress={() => navigation.navigate("ShowCard", {data: data, listName})}>
                <>
                    <Icon name="ellipsis-horizontal" size={27} onPress={toggleDropDown}
                          style={Styles.icon}/>
                    <MyText style={[Styles.title]}>{data.english}</MyText>
                </>
            </TouchableHighlight>
            {
              data.id === dropDown &&
                <View style={Styles.dropDown}>
                            <TouchableOpacity onPress={() => navigation.navigate("EditCard", {data, listName})}>
                                <Text style={Styles.dropDownText}>ویرایش</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => dispatch(deleteCard({listName, id: data.id}))}>
                                <Text style={Styles.dropDownText}>حذف</Text>
                            </TouchableOpacity>
                </View>
            }
        </View>
    );

};

export default Card;


