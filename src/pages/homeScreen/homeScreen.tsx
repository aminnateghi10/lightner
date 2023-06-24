import { useSelector } from "react-redux";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Card from "./components/card";
import { RootState } from "../../store";
import { RootStackParamList } from "../../contracts/rootStackParamList";

interface PropsInterface {
  navigation: NativeStackNavigationProp<RootStackParamList>,
}

const HomeScreen = ({ navigation }: PropsInterface) => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };
  const list = useSelector((state: RootState) => state.cards.list);
  return (
    <View style={[backgroundStyle, Styles.contener]}>
      <FlatList
        numColumns={3}
        data={list}
        renderItem={({ item }) => <Card navigation={navigation} data={item} />} />
    </View>
  );
};
export default HomeScreen;

const Styles = StyleSheet.create({
  contener: {
    height: "100%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
