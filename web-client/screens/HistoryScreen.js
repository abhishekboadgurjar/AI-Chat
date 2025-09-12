import React, { useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { AppContext } from "../context/AppContext";

export default function HistoryScreen() {
  const { history, getHistory } = useContext(AppContext);

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat History</Text>
      <FlatList
        data={history}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text style={item.role === "user" ? styles.user : styles.ai}>
            {item.text}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  user: {
    textAlign: "right",
    backgroundColor: "#cce5ff",
    padding: 8,
    marginVertical: 2,
    borderRadius: 5,
  },
  ai: {
    textAlign: "left",
    backgroundColor: "#fff3cd",
    padding: 8,
    marginVertical: 2,
    borderRadius: 5,
  },
});
