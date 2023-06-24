import { Button, FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Card from "./components/card";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


const HomeScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };
  const list = useSelector((state: RootState) => state.cards.list);
  return (
    <View style={[backgroundStyle, Styles.contener]}>
      <FlatList
          numColumns={3}
          data={list}
          renderItem={({item}) => <Card navigation={navigation} data={item}/>}/>
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
