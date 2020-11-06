import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colours from "./res/colours";
import CardScreen from "./screens/CardScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ModalScreen from "./components/Modal";

const Tab = createMaterialBottomTabNavigator();

const cards = [
  {
    title: "The Fool",
    imageTarot: require("./assets/tarot/major00.jpg"),
    description:
      "The Fool also represents the complete faith that life is good and worthy of trust. In readings, the Fool can signal a new beginning or change of direction - one that will guide you onto a path of adventure, wonder and personal growth.",
  },
  {
    title: "The Magician",
    imageTarot: require("./assets/tarot/major01.jpg"),
    description:
      "The Magician is the archetype of the active, masculine principle - the ultimate achiever. He symbolizes the power to tap universal forces and use them for creative purposes. He is not afraid to act and believes in himself.",
  },
];

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionColourChange, setActionColourChange] = useState(false);
  const randomIndex = Math.round(Math.random() * 1);
  const togglePost = () => {};
  const setActionColourChangeToTrue = () => {
    setActionColourChange(true);
  };
  const setActionColourChangeToFalse = () => {
    setActionColourChange(false);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Card"
        shifting={true}
        activeColor={colours.bg}
        labelStyle={{ fontSize: 12 }}
      >
        <Tab.Screen
          name="Card"
          children={() => (
            <CardScreen cards={cards} randomIndex={randomIndex} />
          )}
          listeners={() => setActionColourChangeToFalse()}
          options={{
            tabBarLabel: "Card",
            tabBarColor: colours.primaryThick,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cards" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          listeners={() => setActionColourChangeToTrue()}
          options={{
            tabBarLabel: "History",
            tabBarColor: colours.secondaryThick,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="book-open-variant"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <View style={styles.btnCircle}>
        <View
          style={{
            ...styles.button,
            ...styles.actBtn,
            backgroundColor: !actionColourChange
              ? colours.secondaryThick
              : colours.primaryThick,
          }}
        >
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
              source={require("./assets/plusIcon.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={{
              ...styles.modalBG,
              backgroundColor: actionColourChange
                ? colours.primary
                : colours.secondary,
            }}
          ></View>
          <View style={styles.modalView}>
            <View style={styles.topbar}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={30}
                color={colours.secondaryThick}
                onPress={() => setModalVisible(false)}
              />
              <Text style={styles.modalTitle}>Create Entry</Text>
              <MaterialCommunityIcons
                name="content-save"
                size={30}
                color={colours.secondaryThick}
                onPress={() => Alert.alert("Saved Entry")}
              />
            </View>
            <ModalScreen cards={cards} randomIndex={randomIndex} />
          </View>
        </Modal>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  actBtn: {
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    borderWidth: 0,
    borderColor: colours.bg,
  },
  modalBG: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: colours.secondary,
    elevation: 1,
  },
  modalTitle: {
    fontSize: 20,
    color: colours.secondaryThick,
    fontWeight: "bold",
  },
  topbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "baseline",
  },
  modalView: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colours.bg,
    shadowOpacity: 0.1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 0,
    top: 5,
    left: 5,
    shadowOpacity: 5.0,
  },
  btnCircle: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: colours.bg,
    width: 70,
    height: 70,
    borderRadius: 35,
    bottom: 10,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 20,
    color: colours.secondaryThick,
    fontWeight: "bold",
  },
});
