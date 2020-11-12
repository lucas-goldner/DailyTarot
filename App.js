import React, { useState, useEffect, createContext } from "react";
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
  {
    title: "The High Priestess",
    imageTarot: require("./assets/tarot/major02.jpg"),
    imageP5: require("./assets/p5/major02.jpg"),
    description:
      "The High Priestess is the feminine principle that balances the masculine force of the Magician. She poses a challenge to you to go deeper - to look beyond the obvious, surface situation to what is hidden and obscure.",
  },
  {
    title: "The Empress",
    imageTarot: require("./assets/tarot/major03.jpg"),
    imageP5: require("./assets/p5/major03.jpg"),
    description:
      "The Empress represents the fertile, life-giving Mother. She can suggest material reward, but only with the understanding that riches go with a generous and open spirit. She asks you to embrace the principle of life and enjoy its goodness.",
  },
  {
    title: "The Emperor",
    imageTarot: require("./assets/tarot/major04.jpg"),
    imageP5: require("./assets/p5/major04.jpg"),
    description:
      "The Emperor can represent an encounter with authority or the assumption of power and control. He is often associated with legal matters, but he can also stand for an archetypal Father in his role as guide, protector and provider.",
  },
  {
    title: "The Hierophant",
    imageTarot: require("./assets/tarot/major05.jpg"),
    imageP5: require("./assets/p5/major05.jpg"),
    description:
      "The Hierophant represents learning with experts or knowledgeable teachers. His appearance can show that you are struggling with a force that is not innovative or free-spirited. He is a symbol of the need to conform to rules or fixed situations.",
  },
  {
    title: "The Lovers",
    imageTarot: require("./assets/tarot/major06.jpg"),
    imageP5: require("./assets/p5/major06.jpg"),
    description:
      "Love and sex are riveting subjects, and, as you'd expect, this card represents both. It can indicate a moral or ethical crossroads - a decision point where you must choose between the high road or the low road",
  },
  {
    title: "The Chariot",
    imageTarot: require("./assets/tarot/major07.jpg"),
    imageP5: require("./assets/p5/major07.jpg"),
    description:
      "The Chariot often appears when hard control is or could be in evidence. It is backed up by a strong will and great confidence. The Chariot can mean self-control or control of the environment. This card also represents victory.",
  },
  {
    title: "The Strength",
    imageTarot: require("./assets/tarot/major08.jpg"),
    imageP5: require("./assets/p5/major08.jpg"),
    description:
      "Usually we think of strength in physical terms, but there is also inner strength. Strength also represents patience and compassion. It will appear in a reading when its qualities are needed. It can be a reminder not to despair or give up.",
  },
  {
    title: "The Hermit",
    imageTarot: require("./assets/tarot/major09.jpg"),
    imageP5: require("./assets/p5/major09.jpg"),
    description:
      "The Hermit often suggests a need for time alone, a period of reflection when distractions are limited. In times of action and high energy, he stands for the still center that must be created for balance.",
  },
  {
    title: "Wheel Of Fortune",
    imageTarot: require("./assets/tarot/major10.jpg"),
    imageP5: require("./assets/p5/major10.jpg"),
    description:
      "The Wheel of Fortune also represents unexpected encounters and twists of fate. It often suggests wheel-like actions, changes in direction, repeating cycles and rapid movement. When the energy arrives, you will feel life speed up.",
  },
  {
    title: "Justice",
    imageTarot: require("./assets/tarot/major11.jpg"),
    imageP5: require("./assets/p5/major11.jpg"),
    description:
      "Justice often appears when you are concerned with doing what is right or making sure you receive your due. This card can also appear when you are feeling the impact of a past mistake or good deed.",
  },
  {
    title: "The Hanged Man",
    imageTarot: require("./assets/tarot/major12.jpg"),
    imageP5: require("./assets/p5/major12.jpg"),
    description:
      "In readings, the Hanged Man reminds us that the best approach to a problem is not always the most obvious. For example when we most want to force our will on someone, that is when we should release.",
  },
  {
    title: "Death",
    imageTarot: require("./assets/tarot/major13.jpg"),
    imageP5: require("./assets/p5/major13.jpg"),
    description:
      "Death rarely has anything to do with physical death. Death often represents an important ending that will initiate great change. It signals the end of an era, but sometimes also a relief",
  },
  {
    title: "Temperance",
    imageTarot: require("./assets/tarot/major14.jpg"),
    imageP5: require("./assets/p5/major14.jpg"),
    description:
      "To be temperate is to show moderation and self-restraint. This card can also indicate a need for balance. In conflict situations, Temperance suggests that compromise and cooperation are vital.",
  },
  {
    title: "The Devil",
    imageTarot: require("./assets/tarot/major15.jpg"),
    imageP5: require("./assets/p5/major15.jpg"),
    description:
      "This card shows you that you are caught in an unhealthy, unproductive situation. You may be obsessed by a person, idea, substance or pattern that is bad for you. Hold to the highest vision of who you are.",
  },
  {
    title: "The Tower",
    imageTarot: require("./assets/tarot/major16.jpg"),
    imageP5: require("./assets/p5/major16.jpg"),
    description:
      "The Tower is an unsettling card. It represents a sudden, dramatic upheaval or reversal in fortune. Recognize that the disruption occurred because it was needed. Try to find the positive in it.",
  },
  {
    title: "The Star",
    imageTarot: require("./assets/tarot/major17.jpg"),
    imageP5: require("./assets/p5/major17.jpg"),
    description:
      "The Star is inspiring, but it is not a card of practical solutions or final answers. Your goals and your aspirations are blessed, but to realize them, you must take positive action.",
  },
  {
    title: "The Moon",
    imageTarot: require("./assets/tarot/major18.jpg"),
    imageP5: require("./assets/p5/major18.jpg"),
    description:
      "This card often stands for fears and anxieties. It also stands for illusions. It is easy to lose our way in the moonlight. Be careful not to let deceptions and false ideas lead you astray.",
  },
  {
    title: "The Sun",
    imageTarot: require("./assets/tarot/major19.jpg"),
    imageP5: require("./assets/p5/major19.jpg"),
    description:
      "You will understand Card 19 if you imagine yourself to be a Sun God. You have total confidence in yourself. You are not cocky, but sure of your power. You will be successful at all you undertake.",
  },
  {
    title: "Judgement",
    imageTarot: require("./assets/tarot/major20.jpg"),
    imageP5: require("./assets/p5/major20.jpg"),
    description:
      "The Sun stands for the feelings that come with salvation. You are reborn, cleansed of all guilts and burdens. The past and its mistakes are behind you, and you are ready to begin anew.",
  },
];

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [actionColourChange, setActionColourChange] = useState(false);
  const [randomIndex, setRandomIndex] = useState(Math.round(Math.random() * 1));
  const [loggedIn, setLoggedIn] = useState(false);
  const [entriesData, setEntriesData] = useState([]);
  const [persona, setPersona] = useState(false);

  useEffect(() => {
    const day = "" + new Date().getDay();
    const newRandomIndex = "" + Math.round(Math.random() * 1);
    AsyncStorage.getItem("curDay").then((value) =>
      day === value
        ? (AsyncStorage.getItem("randomIndex").then((value) =>
            setRandomIndex(value)
          ),
          setRandomIndex(1))
        : (AsyncStorage.setItem("curDay", day),
          AsyncStorage.setItem("randomIndex", newRandomIndex),
          setRandomIndex(newRandomIndex))
    );
    AsyncStorage.getAllKeys().then((values) => {
      for (let i = 0; i < values.length; i++) {
        if (values[i] === "curDay") {
          values.splice(i, 1);
        }
      }
      for (let i = 0; i < values.length; i++) {
        if (values[i] === "randomIndex") {
          values.splice(i, 1);
        }
      }
      for (let i = 0; i < values.length; i++) {
        if (
          values[i] ===
          "firebase:authUser:AIzaSyAFV_2s6MIBgAqFvNQb5HAnqBFjsMU6qEc:[DEFAULT]"
        ) {
          values.splice(i, 1);
        }
      }
      const key = values;
      AsyncStorage.multiGet(key).then((items) => {
        for (let i = 0; i <= key.length - 1; i++) {
          let item = JSON.parse(items[i][1]);
          setEntriesData((oldEntries) => [
            {
              card: item.card,
              description: item.description,
              imageP5: item.imageP5,
              imageTarot: item.imageTarot,
              note: item.note,
            },
            ...oldEntries,
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
            <CardScreen
              cards={cards}
              randomIndex={randomIndex}
              persona={persona}
            />
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
              <HistoryScreen
                isLoggedIn={loggedIn}
                entriesData={entriesData}
                persona={persona}
              />
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
                  <SettingsScreen
                    setEntriesData={setEntriesData}
                    isLoggedIn={loggedIn}
                    entriesData={entriesData}
                    persona={persona}
                    setPersona={setPersona}
                  />
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
              entriesData={entriesData}
              setEntriesData={setEntriesData}
              persona={persona}
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
