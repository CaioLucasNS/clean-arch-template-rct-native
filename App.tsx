import React from "react";
import { StatusBar } from "react-native";
import { AppNavigator } from "./src/presentation/navigation/AppNavigator";
import { ThemeProvider, useTheme } from "./src/shared/theme/ThemeContext";
import {
  navigationLightTheme,
  navigationDarkTheme,
} from "./src/shared/theme/theme";

const AppContent = () => {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#000000" : "#FFFFFF"}
      />
      <AppNavigator
        theme={isDark ? navigationDarkTheme : navigationLightTheme}
      />
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
