import {useColorScheme} from 'react-native';

const colors = () => useColorScheme();

const darkMode = colors === 'dark' ? true : false
export const Colors = {
    card: darkMode ? 'rgb(48, 48, 48)' : 'rgb(242, 242, 242)',
    text: darkMode ? 'rgb(235, 235, 235)' : 'rgb(0,0,0)',
    button:'rgb(52,133,251)',
    border: darkMode ? 'rgb(141,130,130)' : 'rgb(141,130,130)',
    primary: darkMode ? 'rgb(10, 132, 255)' : 'rgb(0, 122, 255)',
    background: darkMode ? 'rgb(31, 31, 31)' : 'rgb(255, 255, 255)',
    notification: darkMode ? 'rgb(255, 69, 58)' : 'rgb(255, 59, 48)',
};
