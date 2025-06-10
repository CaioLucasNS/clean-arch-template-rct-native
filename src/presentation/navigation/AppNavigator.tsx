import React from "react";
import {
  NavigationContainer,
  Theme as NavigationTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TaskHistoryScreen } from "../screens/TaskHistoryScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { useTheme } from "../../shared/theme/ThemeContext";

const Tab = createBottomTabNavigator();

interface AppNavigatorProps {
  theme: NavigationTheme;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({ theme }) => {
  const { theme: appTheme } = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "History") {
              iconName = focused ? "time" : "time-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: appTheme.colors.primary,
          tabBarInactiveTintColor: appTheme.colors.disabled,
          headerStyle: {
            backgroundColor: appTheme.colors.card,
          },
          headerTintColor: appTheme.colors.text,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarStyle: {
            backgroundColor: appTheme.colors.card,
            borderTopColor: appTheme.colors.border,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Tasks",
          }}
        />
        <Tab.Screen
          name="History"
          component={TaskHistoryScreen}
          options={{
            title: "Task History",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Configurações",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
