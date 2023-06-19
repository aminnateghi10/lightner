import {Button, FlatList, StyleSheet, Text, useColorScheme, View} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import Card from "./components/card";

const HomeScreen = ({navigation}: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter};
    const list = [
        {id: 1, name: 'لیست 1'},
        {
            id: 2, name: 'لیست 2',
            cards: [
                {id: 1, persian: 'سلام', english: "hello"},
                {id: 2, persian: 'سلام', english: "hello"},
                {id: 3, persian: 'سلام', english: "hello"},
                {id: 4, persian: 'سلام', english: "hello"},
                {id: 5, persian: 'سلام', english: "hello"},
                {id: 6, persian: 'سلام', english: "hello"},
            ]
        },
        {id: 3, name: 'لیست 3'},
        {id: 4, name: 'لیست4'},
    ];
    return (
        <View style={[backgroundStyle, Styles.contener]}>
            <FlatList
                numColumns={3}
                data={list}
                renderItem={({item}) => <Card navigation={navigation} data={item}/>}/>
        </View>
    );
}
export default HomeScreen;

const Styles = StyleSheet.create({
    contener: {
        height: '100%',
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    }
})
