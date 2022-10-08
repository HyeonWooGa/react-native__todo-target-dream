import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function App() {
  const [category, setCategory] = useState("todo");
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({});

  const todo = () => {
    setCategory("todo");
  };
  const target = () => {
    setCategory("target");
  };
  const dream = () => {
    setCategory("dream");
  };

  const onChangeText = (text: string) => {
    setText(text);
  };

  const addTodo = () => {
    if (text === "") {
      return;
    }
    //const newTodos = Object.assign({}, todos, {[Date.now()]: { text, category }});
    const newTodos = { ...todos, [Date.now()]: { text, category } };
    setTodos(newTodos);
    setText("");
  };
  console.log(todos);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={todo}>
          <Text
            style={{
              ...styles.btnText,
              color: category === "todo" ? "white" : "gray",
            }}
          >
            Todo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={target}>
          <Text
            style={{
              ...styles.btnText,
              color: category === "target" ? "white" : "gray",
            }}
          >
            Target
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={dream}>
          <Text
            style={{
              ...styles.btnText,
              color: category === "dream" ? "white" : "gray",
            }}
          >
            Dream
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder={
            category === "todo"
              ? "Todo for Target"
              : category === "target"
              ? "Target for Dream"
              : "Dream for Life"
          }
          placeholderTextColor="white"
          onChangeText={onChangeText}
          value={text}
          onSubmitEditing={addTodo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 66,
  },
  btnText: { fontSize: 32, fontWeight: "600" },
  input: {
    backgroundColor: "gray",
    color: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 30,
    fontSize: 18,
  },
});
