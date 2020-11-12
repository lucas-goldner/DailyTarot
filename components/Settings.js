import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
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

const Androiditems = [
  {
    category: "Login / Register",
    type: "login",
    marginTop: 10,
  },
  {
    category: "Import Entries",
    type: "import android",
    marginTop: 10,
  },
  {
    category: "Export Entries",
    type: "export",
    marginTop: 10,
  },
  {
    category: "Reset Entries",
    type: "reset",
    marginTop: 10,
  },
  {
    category: "Change Theme",
    type: "theme",
    marginTop: 10,
  },
  {
    category: "Credits",
    type: "credits",
    marginTop: 10,
  },
];

const IOSItem = [
  {
    category: "Login / Register",
    type: "login",
    marginTop: 10,
  },
  {
    category: "Import Entries",
    type: "import ios",
    marginTop: 10,
  },
  {
    category: "Reset Entries",
    type: "reset",
    marginTop: 10,
  },
  {
    category: "Change Theme",
    type: "theme",
    marginTop: 10,
  },
  {
    category: "Credits",
    type: "credits",
    marginTop: 10,
  },
];

function SettingsScreen({
  isLoggedIn,
  entriesData,
  setEntriesData,
  persona,
  setPersona,
}) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = useRef();
  return (
    <ScrollView showsVerticalScrollIndicator={true} style={{ width: "100%" }}>
      <Transitioning.View
        ref={ref}
        transition={transition}
        style={styles.container}
      >
        {Platform.OS === "android" ? (
          Androiditems.map(({ category, type, marginTop }, index) => {
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
                      <AccordionItem
                        type={type}
                        isLoggedIn={isLoggedIn}
                        entriesData={entriesData}
                        setEntriesData={setEntriesData}
                        persona={persona}
                        setPersona={setPersona}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })
        ) : Platform.OS === "ios" ? (
          IOSItem.map(({ category, type, marginTop }, index) => {
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
                      <AccordionItem
                        type={type}
                        isLoggedIn={isLoggedIn}
                        entriesData={entriesData}
                        setEntriesData={setEntriesData}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <> </>
        )}
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
