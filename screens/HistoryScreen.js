import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import colours from "../res/colours";
import Svg, { Path } from "react-native-svg";
import Entry from "../components/Entry";

function HistoryScreen(props) {
  return (
    <View>
      <View style={styles.background}>
        <ScrollView scrollEventThrottle={16}>
          <Text style={styles.historyTitle}>Your Entries</Text>
          <View style={styles.entryList}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Entry />
              <Entry />
              <Entry />
              <Entry />
            </ScrollView>
          </View>
        </ScrollView>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  entryList: {
    marginTop: 20,
    height: 650,
  },
  historyTitle: {
    paddingTop: 50,
    fontSize: 20,
    color: colours.secondaryThick,
    fontWeight: "bold",
    alignSelf: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 100,
    top: 0,
    alignSelf: "center",
    elevation: 100,
    height: "100%",
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
    shadowRadius: 10.0,
  },
});

export default HistoryScreen;
