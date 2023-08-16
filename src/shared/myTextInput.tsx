import { StyleSheet, Text, TextInput, TextInputProps } from "react-native";

const MyTextInput = (Props: TextInputProps) => {
    return (
        <TextInput {...Props} style={[Styles.customText, Props.style]}/>
    );
};

export default MyTextInput;

const Styles = StyleSheet.create({
    customText: {
        fontFamily: "Vazir-Medium-FD-WOL",
        // color: 'rgb(0,0,0)'
    }
});
