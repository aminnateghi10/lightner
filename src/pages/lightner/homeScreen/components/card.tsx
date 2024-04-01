import { Dimensions, StyleSheet, TouchableHighlight, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import MyText from "../../../../shared/myText";
import { useTheme } from "../../../../context/themeContext";
import { LightnerParamList } from "../../../../contracts/rootParamList";

const { width } = Dimensions.get("window");

interface PropsInterface {
  data: any,
  navigation: NativeStackNavigationProp<LightnerParamList>,
}

const Card = ({ data, navigation}: PropsInterface) => {
  const { currentTheme } = useTheme();
  let allLevels = 0;
  data.cards?.forEach(item => allLevels += item.level);
  const level = allLevels / data.cards.length * 14;

  const Styles = StyleSheet.create({
    col_3: {
      width: width / 2
    },
    card: {
      margin: 10,
      padding: 10,
      paddingBottom: 20,
      borderRadius: 4,
      backgroundColor: currentTheme.card
    },
    title: {
      textAlign: "center",
      fontSize:13
    }
  });

  const goToPage = () => {
    navigation.navigate("CardsItems", { listName: data.name });
  }
  return (
    <View style={Styles.col_3}>
      <TouchableHighlight
        style={Styles.card}
        onPress={goToPage}>
        <>
          <MyText style={Styles.title}>{data.name}</MyText>
          <MyText style={{ textAlign: "right", fontSize: 10,color:currentTheme.text,opacity:.6 }}>{data.cards.length} کارت</MyText>
          <View style={{ backgroundColor: currentTheme.border, borderRadius: 8,overflow:"hidden",marginTop:5 }}>
            <MyText style={{
              backgroundColor: currentTheme.button,
              height: 5,
              width: `${isNaN(level) ? 0 : level}%`
            }}></MyText>
          </View>

        </>
      </TouchableHighlight>
    </View>
  );
};

export default Card;
