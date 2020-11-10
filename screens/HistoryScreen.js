import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import colours from "../res/colours";
import Svg, { Path } from "react-native-svg";
import Entry from "../components/Entry";
import ToggleSwitch from "rn-toggle-switch";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as firebaseRN from "firebase";
import "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Toggle extends ToggleSwitch {
  onDragEnd = (e) => {
    const { contentOffset } = e.nativeEvent;
    if (contentOffset.x > this.props.width / 2) {
      this.scrollRef.scrollToEnd();
      this.updateState(false);
    } else {
      this.scrollRef.scrollTo({ x: 0, y: 0, animated: true });
      this.updateState(true);
    }
  };

  onDragStart = () => {};
}

function HistoryScreen({ isLoggedIn }) {
  const [viewType, setviewType] = useState(true);
  const [entriesData, setEntriesData] = useState([]);
  const [entryAmount, setEntryAmount] = useState(0);
  const handleChange = (val) => {
    setviewType(val);
  };

  useEffect(() => {
    if (isLoggedIn == true) {
      const user = firebaseRN.auth().currentUser.uid;
      const db = firebaseRN.firestore();
      const firebase = require("firebase");
      db.collection(user)
        .get()
        .then(function (querySnapshot) {
          setEntryAmount(querySnapshot.size);
          console.log("-----------------");
          querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            setEntriesData((oldEntries) => [...oldEntries, doc.data()]);
          });
        });

      console.log(entryAmount);
      const entries = [];
      for (let i = 0; i < entryAmount; i++) {
        //entries.push(<Entry key={i} />);
        console.log(entriesData[i].card);
      }
    }
  }, []);

  return (
    <View>
      <View style={styles.background}>
        <ScrollView style={{ marginTop: 20 }} scrollEventThrottle={16}>
          <View style={styles.entryList}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {entriesData.map(
                (
                  {
                    UID,
                    card,
                    description,
                    imageP5,
                    imageTarot,
                    note,
                    timestamp,
                  },
                  index
                ) => {
                  return (
                    <Entry
                      key={index}
                      card={card}
                      description={description}
                      imageP5={imageP5}
                      imageTarot={imageTarot}
                      note={note}
                    />
                  );
                }
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <Svg
        style={styles.bgLayer}
        data-name="BGLayer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
      >
        <Path
          d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
          class="shape-fill"
          fill="rgb(242, 242, 242)"
          fill-opacity="1"
        ></Path>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  historyTopbar: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
  },
  entryList: {
    marginTop: 0,
    height: 650,
  },
  historyTitle: {
    fontSize: 20,
    color: colours.secondaryThick,
    fontWeight: "bold",
    alignSelf: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 100,
    top: 0,
    alignSelf: "center",
    elevation: 100,
    height: "100%",
  },
  bgLayer: {
    transform: [{ scaleX: -1 }],
    borderColor: "black",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10.0,
  },
});

export default HistoryScreen;
