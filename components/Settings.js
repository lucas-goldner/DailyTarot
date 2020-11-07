import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Transition, Transitioning } from "react-native-reanimated";
import colours from "../res/colours";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const data = [
  {
    bg: "#A8DDE9",
    color: "#3F5B98",
    category: "Healthcare",
    subCategories: ["Skincare", "Health", "Eye care"],
  },
  {
    bg: "#086E4B",
    color: "#FCBE4A",
    category: "Food & Drink",
    subCategories: ["Fruits ", "Frozen Food", "Bakery"],
  },
  {
    bg: "#FECBCA",
    color: "#FD5963",
    category: "Beauty",
    subCategories: ["Skincare", "Nail care", "Perfume"],
  },
  {
    bg: "#193B8C",
    color: "#FECBCD",
    category: "Baby & Kids",
    subCategories: ["Toys", "Trolleys", "LEGO®"],
  },
  {
    bg: "#FDBD50",
    color: "#F5F5EB",
    category: "Homeware",
    subCategories: ["Air purifiers", "hoods & ovens", "Refrigerators"],
  },
];

function SettingsScreen() {
  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = useRef();
  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles.container}
    >
      {data.map(({ bg, color, category, subCategories }, index) => {
        return (
          <TouchableOpacity
            key={category}
            onPress={() => {
              ref.current.animateNextTransition();
              setCurrentIndex(index === currentIndex ? null : index);
            }}
            style={styles.cardContainer}
            activeOpacity={0.9}
          >
            <View style={styles.card}>
              <Text style={styles.modalTitle}>{category}</Text>
              {index === currentIndex && (
                <View style={styles.subCategoriesList}>
                  {subCategories.map((subCategory) => (
                    <Text key={subCategory} style={styles.body}>
                      {subCategory}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  line: {
    borderBottomColor: colours.secondaryThick,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: colours.secondary,
    fontWeight: "bold",
  },
  modalScreen: {
    marginTop: "50%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  cardContainer: {
    height: 100,
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 38,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
  subCategoriesList: {
    marginTop: 10,
  },
});

export default SettingsScreen;
