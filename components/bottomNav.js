import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Text,
  Alert,
} from "react-native";

function BottomNavigator() {
  const toggleOpen = () => {};

  return <View style={styles.botContainer}>I am nav</View>;
}

const styles = StyleSheet.create({
  botContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "grey",
  },
});

export default BottomNavigator;
