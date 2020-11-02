import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export default function App() {
  const handlePress = () => {
    console.log("Pressed on text");
  };
  return (
    <View style={styles.container}>
      <Text onPress={() => handlePress()}>Hello World!</Text>
      <Button title="Click Me"> </Button>
      <Image
        blurRadius={1}
        source={{
          width: 200,
          height: 300,
          uri: "https://picsum.photos/200/300",
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
  },
});
