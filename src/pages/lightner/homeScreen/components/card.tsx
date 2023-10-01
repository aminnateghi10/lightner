import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import MyText from "../../../../shared/myText";
import { useTheme } from "../../../../context/themeContext";
import { LightnerParamList } from "../../../../contracts/rootParamList";
import { length } from "jalali-moment";
import LinearGradient from "react-native-linear-gradient";
import DoubleArrowRight from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

interface PropsInterface {
  data: any,
  navigation: NativeStackNavigationProp<LightnerParamList>,
}

const Card = ({ data, navigation }: PropsInterface) => {
  console.log(data, "da");
  const { currentTheme } = useTheme();
  let allLevels = 0;
  data.cards?.forEach(item => allLevels += item.level);
  const level = allLevels / data.cards.length / 100;

  console.log(level, "levellevellevel");
  const Styles = StyleSheet.create({
    col_3: {
      width: width / 2
    },
    card: {
      margin: 10,
      padding: 10,
      paddingVertical: 30,
      borderRadius: 10,
      backgroundColor: currentTheme.card
    },
    title: {
      textAlign: "center"
    }
  });

  return (
    <View style={Styles.col_3}>
      <TouchableHighlight
        style={Styles.card}
        onPress={() => navigation.navigate("CardsItems", { listName: data.name })}>
        <>
          <MyText style={Styles.title}>{data.name}</MyText>
          <MyText style={Styles.title}>{data.cards.length}</MyText>
          <MyText style={{
            backgroundColor: "red",
            height: 10,
            borderRadius: 8,
            width: `${level == NaN ? 0 : level}%`
          }}></MyText>
        </>
      </TouchableHighlight>
    </View>
  );
};

export default Card;
