import { Dimensions, StyleSheet, TouchableHighlight, View, } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import MyText from "../../../../shared/myText";
import { useTheme } from "../../../../context/themeContext";
import { LightnerParamList } from "../../../../contracts/rootParamList";

const { width } = Dimensions.get("window");

interface PropsInterface {
  data: any,
  navigation: NativeStackNavigationProp<LightnerParamList>,
  index: number,
}

const Card = ({ data, index, navigation }: PropsInterface) => {
  const { currentTheme } = useTheme();
  const Styles = StyleSheet.create({
    col_3: {
      width: width / 2
    },
    card: {
      margin: 10,
      padding: 10,
      paddingVertical: 30,
      borderRadius: 10,
      backgroundColor:currentTheme.card
    },
    title: {
      textAlign: "center"
    },
    icon: {
      position: "absolute",
      top: 8,
      padding: 2
    },

    dropDown: {
      position: "absolute",
      backgroundColor: "rgb(199,199,199)",
      left: 40,
      top: 20,
      borderRadius: 8,
      zIndex: 3
    },
    dropDownText: {
      color: "black",
      fontSize: 18,
      marginHorizontal: 7,
      marginVertical: 6,
      borderColor: "rgb(75,74,74)",
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      textAlign: "center"
    }
  });

  return (
    <View style={[Styles.col_3, { zIndex: -index }]}>
      <TouchableHighlight
        style={Styles.card}
        onPress={() => navigation.navigate("CardsItems", { listName: data.name })}>
        <>
          <MyText style={Styles.title}>{data.name}</MyText>
        </>
      </TouchableHighlight>
    </View>
  );
};

export default Card;
