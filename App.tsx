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
  const [category, setCategory] = useState({
    todo: true,
    target: false,
    dream: false,
  });
  const [text, setText] = useState("");

  const todo = () => {
    setCategory({ todo: true, target: false, dream: false });
  };
  const target = () => {
    setCategory({ todo: false, target: true, dream: false });
  };
  const dream = () => {
    setCategory({ todo: false, target: false, dream: true });
  };

  const onChangeText = (text: string) => {
    setText(text);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={todo}>
          <Text
            style={{
              ...styles.btnText,
              color: category.todo ? "white" : "gray",
            }}
          >
            Todo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={target}>
          <Text
            style={{
              ...styles.btnText,
              color: category.target ? "white" : "gray",
            }}
          >
            Target
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={dream}>
          <Text
            style={{
              ...styles.btnText,
              color: category.dream ? "white" : "gray",
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
            category.todo
              ? "Todo for Target"
              : category.target
              ? "Target for Dream"
              : "Dream for Life"
          }
          placeholderTextColor="white"
          onChangeText={onChangeText}
          value={text}
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
