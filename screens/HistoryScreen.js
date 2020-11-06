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
import Svg, { Path } from "react-native-svg";

function HistoryScreen(props) {
  return (
    <>
      <View style={styles.background}></View>
      <Svg
        style={styles.bgLayer}
        data-name="BGLayer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 120"
        preserveAspectRatio="none"
      >
        <Path
          d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
          class="shape-fill"
          fill="#bae3f6"
          fill-opacity="1"
        ></Path>
      </Svg>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgLayer: {
    transform: [{ rotateZ: "180deg" }, { scaleX: -1 }],
    borderColor: "black",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30.0,
  },
});

export default HistoryScreen;
