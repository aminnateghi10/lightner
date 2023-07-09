import { Colors } from "react-native/Libraries/NewAppScreen";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";

import Card from "./components/card";
import cards from "../../store/cards";
import { RootState, useAppSelector } from "../../store";

const CardsItems = ({ route, navigation }: any) => {
  const { listName } = route.params;

  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };

  const cards = useAppSelector(state => state.cards);
  let list = cards.list.find(item => item.name == listName);

  return (
    <View style={[backgroundStyle, Styles.contener]}>
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        data={list?.cards}
        renderItem={({ item }) => <Card navigation={navigation} data={item} listName={list?.name} />} />
    </View>
  );
};

export default CardsItems;

const Styles = StyleSheet.create({
  contener: {
    flex: 1
  }
});
