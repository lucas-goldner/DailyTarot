import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import colours from "../res/colours";

function Entry() {
  return (
    <View style={styles.entryItem}>
      <View
        style={{
          flex: 2,
        }}
      >
        <Image
          source={require("../assets/p5/major00.jpg")}
          style={styles.entryCard}
        />
      </View>
      <View style={{ flex: 1, paddingTop: 10 }}>
        <Text style={styles.entryTitle}>Pic One</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  entryTitle: {
    alignSelf: "center",
  },
  entryCard: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  entryItem: {
    height: 130,
    width: 130,
    borderWidth: 0.5,
    borderColor: colours.secondary,
    marginLeft: 10,
  },
  entryList: {
    height: 130,
    marginTop: 20,
  },
});

export default Entry;
