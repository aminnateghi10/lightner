import { Dimensions, StyleSheet, Text, TouchableHighlight, useColorScheme, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../contracts/rootStackParamList";

const { width } = Dimensions.get("window");

interface PropsInterface {
  data: any,
  navigation: NativeStackNavigationProp<RootStackParamList>
}

const Card = ({ data, navigation }: PropsInterface) => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.lighter : Colors.darker };
  const textColor = { color: isDarkMode ? "black" : "white" };
  return (
    <View style={Styles.col_3}>
      <TouchableHighlight
        style={[Styles.card, backgroundStyle]}
        onPress={() => navigation.navigate("CardsItems", { data: data.cards })}>
        <Text style={[Styles.title, textColor]}>{data.name}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Card;

const Styles = StyleSheet.create({
  col_3: {
    width: width / 3
  },
  card: {
    margin: 10,
    padding: 10,
    paddingVertical: 30,
    borderRadius: 10
  },
  title: {
    textAlign: "center"
  }
});
