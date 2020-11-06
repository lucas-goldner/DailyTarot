import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colours from "./res/colours";
import CardScreen from "./screens/CardScreen";
import HistoryScreen from "./screens/HistoryScreen";

const Tab = createMaterialBottomTabNavigator();

const cards = [
  {
    title: "The Fool",
    imageTarot: require("./assets/tarot/major00.jpg"),
    description:
      "The Fool also represents the complete faith that life is good and worthy of trust. In readings, the Fool can signal a new beginning or change of direction - one that will guide you onto a path of adventure, wonder and personal growth.",
  },
  {
    title: "The Magician",
    imageTarot: require("./assets/tarot/major01.jpg"),
    description:
      "The Magician is the archetype of the active, masculine principle - the ultimate achiever. He symbolizes the power to tap universal forces and use them for creative purposes. He is not afraid to act and believes in himself.",
  },
];

export default function App() {
  const [actionColourChange, setActionColourChange] = useState(false);
  const randomIndex = Math.round(Math.random() * 1);
  const toggleOpen = () => {};
  const setActionColourChangeToTrue = () => {
    setActionColourChange(true);
  };
  const setActionColourChangeToFalse = () => {
    setActionColourChange(false);
  };

  const actnButStyle = StyleSheet.create({
    actBtn: {
      backgroundColor: !actionColourChange
        ? colours.secondaryThick
        : colours.primaryThick,
      textShadowOffset: { width: 5, height: 5 },
      textShadowRadius: 10,
      borderWidth: 0,
      borderColor: colours.bg,
    },
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Card"
        shifting={true}
        activeColor={colours.bg}
        labelStyle={{ fontSize: 12 }}
      >
        <Tab.Screen
          name="Card"
          children={() => (
            <CardScreen cards={cards} randomIndex={randomIndex} />
          )}
          listeners={() => setActionColourChangeToFalse()}
          options={{
            tabBarLabel: "Card",
            tabBarColor: colours.primaryThick,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cards" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          listeners={() => setActionColourChangeToTrue()}
          options={{
            tabBarLabel: "History",
            tabBarColor: colours.secondaryThick,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="book-open-variant"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <View style={styles.btnCircle}>
        <View style={[styles.button, actnButStyle.actBtn]}>
          <TouchableOpacity onPress={() => toggleOpen()}>
            <Image
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
              source={require("./assets/plusIcon.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colours.bg,
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
  btnCircle: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: colours.bg,
    width: 70,
    height: 70,
    borderRadius: 35,
    bottom: 10,
    zIndex: 10,
  },
});
