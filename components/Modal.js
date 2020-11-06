import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function BottomPopup() {
  return (
    <View style={styles.modalScreen}>
      <View style={styles.topbar}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        <Text>Create Post</Text>
        <MaterialCommunityIcons name="content-save" size={24} color="black" />
      </View>
      <View>
        <Text>hey</Text>
        <Text>hey</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalScreen: {
    alignItems: "center",
  },
  topbar: {
    display: "flex",
    flexDirection: "row",
  },
});

export default BottomPopup;
