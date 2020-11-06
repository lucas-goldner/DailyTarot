import React from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colours from "../res/colours";

function SettingsScreen() {
  return (
    <View style={styles.modalScreen}>
      <Text>These are a lot of settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 20,
    color: colours.secondaryThick,
    fontWeight: "bold",
  },
  modalScreen: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
