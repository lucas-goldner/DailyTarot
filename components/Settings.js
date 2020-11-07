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
import AccordionItem from "./AccordionItem";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const items = [
  {
    category: "Login / Register",
    subCategories: ["Skincare", "Health", "Eye care"],
    type: "login",
  },
  {
    category: "Import Entries",
    subCategories: ["Fruits ", "Frozen Food", "Bakery"],
    type: "import",
  },
  {
    category: "Export Entries",
    subCategories: ["Skincare", "Nail care", "Perfume"],
    type: "export",
  },
  {
    category: "Language",
    subCategories: ["Toys", "Trolleys", "LEGO®"],
    type: "language",
  },
  {
    category: "Credits",
    subCategories: ["Air purifiers", "hoods & ovens", "Refrigerators"],
    type: "credits",
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
      {items.map(({ category, type }, index) => {
        return (
          <TouchableOpacity
            key={category}
            onPress={() => {
              ref.current.animateNextTransition();
              setCurrentIndex(index === currentIndex ? null : index);
            }}
            style={styles.cardContainer}
            activeOpacity={0.5}
          >
            <View style={styles.card}>
              <Text style={styles.modalTitle}>{category}</Text>
              {index === currentIndex && (
                <View style={styles.subCategoriesList}>
                  <AccordionItem type={type} />
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
