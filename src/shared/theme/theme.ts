import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  disabled: string;
  placeholder: string;
  backdrop: string;
  surface: string;
  surfaceVariant: string;
  onSurface: string;
  onSurfaceVariant: string;
};

export type Theme = {
  dark: boolean;
  colors: ThemeColors;
};

const lightColors: ThemeColors = {
  primary: "#A5B4FC", // Pastel Indigo
  secondary: "#C4B5FD", // Pastel Purple
  background: "#F8FAFC", // Very Light Blue-Gray
  card: "#FFFFFF",
  text: "#334155", // Slate 800
  border: "#E2E8F0", // Slate 200
  notification: "#FCA5A5", // Pastel Red
  error: "#FCA5A5", // Pastel Red
  success: "#86EFAC", // Pastel Green
  warning: "#FCD34D", // Pastel Yellow
  info: "#A5B4FC", // Pastel Indigo
  disabled: "#CBD5E1", // Slate 300
  placeholder: "#94A3B8", // Slate 400
  backdrop: "rgba(148, 163, 184, 0.5)", // Slate 400 with opacity
  surface: "#FFFFFF",
  surfaceVariant: "#F1F5F9", // Slate 100
  onSurface: "#334155", // Slate 800
  onSurfaceVariant: "#64748B", // Slate 500
};

const darkColors: ThemeColors = {
  primary: "#818CF8", // Indigo 400
  secondary: "#A78BFA", // Purple 400
  background: "#0F172A", // Slate 900
  card: "#1E293B", // Slate 800
  text: "#F1F5F9", // Slate 100
  border: "#334155", // Slate 700
  notification: "#FB7185", // Rose 400
  error: "#FB7185", // Rose 400
  success: "#4ADE80", // Green 400
  warning: "#FBBF24", // Amber 400
  info: "#818CF8", // Indigo 400
  disabled: "#475569", // Slate 600
  placeholder: "#64748B", // Slate 500
  backdrop: "rgba(15, 23, 42, 0.5)", // Slate 900 with opacity
  surface: "#1E293B", // Slate 800
  surfaceVariant: "#334155", // Slate 700
  onSurface: "#F1F5F9", // Slate 100
  onSurfaceVariant: "#CBD5E1", // Slate 300
};

export const lightTheme: Theme = {
  dark: false,
  colors: lightColors,
};

export const darkTheme: Theme = {
  dark: true,
  colors: darkColors,
};

// Navigation theme customization
export const navigationLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: lightColors.primary,
    background: lightColors.background,
    card: lightColors.card,
    text: lightColors.text,
    border: lightColors.border,
    notification: lightColors.notification,
  },
};

export const navigationDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: darkColors.primary,
    background: darkColors.background,
    card: darkColors.card,
    text: darkColors.text,
    border: darkColors.border,
    notification: darkColors.notification,
  },
};
