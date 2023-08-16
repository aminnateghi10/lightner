import {StyleSheet, Text, TextProps} from "react-native";

const MyText = (Props: TextProps) => {
    return (
        <Text {...Props} style={[Styles.customText, Props.style]}>{Props.children}</Text>
    );
};

export default MyText;

const Styles = StyleSheet.create({
    customText: {
        fontFamily: "Vazir-Medium-FD-WOL",
    }
});
