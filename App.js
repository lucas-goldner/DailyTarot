import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";

export default function App() {
  const handlePress = () => {
    console.log("Pressed on text");
  };
  return (
    <View style={styles.container}>
      <Text onPress={() => handlePress()}>Hello World!</Text>
      <Button
        title="Click Me"
        color="orange"
        onPress={() =>
          Alert.alert("My little title", "Twilight", [
            { text: "Yes", onPress: () => console.log("Yes") },
            { text: "No", onPress: () => console.log("No") },
          ])
        }
      />
      <Button
        title="Click Me Too"
        color="purple"
        onPress={() => Alert.prompt("Pony", "Hey", (text) => console.log(text))}
      />
      <TouchableOpacity onPress={() => console.log("Image pressed")}>
        <Image
          blurRadius={1}
          fadeDuration={1000}
          resizeMode="center"
          source={{
            width: 200,
            height: 300,
            uri: "https://picsum.photos/200/300",
          }}
        />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === "android" ? "#D9F9D9" : "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
  },
});
