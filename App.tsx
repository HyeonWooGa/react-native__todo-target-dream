import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";

interface todos {
  [key: string]: todo;
}

interface todo {
  text: text;
  category: category;
  complete?: Boolean;
  isUpdating?: Boolean;
}

type category = string;
type text = string;
type id = string;

const STORAGE_KEY = "@todos";

export default function App() {
  const [category, setCategory] = useState<category>("todo");
  const [text, setText] = useState<text>("");
  const [textUpdate, setTextUpdate] = useState<text>("");
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

  const onChangeTextUpdate = (textUpdate: text) => {
    setTextUpdate(textUpdate);
  };

  const saveTodos = async (newTodos: todos) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodos = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json !== null) {
        const obj = JSON.parse(json);
        setTodos(obj);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    if (text === "") {
      return;
    }
    //const newTodos = Object.assign({}, todos, {[Date.now()]: { text, category }});
    const newTodos: todos = { ...todos, [Date.now()]: { text, category } };
    setTodos(newTodos);
    await saveTodos(newTodos);
    setText("");
  };

  const deleteTodo = async (id: id) => {
    Alert.alert("항목 삭제", "정말 삭제하시겠습니까?", [
      { text: "취소" },
      {
        text: "삭제",
        onPress: async () => {
          const newTodos = { ...todos };
          delete newTodos[id];
          setTodos(newTodos);
          await saveTodos(newTodos);
        },
        style: "destructive",
      },
    ]);
  };

  const onTextPress = (id: id) => {
    Alert.alert("항목 수정/완료", "수정 혹은 완료 하시겠습니까?", [
      { text: "취소" },
      { text: "수정", onPress: async () => updateTodo(id) },
      { text: "완료", onPress: () => completeTodo(id) },
    ]);
  };

  const cancelUpdate = async (id: id) => {
    const newTodos = { ...todos };
    newTodos[id].isUpdating = false;
    setTextUpdate("");
    setTodos(newTodos);
    await saveTodos(newTodos);
  };

  const updateTodo = async (id: id) => {
    const newTodos = { ...todos };
    newTodos[id].isUpdating = true;
    setTextUpdate(newTodos[id].text);
    setTodos(newTodos);
    await saveTodos(newTodos);
  };

  const updateTodoSubmit = async (id: id) => {
    if (textUpdate === "") {
      return;
    }
    const newTodos = { ...todos };
    newTodos[id].text = textUpdate;
    newTodos[id].isUpdating = false;
    setTextUpdate("");
    setTodos(newTodos);
    await saveTodos(newTodos);
  };

  const completeTodo = (id: id) => {
    Alert.alert("항목 완료", "정말 완료하셨습니까?", [
      {
        text: "아직",
        onPress: async () => {
          const newTodos = { ...todos };
          newTodos[id].complete = false;
          setTodos(newTodos);
          await saveTodos(newTodos);
        },
      },
      {
        text: "완료",
        onPress: async () => {
          const newTodos = { ...todos };
          newTodos[id].complete = true;
          setTodos(newTodos);
          await saveTodos(newTodos);
        },
      },
    ]);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Pressable
          onPress={todo}
          style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1.0 }]}
        >
          <Text
            style={{
              ...styles.btnText,
              color: category === "todo" ? "white" : "gray",
            }}
          >
            Todo
          </Text>
        </Pressable>
        <Pressable
          onPress={target}
          style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1.0 }]}
        >
          <Text
            style={{
              ...styles.btnText,
              color: category === "target" ? "white" : "gray",
            }}
          >
            Target
          </Text>
        </Pressable>
        <Pressable
          onPress={dream}
          style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1.0 }]}
        >
          <Text
            style={{
              ...styles.btnText,
              color: category === "dream" ? "white" : "gray",
            }}
          >
            Dream
          </Text>
        </Pressable>
      </View>
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
            <View key={key}>
              <View
                style={
                  todos[key].complete ? styles.completeView : styles.todoView
                }
              >
                <Pressable
                  onPress={() => onTextPress(key)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1.0 }]}
                >
                  <Text style={styles.todoText}>{`${todos[key].text}`}</Text>
                </Pressable>
                <Pressable
                  onPress={() => deleteTodo(key)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1.0 }]}
                >
                  <Fontisto
                    name="trash"
                    size={24}
                    color={todos[key].complete ? "black" : "gray"}
                  />
                </Pressable>
              </View>
              {todos[key].isUpdating ? (
                <View style={styles.updateView}>
                  <TextInput
                    style={styles.inputUpdate}
                    placeholder={`Update ${todos[key].category}`}
                    placeholderTextColor="white"
                    value={textUpdate}
                    onChangeText={onChangeTextUpdate}
                    onSubmitEditing={async () => updateTodoSubmit(key)}
                  />
                  <Pressable
                    onPress={() => cancelUpdate(key)}
                    style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1.0 }]}
                  >
                    <Fontisto name="close-a" size={18} color="white" />
                  </Pressable>
                </View>
              ) : null}
            </View>
          ) : null
        )}
      </ScrollView>
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
  inputUpdate: {
    backgroundColor: "gray",
    color: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 5,
    fontSize: 18,
  },
  todoView: {
    marginVertical: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#355764",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  completeView: {
    marginVertical: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "gray",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoText: { color: "white", fontSize: 18, fontWeight: "500" },
  updateView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
