import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import colours from "../res/colours";

function BottomPopup({ cards, randomIndex }) {
  return (
    <View style={styles.modalScreen}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.imgCard}
          resizeMode="contain"
          source={cards[randomIndex].imageTarot}
        />
        <View style={styles.cardInfo}>
          <Text style={styles.modalTitle}>{cards[randomIndex].title}</Text>
          <Text>{cards[randomIndex].description}</Text>
        </View>
      </View>
      <TextInput
        allowFontScaling
        disableFullscreenUI
        maxFontSizeMultiplier={5}
        multiline={true}
        textAlignVertical="top"
        style={styles.noteInput}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 20,
    color: colours.secondaryThick,
    fontWeight: "bold",
  },
  cardInfo: {
    marginStart: 5,
  },
  imgCard: {
    height: 200,
    width: 80,
  },
  modalScreen: {
    width: "100%",
  },
  cardContainer: {
    marginTop: 10,
    marginStart: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "center",
    alignItems: "center",
  },
  noteInput: {
    borderColor: colours.secondary,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
});

export default BottomPopup;
