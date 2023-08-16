import {Theme} from "@react-navigation/native";


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
        primary: 'rgb(10, 132, 255)',
        background: 'rgb(31, 31, 31)',
        card: 'rgb(18, 18, 18)',
        text: 'rgb(235, 235, 235)',
        border: 'rgb(50, 50, 50)',
        notification: 'rgb(255, 69, 58)',
    },
};
