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

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: "grey" }}>
      <View style={styles.botContainer}>
        <TouchableWithoutFeedback onPress={() => toggleOpen()}>
          <View>
            <Image
              style={styles.button}
              resizeMode="contain"
              source={require("../assets/plusIcon.png")}
            ></Image>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  botContainer: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "grey",
    width: 70,
    height: 70,
    borderRadius: 35,
    bottom: 35,
    zIndex: 10,
  },
  button: {
    width: 60,
    height: 60,
    alignSelf: "center",
  },
});

export default BottomNavigator;
