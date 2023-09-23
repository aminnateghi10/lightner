import { useColorScheme } from "react-native";
import { createContext, useContext } from "react";

import { useAppSelector } from "../store";
import { Colors, DarkColors } from "../constants/colors";
import { CustomDarkTheme, CustomDefaultTheme } from "../constants/themeMode";

const ThemeContext = createContext({});

const ThemeProvider = ({ children }: any) => {
  const scheme = useColorScheme();

  const themeMode = useAppSelector(state => state.theme.mode);
  const currentTheme = themeMode === "auto" ? scheme === "dark" ? DarkColors : Colors : themeMode === "dark" ? DarkColors : Colors;

  return (
    <ThemeContext.Provider value={{ currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = (): any => useContext(ThemeContext);
