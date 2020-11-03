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

export default function App() {
  return <WelcomeScreen />;
}

const styles = StyleSheet.create({});
