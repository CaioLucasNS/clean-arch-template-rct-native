import React from "react";
import {
  NavigationContainer,
  Theme as NavigationTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { TaskHistoryScreen } from "@presentation/screens/TaskHistoryScreen";
import { HomeScreen } from "@presentation/screens/HomeScreen";
import { SettingsScreen } from "@presentation/screens/SettingsScreen";
import { CreateTaskScreen } from "@presentation/screens/CreateTaskScreen";
import { useTheme } from "@shared/theme/ThemeContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface AppNavigatorProps {
  theme: NavigationTheme;
}

const HomeStack = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{
          title: "Nova Task",
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
};

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
          component={HomeStack}
          options={{
            title: "Tasks",
            headerShown: false,
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
