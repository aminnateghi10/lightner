import { Keyboard, StyleSheet, TextInput, TextInputProps } from "react-native";

import {useTheme} from "../context/themeContext";

const MyTextInput = (Props: TextInputProps) => {
    const { currentTheme } = useTheme();

    const Styles = StyleSheet.create({
        customText: {
            fontFamily: "Vazir-Medium-FD-WOL",
            color:currentTheme.text
        }
    });

    return (
        <TextInput {...Props} onPressIn={()=> Keyboard.dismiss()}  style={[Styles.customText, Props.style]}/>
    );
};

export default MyTextInput;
