import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function BottomPopup({ cards, randomIndex }) {
  return (
    <View style={styles.modalScreen}>
      <View style={styles.cardContainer}>
        <Text>hey</Text>
        <Text>hey</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalScreen: {
    flex: 1,
    width: "100%",
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
  },
});

export default BottomPopup;
