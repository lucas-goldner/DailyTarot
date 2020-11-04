import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import { useDimensions } from "@react-native-community/hooks";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return <HomeScreen />;
}

const styles = StyleSheet.create({});
