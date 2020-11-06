import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import colours from "../res/colours";
import Svg, { Path } from "react-native-svg";
import Entry from "../components/Entry";
import ToggleSwitch from "rn-toggle-switch";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MasterCalendar from "../components/Calendar";

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

function HistoryScreen(props) {
  //True cards false calender
  const [viewType, setviewType] = useState(true);
  const handleChange = (val) => {
    setviewType(val);
  };
  return (
    <View>
      <View style={styles.background}>
        <View style={styles.historyTopbar}>
          <Text style={styles.historyTitle}>Your Entries</Text>
          {/*           
          Uncomment when calendar should come back

          <Toggle
            text={{
              on: "Cards",
              off: "Calender",
              activeTextColor: colours.secondaryThick,
              inactiveTextColor: colours.primaryThick,
            }}
            textStyle={{ fontWeight: "bold", fontSize: 15 }}
            color={{
              indicator: "white",
              active: colours.primary,
              inactive: colours.secondary,
              activeBorder: colours.secondaryThick,
              inactiveBorder: colours.primaryThick,
            }}
            active={true}
            disabled={false}
            width={80}
            radius={20}
            onValueChange={(val) => {
              handleChange(val);
            }}
          />*/}

          <MaterialCommunityIcons
            name="settings-outline"
            size={24}
            color={colours.secondaryThick}
          />
        </View>
        {/*        {viewType ? (
          <>

        ) : (
          <>
            <MasterCalendar />
          </>
        )}
        */}
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.entryList}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Entry />
              <Entry />
              <Entry />
              <Entry />
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <Svg
        style={styles.bgLayer}
        data-name="BGLayer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 120"
        preserveAspectRatio="none"
      >
        <Path
          d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
          class="shape-fill"
          fill="#bae3f6"
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
    alignItems: "baseline",
  },
  entryList: {
    marginTop: 20,
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
    transform: [{ rotateZ: "180deg" }, { scaleX: -1 }],
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
