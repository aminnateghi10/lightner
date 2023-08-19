import {useSelector} from "react-redux";
import {StyleSheet, View} from "react-native";
import CardsOutlineIcon from "react-native-vector-icons/MaterialCommunityIcons";

import MyCard from "../../../../shared/myCard";
import MyText from "../../../../shared/myText";
import {Colors} from "../../../../constants/colors";
import {RootState} from "../../../../store";

const BrowseBar = () => {


    const cards = useSelector((state: RootState) => state.cards);
    console.log(cards)
    const browseList = cards?.list.map(item => {
        return item.cards.filter(element => element.browsing_time <= Date.now());
    });
    let singleBrowseList = browseList.map(item => [...item]);
    console.log(singleBrowseList,'browseList')
    return (
        <MyCard style={Styles.container}>
            <MyText style={Styles.browseButton} onPress={() => console.log('yyyy')}>مرور</MyText>
            <View style={{flexDirection: 'row'}}>
                <MyText>{`${browseList.length} کارت برای مرور کردن دارید.`}</MyText>
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
