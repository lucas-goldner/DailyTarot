import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import colours from "../res/colours";

const cards = [
  {
    title: "swords10",
    imageTarot: require("../assets/tarot/swords10.jpg"),
    description:
      "The 10th of the swords cards The 10th of the swords cards The 10th of the swords cards The 10th of the swords cards The 10th of the swords cards The 10th of the swords cards The 10th of the swords cards The 10th of the swords cards",
  },
  {
    title: "swords11",
    imageTarot: require("../assets/tarot/swords11.jpg"),
    description: "The 11th of the swords cards",
  },
];

function CardScreen(props) {
  const randomIndex = Math.round(Math.random() * 1);

  return (
    <View style={styles.background}>
      <View style={styles.Card}>
        <Image
          style={styles.imgCard}
          resizeMode="contain"
          source={cards[randomIndex].imageTarot}
        ></Image>
        <Text adjustsFontSizeToFit style={styles.cardTitle}>
          {cards[randomIndex].title}
        </Text>
        <Text
          adjustsFontSizeToFit
          numberOfLines={5}
          style={styles.cardDescription}
        >
          {cards[randomIndex].description}
        </Text>
      </View>
      <View style={styles.Card2}></View>
      <View style={styles.Card3}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDescription: {
    marginStart: 10,
  },
  cardTitle: {
    fontSize: 20,
    color: colours.secondaryThick,
    fontWeight: "bold",
  },
  imgCard: {
    height: 450,
    width: "70%",
  },
  Card: {
    height: "75%",
    backgroundColor: colours.bg,
    width: 350,
    borderColor: "black",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 26.0,
    elevation: 10,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  Card2: {
    height: "75%",
    backgroundColor: colours.primary,
    width: 325,
    borderRadius: 20,
    position: "absolute",
    top: 80,
    zIndex: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 26.0,
    elevation: 5,
  },
  Card3: {
    height: "75%",
    backgroundColor: colours.primaryThick,
    width: 300,
    borderRadius: 20,
    position: "absolute",
    top: 65,
    zIndex: -10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 26.0,
    elevation: 1,
  },
});

export default CardScreen;
