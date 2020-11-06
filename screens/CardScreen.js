import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import colours from "../res/colours";
import Svg, { Path } from "react-native-svg";

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

function CardScreen() {
  const randomIndex = Math.round(Math.random() * 1);
  return (
    <View>
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
          fill="#5E4FA2"
          fill-opacity="1"
        ></Path>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
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
    transform: [{ rotateZ: "180deg" }],
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
    marginTop: "20%",
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
    marginTop: "10%",
    height: "70%",
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
    marginTop: "10%",
    height: "65%",
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
