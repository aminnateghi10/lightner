import { createContext, useContext } from "react";
import { Colors, ColorsDark } from "../constants/colors";
import { useColorScheme } from "react-native";

const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const scheme = useColorScheme();
  const currentTheme = scheme === "dark" ? Colors : ColorsDark;

  return (
    <ThemeContext.Provider value={{ currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  return useContext(ThemeContext);
};
