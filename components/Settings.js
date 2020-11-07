import React from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colours from "../res/colours";

function SettingsScreen() {
  return (
    <View style={styles.modalScreen}>
      <Text style={styles.modalTitle}>Login / Register</Text>
      <View style={styles.line} />
      <Text style={styles.modalTitle}>Import Entries</Text>
      <View style={styles.line} />
      <Text style={styles.modalTitle}>Export Entries</Text>
      <View style={styles.line} />
      <Text style={styles.modalTitle}>Language</Text>
      <View style={styles.line} />
      <Text style={styles.modalTitle}>Credits</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    borderBottomColor: colours.secondaryThick,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: colours.secondary,
    fontWeight: "bold",
  },
  modalScreen: {
    marginTop: "50%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
