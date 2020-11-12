import React, { useState, useEffect } from "react";
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
import SettingsScreen from "./components/Settings";
import firebase from "./res/ApiKey";
import * as firebaseRN from "firebase";
import { LogBox } from "react-native";
import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";

LogBox.ignoreLogs(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const Tab = createMaterialBottomTabNavigator();

const cards = [
  {
    title: "The Fool",
    imageTarot: require("./assets/tarot/major00.jpg"),
    imageP5: require("./assets/p5/major00.jpg"),
    description:
      "The Fool also represents the complete faith that life is good and worthy of trust. In readings, the Fool can signal a new beginning or change of direction - one that will guide you onto a path of adventure, wonder and personal growth.",
  },
  {
    title: "The Magician",
    imageTarot: require("./assets/tarot/major01.jpg"),
    imageP5: require("./assets/p5/major01.jpg"),
    description:
      "The Magician is the archetype of the active, masculine principle - the ultimate achiever. He symbolizes the power to tap universal forces and use them for creative purposes. He is not afraid to act and believes in himself.",
  },
];

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [actionColourChange, setActionColourChange] = useState(false);
  const randomIndex = Math.round(Math.random() * 1);
  const [personaCard, setPersonaCards] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [entriesData, setEntriesData] = useState([]);

  useEffect(() => {
    AsyncStorage.getAllKeys().then((values) => {
      const key = values;
      AsyncStorage.multiGet(key).then((items) => {
        for (let i = 0; i <= key.length - 1; i++) {
          let item = JSON.parse(items[i][1]);
          setEntriesData((oldEntries) => [
            ...oldEntries,
            {
              card: item.card,
              description: item.description,
              imageP5: item.imageP5,
              imageTarot: item.imageTarot,
              note: item.note,
            },
          ]);
        }
      });
    });
  }, []);

  const setActionColourChangeToTrue = () => {
    setActionColourChange(true);
  };
  const setActionColourChangeToFalse = () => {
    setActionColourChange(false);
  };

  firebaseRN.auth().onAuthStateChanged(function (user) {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

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
          children={() => (
            <View style={{ backgroundColor: colours.primary }}>
              <View style={styles.historyTopbar}>
                <Text style={styles.historyTitle}>Your Entries</Text>
                <MaterialCommunityIcons
                  name="settings-outline"
                  size={24}
                  color={colours.secondaryThick}
                  onPress={() => setSettingsVisible(true)}
                />
              </View>
              <HistoryScreen isLoggedIn={loggedIn} entriesData={entriesData} />
              <Modal
                animationType="slide"
                transparent={true}
                visible={settingsVisible}
                onRequestClose={() => {
                  setSettingsVisible(false);
                }}
              >
                <View style={styles.modalView}>
                  <View style={styles.settingsTopbar}>
                    <MaterialCommunityIcons
                      name="arrow-left"
                      size={30}
                      color={colours.secondaryThick}
                      onPress={() => setSettingsVisible(false)}
                    />
                    <Text style={styles.modalTitle}>Settings</Text>
                  </View>
                  <SettingsScreen isLoggedIn={loggedIn} />
                </View>
              </Modal>
            </View>
          )}
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
            <ModalScreen
              cards={cards}
              randomIndex={randomIndex}
              setModalVisible={setModalVisible}
              loggedIn={loggedIn}
            />
          </View>
        </Modal>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  settingsTopbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: -140,
    width: "100%",
    alignItems: "center",
  },
  historyTopbar: {
    backgroundColor: colours.primary,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
  },
  historyTitle: {
    fontSize: 20,
    color: colours.secondaryThick,
    fontWeight: "bold",
    alignSelf: "center",
  },
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
