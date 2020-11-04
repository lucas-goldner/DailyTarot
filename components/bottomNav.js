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
import colours from "../res/colours";
import colors from "../res/colours";

function BottomNavigator() {
  const toggleOpen = () => {};

  return (
    <View style={styles.botContainer}>
      <View style={styles.btnCircle}>
        <TouchableWithoutFeedback onPress={() => toggleOpen()}>
          <View style={[styles.button, styles.actionBtn]}>
            <Image
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
              source={require("../assets/plusIcon.png")}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.bar}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Alert.alert("click");
            }}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={{
                uri:
                  "http://pluspng.com/img-png/home-icon-png-home-house-icon-image-202-512.png",
              }}
              onPress={() => {
                Alert.alert("");
              }}
            ></Image>
          </TouchableOpacity>
          <Text style={{ justifyContent: "center", alignItems: "center" }}>
            Home
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            marginStart: 85,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Alert.alert("click");
            }}
          >
            <Image
              source={{
                uri:
                  "http://pixsector.com/cache/a1dd5a90/av895b2bd52a42e99ee3c.png",
              }}
              onPress={() => {
                Alert.alert("click");
              }}
              style={{ marginHorizontal: 16, width: 30, height: 30 }}
              containerStyle={{ marginHorizontal: 16 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              color: "black",
            }}
          >
            Menu
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  botContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colours.bg,
  },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  button: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "grey",
    shadowOpacity: 0.1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 0,
    top: 5,
    left: 5,
    shadowOpacity: 5.0,
  },
  actionBtn: {
    backgroundColor: colours.primaryThick,
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  btnCircle: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: colours.bg,
    width: 70,
    height: 70,
    borderRadius: 35,
    bottom: 35,
    zIndex: 10,
  },
  bar: {
    position: "absolute",
    backgroundColor: colours.primaryThick,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    bottom: 0,
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
});

export default BottomNavigator;
