import {StyleSheet, Text, TextProps} from "react-native";

import { useTheme } from "../context/themeContext";

const MyText = (Props: TextProps) => {
    const { currentTheme } = useTheme();

    const Styles = StyleSheet.create({
        customText: {
            fontFamily: "Vazir-Medium-FD-WOL",
            color:currentTheme.text
        }
    });

    return (
        <Text {...Props} style={[Styles.customText, Props.style]}>{Props.children}</Text>
    );
};

export default MyText;
