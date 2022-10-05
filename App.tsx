import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { theme } from "./color";

export default function App() {
  const [todoIng, setTodoIng] = useState(true);
  const [targetIng, setTargetIng] = useState(false);
  const [dreamIng, setDreamIng] = useState(false);

  const todo = () => {
    setTodoIng(true);
    setTargetIng(false);
    setDreamIng(false);
  };
  const target = () => {
    setTodoIng(false);
    setTargetIng(true);
    setDreamIng(false);
  };
  const dream = () => {
    setTodoIng(false);
    setTargetIng(false);
    setDreamIng(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={todo}>
          <Text
            style={{
              ...styles.btnText,
              color: todoIng ? theme.white : theme.gray,
            }}
          >
            Todo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={target}>
          <Text
            style={{
              ...styles.btnText,
              color: targetIng ? theme.white : theme.gray,
            }}
          >
            Target
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={dream}>
          <Text
            style={{
              ...styles.btnText,
              color: dreamIng ? theme.white : theme.gray,
            }}
          >
            Dream
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 66,
  },
  btnText: { fontSize: 32, fontWeight: "600" },
});
