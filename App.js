import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colours from "./res/colours";

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed!</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      shifting={true}
      activeColor={colours.bg}
      labelStyle={{ fontSize: 12 }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "tomato",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        activeColor
        options={{
          tabBarLabel: "Profile",
          tabBarColor: "green",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const toggleOpen = () => {};
  return (
    <NavigationContainer>
      <MyTabs />
      <View style={styles.btnCircle}>
        <TouchableWithoutFeedback onPress={() => toggleOpen()}>
          <View style={[styles.button, styles.actionBtn]}>
            <Image
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
              source={require("./assets/plusIcon.png")}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "grey",
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
  actionBtn: {
    backgroundColor: "#1E90FF",
    backgroundColor: colours.primaryThick,
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
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
});
