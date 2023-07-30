import {StyleSheet, View} from "react-native";

import MyText from "../../../shared/myText";


const SettingPage = () => {
    return (
        <View>
            <View style={Styles.card}><MyText>حالت تاریک</MyText></View>
        </View>
    );
};

export default SettingPage;


const Styles = StyleSheet.create({
    card: {
        margin: 10,
        backgroundColor: '#f6f6f6',
        padding: 10, borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2
    }
})
