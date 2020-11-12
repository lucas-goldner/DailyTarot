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
  {
    title: "The World",
    imageTarot: require("./assets/tarot/major21.jpg"),
    imageP5: require("./assets/p5/major21.jpg"),
    description:
      "The World represents these moments and all that goes into them. In readings, it is a very positive sign that you are in a position to realize your heart's desire.",
  },
  {
    title: "Ace Of Wands",
    imageTarot: require("./assets/tarot/clubs01.jpg"),
    imageP5: require("./assets/p5/clubs01.jpg"),
    description:
      "This card is a symbol of possibility in the area of creativity, adventure, courage and personal power. It shows that a seed of enthusiasm has been planted in your life although you may not recognize.",
  },
  {
    title: "Two Of Wands",
    imageTarot: require("./assets/tarot/clubs02.jpg"),
    imageP5: require("./assets/p5/clubs02.jpg"),
    description:
      "The Two of Wands glorifies individual courage and greatness and indicates that power is a major issue in the situation. You or someone else has/wants it. Look carefully at your goals and activities",
  },
  {
    title: "Three Of Wands",
    imageTarot: require("./assets/tarot/clubs03.jpg"),
    imageP5: require("./assets/p5/clubs03.jpg"),
    description:
      "The Three of Wands can tell you to take the long view. Don't react to the heat of the moment, but step back and reconsider. See how the present fits into the greater picture.",
  },
  {
    title: "Four Of Wands",
    imageTarot: require("./assets/tarot/clubs04.jpg"),
    imageP5: require("./assets/p5/clubs04.jpg"),
    description:
      "Four of Wands often represents the events and experiences that generate excitement. These vary from person to person, but the stirring feelings are the same. Sometimes such times arrive unexpectedly.",
  },
  {
    title: "Five Of Wands",
    imageTarot: require("./assets/tarot/clubs05.jpg"),
    imageP5: require("./assets/p5/clubs05.jpg"),
    description:
      "Five of Wands stands for times when your environment seems to be fighting you. Nothing flows smoothly; everyone is working at cross-purposes. There is no coordinated effort, no agreement.",
  },
  {
    title: "Six Of Wands",
    imageTarot: require("./assets/tarot/clubs06.jpg"),
    imageP5: require("./assets/p5/clubs06.jpg"),
    description:
      "The Six of Wands appears when you have been working hard toward a goal, and success is finally within reach. The recognition you have sought so long is yours. Now you can receive the honor and reward that you deserve.",
  },
  {
    title: "Seven Of Wands",
    imageTarot: require("./assets/tarot/clubs07.jpg"),
    imageP5: require("./assets/p5/clubs07.jpg"),
    description:
      "The Seven of Wands is all about taking a stand. Taking a stand is a forceful act that changes the energy flow of the world for good or ill. It can also indicate strong convictions.",
  },
  {
    title: "Eight Of Wands",
    imageTarot: require("./assets/tarot/clubs08.jpg"),
    imageP5: require("./assets/p5/clubs08.jpg"),
    description:
      "The Eight of Wands is often a sign that now is the time to declare yourself. All the elements are ready and will work for you as long as you don't hesitate. It also stands for the arrival of news.",
  },
  {
    title: "Nine Of Wands",
    imageTarot: require("./assets/tarot/clubs09.jpg"),
    imageP5: require("./assets/p5/clubs09.jpg"),
    description:
      "The Nine of Wands can be a warning that you must proceed carefully. Keep a watchful eye because there is the possibility that you will be hurt. Life's lessons can be hard sometimes.",
  },
  {
    title: "Ten Of Wands",
    imageTarot: require("./assets/tarot/clubs10.jpg"),
    imageP5: require("./assets/p5/clubs10.jpg"),
    description:
      "The Ten of Wands can be a sign that you are pushing yourself too hard. If your days are an endless round of duties and tasks, then you need to lighten up for the sake of your health and well-being.",
  },
  {
    title: "Page Of Wands",
    imageTarot: require("./assets/tarot/clubs11.jpg"),
    imageP5: require("./assets/p5/clubs11.jpg"),
    description:
      "The Page of Wands is a messenger bringing you opportunities for passion. He delivers real chances to experience creativity, courage and inspiration. He can also stand for a child or young-at-heart adult.",
  },
  {
    title: "The Knight Of Wands",
    imageTarot: require("./assets/tarot/clubs12.jpg"),
    imageP5: require("./assets/p5/clubs12.jpg"),
    description:
      "This knight is full of energy and life. He's never afraid to try something new and will reach for all he can. It shows that his confident, passionate style is involved in the situation as an aspect of you.",
  },
  {
    title: "The Queen Of Wands",
    imageTarot: require("./assets/tarot/clubs13.jpg"),
    imageP5: require("./assets/p5/clubs13.jpg"),
    description:
      "The Queen of Wands asks you to think and feel as she does. This Queen can also represent a man or woman who is like her, or an atmosphere of cheerful and confident enthusiasm.",
  },
  {
    title: "The King Of Wands",
    imageTarot: require("./assets/tarot/clubs14.jpg"),
    imageP5: require("./assets/p5/clubs14.jpg"),
    description:
      "The King of Wands asks you to take the kinds of actions he might take. This King can also represent a man or woman who is acting as he does, or an atmosphere of excitement, daring and drama.",
  },
  {
    title: "Ace Of Cups",
    imageTarot: require("./assets/tarot/cups01.jpg"),
    imageP5: require("./assets/p5/cups01.jpg"),
    description:
      "Ace of Cups shows is a symbol of possibility in the area of deep feelings, compassion and love. It shows that a seed of emotional awareness has been planted in your life although you may not recognize it.",
  },
  {
    title: "Two Of Cups",
    imageTarot: require("./assets/tarot/cups02.jpg"),
    imageP5: require("./assets/p5/cups02.jpg"),
    description:
      "The Two of Cups has a deeper meaning as well. Whenever two forces are drawn together, there is the potential for bonding. It also stands for the union of any two entities - people, groups, ideas, or talents.",
  },
  {
    title: "Three Of Cups",
    imageTarot: require("./assets/tarot/cups03.jpg"),
    imageP5: require("./assets/p5/cups03.jpg"),
    description:
      "The Three of Cups can signify a friend or the feelings associated with friendship. Examine your attachments to the groups in your life from an emotional point of view. Consider reaching out to give or receive help.",
  },
  {
    title: "Four Of Cups",
    imageTarot: require("./assets/tarot/cups04.jpg"),
    imageP5: require("./assets/p5/cups04.jpg"),
    description:
      "This card can represent a positive period of self-reflection and renewal. Sometimes it is a sign of apathy. You don't really care much about anything. Your life seems stale and flat because you've lost interest in activities.",
  },
  {
    title: "Five Of Cups",
    imageTarot: require("./assets/tarot/cups05.jpg"),
    imageP5: require("./assets/p5/cups05.jpg"),
    description:
      "This card is about loss. It can alert you to the possibility of a loss and its associated emotions sorrow, regret, denial. The loss could be great or small. Loss hurts because it is our emotional resistance to change.",
  },
  {
    title: "Six Of Cups",
    imageTarot: require("./assets/tarot/cups06.jpg"),
    imageP5: require("./assets/p5/cups06.jpg"),
    description:
      "The Six of Cups also represents innocence, a word with many shades of meaning. You can be innocent in the strictly legal sense of lack of guilt. It embraces all of childhood and the feelings we associate with youth.",
  },
  {
    title: "Seven Of Cups",
    imageTarot: require("./assets/tarot/cups07.jpg"),
    imageP5: require("./assets/p5/cups07.jpg"),
    description:
      "When the Seven of Cups appears, it is important to look at how disordered your situation is. Perhaps you need to let things fall apart a little. When a rigid system breaks up, there can be a tremendous release of creativity.",
  },
  {
    title: "Eight Of Cups",
    imageTarot: require("./assets/tarot/cups08.jpg"),
    imageP5: require("./assets/p5/cups08.jpg"),
    description:
      "The Eight of Cups stands for those moments when we realize, once and for all, that the past is gone. The signs of change are in our face, and we must accept them. It is time to move on.",
  },
  {
    title: "Nine Of Cups",
    imageTarot: require("./assets/tarot/cups09.jpg"),
    imageP5: require("./assets/p5/cups09.jpg"),
    description:
      "The Nine of Cups indicates contentment with the way things are. This card encourages you to seek out pleasure and enjoy your body in every way. It is a sign of delight in all the senses. Sights, sounds, tastes, feelings.",
  },
  {
    title: "Ten Of Cups",
    imageTarot: require("./assets/tarot/cups10.jpg"),
    imageP5: require("./assets/p5/cups10.jpg"),
    description:
      "When you see the Ten of Cups, know that an end to hostility is possible. If there is fighting around you, it may cease. If you are at war with yourself, you may find peace.",
  },
  {
    title: "Page Of Cups",
    imageTarot: require("./assets/tarot/cups11.jpg"),
    imageP5: require("./assets/p5/cups11.jpg"),
    description:
      "Page of Cups is Cupid bringing you opportunities for love. He delivers real chances to experience romance, deep feelings and the inner life - the wonders of the Cups suit.",
  },
  {
    title: "Knight Of Cups",
    imageTarot: require("./assets/tarot/cups12.jpg"),
    imageP5: require("./assets/p5/cups12.jpg"),
    description:
      "The Knight of Cups is a sensitive soul. He is a poet a lover of all things romantic and refined. He uses his imagination in wondrous ways and taps the deepest levels of emotion.",
  },
  {
    title: "Queen Of Cups",
    imageTarot: require("./assets/tarot/cups13.jpg"),
    imageP5: require("./assets/p5/cups13.jpg"),
    description:
      "This Queen can also represent a man or woman who is like her, or an atmosphere of gentle love, acceptance and respect for feelings. She tells you that her special energy has meaning for you at this time.",
  },
  {
    title: "King Of Cups",
    imageTarot: require("./assets/tarot/cups14.jpg"),
    imageP5: require("./assets/p5/cups14.jpg"),
    description:
      "King of Cups is a combination of the positive water energy of the Cups suit and the active, outward focus of a King. He is wise and understanding, with a deep knowledge of the world that comes from the heart.",
  },
  {
    title: "Ace Of Swords",
    imageTarot: require("./assets/tarot/swords01.jpg"),
    imageP5: require("./assets/p5/swords01.jpg"),
    description:
      "The Ace of Swords is a symbol of possibility in the area of intelligence, reason, justice, truth, clarity and fortitude. Sometimes this Ace stands for a challenge that will test you in some way.",
  },
  {
    title: "Two Of Swords",
    imageTarot: require("./assets/tarot/swords02.jpg"),
    imageP5: require("./assets/p5/swords02.jpg"),
    description:
      "Two of Swords is about the barriers we put up between ourselves and others and those we create within ourselves. Internally, we block off emotions and refuse to feel them.",
  },
  {
    title: "Three Of Swords",
    imageTarot: require("./assets/tarot/swords03.jpg"),
    imageP5: require("./assets/p5/swords03.jpg"),
    description:
      "Three of Swords clearly describes this sudden pain. You literally feel as if someone has taken a sharp object and jabbed it through your heart. Even something as minor as a snippy remark can feel this way.",
  },
  {
    title: "Four Of Swords",
    imageTarot: require("./assets/tarot/swords04.jpg"),
    imageP5: require("./assets/p5/swords04.jpg"),
    description:
      "The Four of Swords is often a sign that you need to slow down and get some rest. If you are recovering from an illness, allow yourself quiet time to heal.",
  },
  {
    title: "Five Of Swords",
    imageTarot: require("./assets/tarot/swords05.jpg"),
    imageP5: require("./assets/p5/swords05.jpg"),
    description:
      "The Five of Swords is about self-interest. It also represents hostility, from a cross word to warfare. When the cords that bind us are broken, we experience dis-cord.",
  },
  {
    title: "Six Of Swords",
    imageTarot: require("./assets/tarot/swords06.jpg"),
    imageP5: require("./assets/p5/swords06.jpg"),
    description:
      "The Six of Swords can indicate travel and moves of all kinds. This could mean an actual change of scene, relocation or trip, but not necessarily.",
  },
  {
    title: "Seven Of Swords",
    imageTarot: require("./assets/tarot/swords07.jpg"),
    imageP5: require("./assets/p5/swords07.jpg"),
    description:
      "The Seven of Swords can be a sign that you or someone else wants to be a lone wolf. You feel that you will be more effective and comfortable on your own.",
  },
  {
    title: "Eight Of Swords",
    imageTarot: require("./assets/tarot/swords08.jpg"),
    imageP5: require("./assets/p5/swords08.jpg"),
    description:
      "The Eight of Swords is often a sign that you are heading toward (or already in) a situation in which you will feel a lack of freedom and choice.",
  },
  {
    title: "Nine Of Swords",
    imageTarot: require("./assets/tarot/swords09.jpg"),
    imageP5: require("./assets/p5/swords09.jpg"),
    description:
      "The Nine of Swords represents the pain that we generate from within. What tortures we put ourselves through when our fears and doubts overwhelm us. Worry is probably the most common.",
  },
  {
    title: "Ten Of Swords",
    imageTarot: require("./assets/tarot/swords10.jpg"),
    imageP5: require("./assets/p5/swords10.jpg"),
    description:
      "Ten of Swords appears to be a card of terrible misfortune, but surprisingly, it often represents troubles that are more melodramatic than real. One meaning of the Ten of Swords is hitting rock bottom.",
  },
  {
    title: "Page Of Swords",
    imageTarot: require("./assets/tarot/swords11.jpg"),
    imageP5: require("./assets/p5/swords11.jpg"),
    description:
      "The Page of Swords asks you to embrace these difficult situations. Think of them as trials designed to test your mettle. If you accept and prevail, you will become stronger and more resilient.",
  },
  {
    title: "Knight Of Swords",
    imageTarot: require("./assets/tarot/swords12.jpg"),
    imageP5: require("./assets/p5/swords12.jpg"),
    description:
      "The Knight of Swords is a master of logic and reason. He has a keen intellect that grasps the fine points of any subject. His judgments are sure and free of emotion.",
  },
  {
    title: "Queen Of Swords",
    imageTarot: require("./assets/tarot/swords13.jpg"),
    imageP5: require("./assets/p5/swords13.jpg"),
    description:
      "The Queen of Swords asks you to think and feel as she does. For example: Are you being completely honest? Have you figured out what's really going on? Are you letting yourself be fooled?",
  },
  {
    title: "King Of Swords",
    imageTarot: require("./assets/tarot/swords14.jpg"),
    imageP5: require("./assets/p5/swords14.jpg"),
    description:
      "He is a man of intellect who can absorb and work with information of all kinds. As a master of reason and logic, he analyzes any problem with ease and works out solutions quickly.",
  },
];

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [actionColourChange, setActionColourChange] = useState(false);
  const [randomIndex, setRandomIndex] = useState(
    Math.round(Math.random() * 71)
  );
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
