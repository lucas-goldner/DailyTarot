import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputScrollView from "react-native-input-scroll-view";
import colours from "../res/colours";
import * as firebaseRN from "firebase";
import "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

function BottomPopup({
  cards,
  randomIndex,
  setModalVisible,
  loggedIn,
  setEntriesData,
  entriesData,
  persona,
}) {
  const [text, setText] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("");

  const handleDataPush = () => {
    const user = firebaseRN.auth().currentUser.uid;
    const db = firebaseRN.firestore();
    const firebase = require("firebase");
    // Required for side-effects
    require("firebase/firestore");
    db.collection(user)
      .add({
        UID: user,
        card: cards[randomIndex].title,
        imageTarot: cards[randomIndex].imageTarot,
        imageP5: cards[randomIndex].imageP5,
        description: cards[randomIndex].description,
        note: text,
        timestamp: new Date(),
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  const addData = async () => {
    const storageKey =
      "DToffline" +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const data = {
      card: cards[randomIndex].title,
      imageTarot: cards[randomIndex].imageTarot,
      imageP5: cards[randomIndex].imageP5,
      description: cards[randomIndex].description,
      note: text,
      timestamp: ("" + new Date()).slice(0, 21),
    };
    const dataValue = JSON.stringify(data);
    await AsyncStorage.setItem(storageKey, dataValue).then(
      setEntriesData((oldEntries) => [...oldEntries, data])
    );
  };

  return (
    <View style={styles.modalScreen}>
      <View style={styles.topbar}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          color={colours.secondaryThick}
          onPress={() => setModalVisible(false)}
        />
        <Text style={styles.modalTitle}>Create Entry</Text>
        <MaterialCommunityIcons
          name="content-save"
          size={30}
          color={colours.secondaryThick}
          onPress={() => {
            {
              loggedIn
                ? (handleDataPush(),
                  Alert.alert("Publishing Entry"),
                  setModalVisible(false))
                : addData(),
                (Alert.alert("Saved Entry"), setModalVisible(false));
            }
          }}
        />
      </View>
      <View style={styles.cardContainer}>
        <Image
          style={styles.imgCard}
          resizeMode="contain"
          source={
            persona ? cards[randomIndex].imageTarot : cards[randomIndex].imageP5
          }
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
          autoFocus
          value={text}
          numberOfLines={10}
          textAlignVertical="top"
          style={styles.noteInput}
          onChangeText={(value) => setText(value)}
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
  topbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "baseline",
  },
});

export default BottomPopup;
