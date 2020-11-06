import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import colours from "../res/colours";
import Svg, { Path, Circle } from "react-native-svg";

const cards = [
  {
    title: "swords10",
    imageTarot: require("../assets/tarot/swords10.jpg"),
    description:
      "The 10th of the swords cards The 10th of the swords cards The 10th of the swords cards The 10th of the swords cards The 10th of the swords cards The 10th of the swords cards The 10th of the swords cards The 10th of the swords cards",
  },
  {
    title: "swords11",
    imageTarot: require("../assets/tarot/swords11.jpg"),
    description: "The 11th of the swords cards",
  },
];

function HistoryScreen(props) {
  const randomIndex = Math.round(Math.random() * 1);

  return (
    <>
      <View style={styles.background}>
        <Text>Hey</Text>
      </View>
    </>
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
