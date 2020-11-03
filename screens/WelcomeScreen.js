import React from "react";
import { Image, ImageBackground, StyleSheet, View, Text } from "react-native";

function WelcomeScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={{ uri: "https://picsum.photos/1920/1080" }}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/favicon.png")} style={styles.logo} />
        <Text style={styles.title}>Daily Tarot</Text>
      </View>
      <View style={styles.loginButton}></View>
      <View style={styles.registerButton}></View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#fc5c65",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#4ecdc4",
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: "#4ecdc4",
    backgroundColor: "#fc5c65",
    fontSize: 50,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
});

export default WelcomeScreen;
