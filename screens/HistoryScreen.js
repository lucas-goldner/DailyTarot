import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
} from "react-native";
import colours from "../res/colours";
import Svg, { Path, Circle } from "react-native-svg";

function HistoryScreen(props) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <View style={styles.background}>
        <TextInput></TextInput>
        {isKeyboardVisible ? (
          <>
            <Text>Hi</Text>
          </>
        ) : (
          <>
            <Text>bye</Text>
          </>
        )}
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
