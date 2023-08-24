import {Theme} from "@react-navigation/native";
import { Colors, DarkColors } from "./colors";


export const CustomDefaultTheme: Theme = {
    dark: false,
    colors: {
        primary: Colors.primary,
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
        primary: DarkColors.primary,
        background: DarkColors.background,
        card: DarkColors.card,
        text: DarkColors.text,
        border: DarkColors.border,
        notification: DarkColors.notification,
    },
};
