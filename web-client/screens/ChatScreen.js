import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { AppContext } from "../context/AppContext";

export default function ChatScreen({ navigation }) {
  const { sendMessage, logout } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");

    try {
      const res = await sendMessage(input);
      const aiMsg = { role: "ai", text: res.reply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      alert("Error: " + JSON.stringify(err));
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="View History"
        onPress={() => navigation.navigate("History")}
      />
      <Button title="Logout" onPress={logout} />

      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text style={item.role === "user" ? styles.user : styles.ai}>
            {item.text}
          </Text>
        )}
        style={{ flex: 1 }}
      />

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: 40, paddingBottom: 40 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  user: {
    textAlign: "right",
    backgroundColor: "#d1e7dd",
    padding: 8,
    marginVertical: 2,
    borderRadius: 5,
  },
  ai: {
    textAlign: "left",
    backgroundColor: "#f8d7da",
    padding: 8,
    marginVertical: 2,
    borderRadius: 5,
  },
});
