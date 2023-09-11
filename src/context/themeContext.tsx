import { useColorScheme } from "react-native";
import { createContext, useContext } from "react";

import { Colors, DarkColors } from "../constants/colors";

const ThemeContext = createContext({});

const ThemeProvider = ({ children }:any) => {
  const scheme = useColorScheme();
  const currentTheme = scheme === "dark" ? DarkColors : Colors;

  return (
    <ThemeContext.Provider value={{ currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme =():any=> useContext(ThemeContext);
