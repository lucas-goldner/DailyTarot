import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

const cards = [
  {
    title: "swords10",
    image: require("../assets/tarot/swords10.jpg"),
    description: "The 10th of the swords cards",
  },
  {
    title: "swords11",
    image: require("../assets/tarot/swords11.jpg"),
    description: "The 11th of the swords cards",
  },
];

function CardScreen(props) {
  const randomIndex = Math.round(Math.random() * 1);

  return (
    <View style={styles.background}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.card}
          resizeMode="contain"
          source={cards[randomIndex].image}
        />
      </View>
      <Text>{cards[randomIndex].title}</Text>
      <Text>{cards[randomIndex].description}</Text>
      <Text>{randomIndex}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 220,
    height: 400,
  },
  cardContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 1,
  },
  rCard: {
    height: 300,
    width: 300,
    backgroundColor: "black",
  },
});

export default CardScreen;
