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
        <View>
          <Text style={styles.title}>Daily Tarot</Text>
        </View>
      </View>
      <View style={styles.loginButton}>
        <Text style={styles.loginTitle}>Login</Text>
      </View>
      <View style={styles.registerButton}>
        <Text style={styles.registerTitle}>Register</Text>
      </View>
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
    alignItems: "center",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#4ecdc4",
    alignItems: "center",
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
    width: "100%",
  },
  loginTitle: {
    marginTop: 15,
    fontSize: 30,
    color: "whitesmoke",
  },
  registerTitle: {
    marginTop: 15,
    fontSize: 30,
    color: "whitesmoke",
  },
});

export default WelcomeScreen;
