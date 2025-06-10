import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../shared/theme/ThemeContext";

interface CompletedTask {
  id: string;
  title: string;
  completedAt: Date;
}

const mockData: CompletedTask[] = [
  {
    id: "1",
    title: "Implement navigation",
    completedAt: new Date("2024-03-20T10:30:00"),
  },
  {
    id: "2",
    title: "Design UI components",
    completedAt: new Date("2024-03-20T09:15:00"),
  },
];

const TaskHistoryScreen = () => {
  const { theme } = useTheme();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const renderItem = ({ item }: { item: CompletedTask }) => (
    <View style={[styles.taskCard, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.taskTitle, { color: theme.colors.text }]}>
        {item.title}
      </Text>
      <Text style={[styles.taskDate, { color: theme.colors.onSurfaceVariant }]}>
        {formatDate(item.completedAt)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text
              style={[
                styles.emptyText,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Nenhuma tarefa concluída ainda
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  taskCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  taskDate: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export { TaskHistoryScreen };
