import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

interface todos {
  [key: string]: todo;
}

interface todo {
  text: text;
  category: category;
}

type category = string;
type text = string;

export default function App() {
  const [category, setCategory] = useState<category>("todo");
  const [text, setText] = useState<text>("");
  const [todos, setTodos] = useState<todos>({});

  const todo = () => {
    setCategory("todo");
  };
  const target = () => {
    setCategory("target");
  };
  const dream = () => {
    setCategory("dream");
  };

  const onChangeText = (text: text) => {
    setText(text);
  };

  const addTodo = () => {
    if (text === "") {
      return;
    }
    //const newTodos = Object.assign({}, todos, {[Date.now()]: { text, category }});
    const newTodos: todos = { ...todos, [Date.now()]: { text, category } };
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
        <ScrollView>
          {Object.keys(todos).map((key) =>
            todos[key].category === category ? (
              <View style={styles.todoView} key={key}>
                <Text style={styles.todoText}>{`${todos[key].text}`}</Text>
              </View>
            ) : null
          )}
        </ScrollView>
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
    marginVertical: 30,
    fontSize: 18,
  },
  todoView: {
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#355764",
    borderRadius: 15,
  },
  todoText: { color: "white", fontSize: 18, fontWeight: "500" },
});
