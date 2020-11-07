import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

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
    marginTop: 10,
  },
  {
    category: "Import Entries",
    subCategories: ["Fruits ", "Frozen Food", "Bakery"],
    type: "import",
    marginTop: 10,
  },
  {
    category: "Export Entries",
    subCategories: ["Skincare", "Nail care", "Perfume"],
    type: "export",
    marginTop: 10,
  },
  {
    category: "Change Theme",
    subCategories: ["Skincare", "Nail care", "Perfume"],
    type: "theme",
    marginTop: 10,
  },
  {
    category: "Credits",
    subCategories: ["Air purifiers", "hoods & ovens", "Refrigerators"],
    type: "credits",
    marginTop: 10,
  },
];

function SettingsScreen() {
  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = useRef();
  return (
    <ScrollView showsVerticalScrollIndicator={true} style={{ width: "100%" }}>
      <Transitioning.View
        ref={ref}
        transition={transition}
        style={styles.container}
      >
        {items.map(({ category, type, marginTop }, index) => {
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
                  <View
                    style={{
                      ...styles.subCategoriesList,
                      marginTop: marginTop,
                    }}
                  >
                    <AccordionItem type={type} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </Transitioning.View>
    </ScrollView>
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
    marginTop: 50,
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  cardContainer: {
    height: 200,
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
