import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputScrollView from "react-native-input-scroll-view";
import colours from "../res/colours";

function BottomPopup({ cards, randomIndex }) {
  const [text, setText] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("");

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
      <InputScrollView>
        <TextInput
          allowFontScaling
          disableFullscreenUI
          maxFontSizeMultiplier={5}
          multiline={true}
          numberOfLines={10}
          textAlignVertical="top"
          style={styles.noteInput}
          onChangeText={(e) => setText(e.target)}
          onContentSizeChange={(e) => setTextareaHeight(e.target)}
        />
      </InputScrollView>
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
