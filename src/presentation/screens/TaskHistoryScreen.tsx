import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme/ThemeContext";
import { Task } from "@core/models/Task";
import { TaskService } from "@core/services/TaskService";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const TaskHistoryScreen = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const allTasks = await TaskService.getTasks();
    setTasks(allTasks.filter((task) => task.isCompleted));
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, []),
  );

  const handleDeleteTask = async (taskId: string) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta task?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await TaskService.deleteTask(taskId);
              loadTasks();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir a task");
            }
          },
        },
      ],
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={[styles.taskCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, { color: theme.colors.text }]}>
          {item.title}
        </Text>
        {item.description && (
          <Text
            style={[
              styles.taskDescription,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            {item.description}
          </Text>
        )}
        <Text
          style={[styles.taskDate, { color: theme.colors.onSurfaceVariant }]}
        >
          Concluída em: {formatDate(item.completedAt!)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTask(item.id)}
      >
        <Ionicons name="trash-outline" size={24} color={theme.colors.error} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        data={tasks}
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
    flexDirection: "row",
    alignItems: "center",
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
  taskInfo: {
    flex: 1,
    marginRight: 16,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  taskDate: {
    fontSize: 12,
  },
  deleteButton: {
    padding: 8,
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
