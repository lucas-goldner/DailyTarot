import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import colours from "../res/colours";
import ToggleSwitch from "rn-toggle-switch";
import * as firebase from "firebase";

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

function AccordionItem({ type }) {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 0;
  const [cardType, setcardType] = useState(true);
  const handleChange = (val) => {
    setcardType(val);
  };

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignup = (event) => {
    event.preventDefault();

    return firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .catch((error) => {
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      });
  };

  const handleSignin = (event) => {
    event.preventDefault();

    return firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        setError("Logged in");
        setEmailAddress("");
        setPassword("");
      })
      .catch((error) => {
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      {type == "login" ? (
        <View style={{ ...styles.itemView, height: 200 }}>
          <TextInput
            style={styles.noteInput}
            placeholder="Email"
            type="email"
            autoCompleteType="email"
            value={emailAddress}
            keyboardType="email-address"
            onChangeText={(value) => setEmailAddress(value)}
          />
          <TextInput
            style={styles.noteInput}
            placeholder="Password"
            autoCompleteType="password"
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={(event) => handleSignin(event)}
            disabled={isInvalid}
          >
            <Text style={styles.singleButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={(event) => handleSignup(event)}
            disabled={isInvalid}
          >
            <Text
              style={styles.singleButton}
              adjustsFontSizeToFit
              allowFontScaling
              maxFontSizeMultiplier={5}
            >
              Register
            </Text>
          </TouchableOpacity>

          {error == "Logged in" ? (
            <Text style={styles.sucMSG}>{error}</Text>
          ) : (
            <Text style={styles.errorMSG}>{error}</Text>
          )}
        </View>
      ) : type == "import" ? (
        <View style={styles.itemView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert("Hex")}
          >
            <Text style={styles.singleButton}>Import with account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert("Hex")}
          >
            <Text style={styles.singleButton}>Import with file</Text>
          </TouchableOpacity>
        </View>
      ) : type == "export" ? (
        <View style={styles.itemView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert("Hex")}
          >
            <Text style={styles.singleButton}>Export to file</Text>
          </TouchableOpacity>
        </View>
      ) : type == "theme" ? (
        <View style={styles.itemView}>
          <Toggle
            text={{
              on: "Default",
              off: "Persona",
              activeTextColor: colours.secondaryThick,
              inactiveTextColor: "black",
            }}
            textStyle={{ fontWeight: "bold", fontSize: 15 }}
            color={{
              indicator: "white",
              active: colours.primary,
              inactive: "red",
              activeBorder: colours.secondaryThick,
              inactiveBorder: "black",
            }}
            active={true}
            disabled={false}
            width={80}
            radius={20}
            onValueChange={(val) => {
              handleChange(val);
            }}
          />
        </View>
      ) : (
        <Text>by Lucas Goldner</Text>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  sucMSG: {
    color: colours.primaryThick,
    fontSize: 10,
  },
  errorMSG: {
    color: "red",
    fontSize: 8,
  },
  itemView: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: 100,
  },
  noteInput: {
    borderColor: colours.secondary,
    borderWidth: 2,
    borderRadius: 10,
    padding: 3,
    width: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: colours.secondaryThick,
    padding: 10,
    borderRadius: 10,
  },
  singleButton: {
    color: colours.bg,
    width: 200,
    textAlign: "center",
  },
});

export default AccordionItem;
