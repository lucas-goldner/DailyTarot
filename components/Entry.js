import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import colours from "../res/colours";

function Entry({ card, description, imageP5, imageTarot, note }) {
  return (
    <View style={styles.entryItem}>
      <View
        style={{
          flex: 2,
        }}
      >
        <Image source={imageP5} style={styles.entryCard} />
      </View>
      <View>
        <Text style={styles.entryTitle}>{card}</Text>
      </View>
      <View>
        <Text style={{ padding: 10 }}>{description}</Text>
      </View>
      <View>
        <Text style={{ padding: 10 }}>{note}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  entryTitle: {
    alignSelf: "center",
    fontSize: 20,
    color: colours.secondaryThick,
    fontWeight: "bold",
  },
  entryCard: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  entryItem: {
    height: 600,
    width: 290,
    borderColor: colours.secondary,
    marginLeft: 50,
    backgroundColor: colours.bg,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 26.0,
    elevation: 5,
  },
});

export default Entry;
