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
      <View>
        <Text style={styles.entryTitle}>Pic One</Text>
      </View>
      <View>
        <Text style={{ padding: 10 }}>
          DescrDescrDescrDescrDescrDesscrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescr
          DescrDescrDescrDescrDescrDesscrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescr
          DescrDescrDescrDescrDescrDesscrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescrDescr
        </Text>
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
    borderColor: "black",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 26.0,
    elevation: 10,
  },
});

export default Entry;
