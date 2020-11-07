import React from "react";
import { StyleSheet, View, Text } from "react-native";

function AccordionItem({ type }) {
  return (
    <View>
      {type == "language" ? <Text>Language</Text> : <Text>Not Language</Text>}
    </View>
  );
}

const styles = StyleSheet.create({});

export default AccordionItem;
