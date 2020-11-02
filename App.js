import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import { useDimensions } from "@react-native-community/hooks";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.viewOne}></View>
      <View style={styles.viewTwo}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    flexDirection: "row",
  },
  viewOne: {
    backgroundColor: "orange",
    width: "50%",
    height: "10%",
  },
  viewTwo: {
    backgroundColor: "purple",
    width: "50%",
    height: "10%",
  },
});
