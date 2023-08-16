import {Theme} from "@react-navigation/native";
import {Colors} from "./colors";


export const CustomDefaultTheme: Theme = {
    dark: false,
    colors: {
        primary: 'rgb(0, 122, 255)',
        background: Colors.background,
        card: Colors.card,
        text: Colors.text,
        border:Colors.border,
        notification: Colors.notification,
    },
};

export const CustomDarkTheme: Theme = {
    dark: true,
    colors: {
        primary: Colors.primary,
        background: Colors.background,
        card: Colors.card,
        text: Colors.text,
        border: Colors.border,
        notification: Colors.notification,
    },
};
