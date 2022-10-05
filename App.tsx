import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { theme } from "./color";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.btnText}>Target</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.btnText}>Dream</Text>
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
    marginTop: 100,
  },
  btnText: { color: "white", fontSize: 32, fontWeight: "600" },
});
