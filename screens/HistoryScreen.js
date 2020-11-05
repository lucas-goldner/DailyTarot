import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import colours from "../res/colours";

function HistoryScreen() {
  return (
    <View style={styles.background}>
      <Image source={require("../assets/curve.svg")} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HistoryScreen;
