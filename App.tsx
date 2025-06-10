import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { TodoListScreen } from "./src/presentation/screens/TodoListScreen";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <TodoListScreen />
    </SafeAreaView>
  );
}
