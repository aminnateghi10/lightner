import {useSelector} from "react-redux";
import {StyleSheet, View} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import CardsOutlineIcon from "react-native-vector-icons/MaterialCommunityIcons";

import {RootState} from "../../../../store";
import MyCard from "../../../../shared/myCard";
import MyText from "../../../../shared/myText";
import {Colors} from "../../../../constants/colors";
import {RootStackParamList} from "../../../../contracts/rootParamList";

interface PropsInterface {
    navigation: NativeStackNavigationProp<RootStackParamList>
}

const BrowseBar = ({navigation}: PropsInterface) => {
    const cards = useSelector((state: RootState) => state.cards);
    const browseList = cards?.list.map(item => {
        return item.cards.filter(element => element.browsing_time <= Date.now());
    });
    const singleBrowseList: any = {
        cards: [],
        name: 'مرور'
    };
    let newBrowseList = browseList.map(item => item.map(element => singleBrowseList.cards.push(element)));
    return (
        <MyCard style={Styles.container}>
            {
                singleBrowseList.cards.length ?
                    <MyText style={Styles.browseButton}
                            onPress={() => navigation.navigate("Review", {data: singleBrowseList})}>مرور</MyText>
                    : <View/>
            }
            <View style={{flexDirection: 'row'}}>
                <MyText>{`${singleBrowseList?.cards?.length} کارت برای مرور کردن دارید.`}</MyText>
                <CardsOutlineIcon name="cards-outline" size={27}/>
            </View>
        </MyCard>
    );
};

export default BrowseBar;

const Styles = StyleSheet.create({
    container: {
        height: 55,
        paddingHorizontal: 8,
        margin: 5,
        borderRadius: 5,
        elevation: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: "center",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border
    },
    browseButton: {
        backgroundColor: Colors.button,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    }
})
