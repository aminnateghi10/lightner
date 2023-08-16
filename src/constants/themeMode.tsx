import {Theme} from "@react-navigation/native";
import {Colors} from "./colors";


export const CustomDefaultTheme: Theme = {
    dark: false,
    colors: {
        primary: 'rgb(0, 122, 255)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(255,255,255)',
        border: 'rgb(216, 216, 216)',
        notification: 'rgb(255, 59, 48)',
    },
};

export const CustomDarkTheme: Theme = {
    dark: true,
    colors: {
        primary: Colors.primary,
        background: Colors.background,
        card: Colors.card,
        text: 'rgb(235, 235, 235)',
        border: 'rgb(141,130,130)',
        notification: 'rgb(255, 69, 58)',
    },
};
