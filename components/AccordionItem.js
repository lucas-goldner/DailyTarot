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
import * as firebaseRN from "firebase";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/firestore";

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

function AccordionItem({
  type,
  isLoggedIn,
  entriesData,
  setEntriesData,
  persona,
  setPersona,
}) {
  const [currentyLogin, setCurrentyLogin] = useState(isLoggedIn);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 0;
  const handleChange = (val) => {
    const storageKey = "persona";
    const dataValue = "" + val;
    AsyncStorage.setItem(storageKey, dataValue).then(
      setPersona(val),
      console.log(val)
    );
  };
  const [sure, setSure] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [importMessage, setImportMessage] = useState("");
  const [exportMessage, setExportMessage] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignup = (event) => {
    event.preventDefault();

    return firebaseRN
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then(() => {
        setError("Created Account");
        setEmailAddress("");
        setPassword("");
        setCurrentyLogin(true);
      })
      .catch((error) => {
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      });
  };

  const handleSignin = (event) => {
    event.preventDefault();

    return firebaseRN
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        setError("Logged in");
        setEmailAddress("");
        setPassword("");
        setCurrentyLogin(true);
      })
      .catch((error) => {
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      });
  };

  const handleSignOut = () => {
    return firebaseRN
      .auth()
      .signOut()
      .then(function () {
        setError("Logged out");
        setCurrentyLogin(false);
      })
      .catch(function (error) {
        setError(error.message);
      });
  };

  const readFile = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      let fileUri = FileSystem.documentDirectory + "entries.txt";
      await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      })
        .then((data) => {
          const jsonData = JSON.parse(data);
          const writeArray = [];
          jsonData.forEach((element) => {
            writeArray.push([
              JSON.stringify(
                "DToffline" +
                  Math.random().toString(36).substring(2, 15) +
                  Math.random().toString(36).substring(2, 15)
              ),
              JSON.stringify(element),
            ]);
          });

          AsyncStorage.multiSet(writeArray);

          setEntriesData(jsonData);
          setImportMessage("Imported data from file");
        })
        .catch((error) => console.log(error));
    }
  };

  const saveFile = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      let fileUri = FileSystem.documentDirectory + "entries.txt";

      await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(entriesData),
        {
          encoding: FileSystem.EncodingType.UTF8,
        }
      );
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("DailyTarot", asset, false);
    }
  };

  const loadDataFromFirebase = () => {
    const user = firebaseRN.auth().currentUser.uid;
    const db = firebaseRN.firestore();
    const firebase = require("firebase");
    db.collection(user)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setEntriesData((oldEntries) => [...oldEntries, doc.data()]);
          console.log(doc.id, " => ", doc.data());
          AsyncStorage.setItem(doc.id.toString(), JSON.stringify(doc.data()));
        });
        setImportMessage("Imported data from firebase");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      {type == "login" ? (
        <View style={{ ...styles.itemView, height: 200 }}>
          {currentyLogin ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSignOut()}
              >
                <Text style={styles.singleButton}>Log Out</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
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
                <Text style={styles.singleButton}>Register</Text>
              </TouchableOpacity>
              {error == "Logged in" ? (
                <Text style={styles.sucMSG}>{error}</Text>
              ) : error == "Created Account" ? (
                <Text style={styles.sucMSG}>{error}</Text>
              ) : (
                <Text style={styles.errorMSG}>{error}</Text>
              )}
            </>
          )}
        </View>
      ) : type == "import android" ? (
        <View style={styles.itemView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              isLoggedIn
                ? loadDataFromFirebase()
                : setImportMessage("Not logged in");
            }}
          >
            <Text style={styles.singleButton}>Import with account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => readFile()}>
            <Text style={styles.singleButton}>Import with file</Text>
          </TouchableOpacity>
          {importMessage == "Not logged in" ? (
            <Text style={styles.errorMSG}>{importMessage}</Text>
          ) : importMessage == "Imported data from firebase" ? (
            <Text style={styles.sucMSG}>{importMessage}</Text>
          ) : importMessage == "Imported data from file" ? (
            <Text style={styles.sucMSG}>{importMessage}</Text>
          ) : (
            <></>
          )}
        </View>
      ) : type == "import ios" ? (
        <View style={styles.itemView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              isLoggedIn
                ? loadDataFromFirebase()
                : setImportMessage("Not logged in");
            }}
          >
            <Text style={styles.singleButton}>Import with account</Text>
          </TouchableOpacity>
          {importMessage == "Not logged in" ? (
            <Text style={styles.errorMSG}>{importMessage}</Text>
          ) : importMessage == "Imported data from firebase" ? (
            <Text style={styles.sucMSG}>{importMessage}</Text>
          ) : importMessage == "Imported data from file" ? (
            <Text style={styles.sucMSG}>{importMessage}</Text>
          ) : (
            <></>
          )}
        </View>
      ) : type == "export" ? (
        <View style={styles.itemView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => (
              saveFile(),
              setExportMessage("Exported to entries.txt in DailyTarot folder")
            )}
          >
            <Text style={styles.singleButton}>Export to file</Text>
          </TouchableOpacity>
          <Text style={styles.sucMSG}>{exportMessage}</Text>
        </View>
      ) : type == "reset" ? (
        <View style={styles.itemView}>
          {sure ? (
            <View style={styles.itemView}>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: "red",
                }}
                onPress={() => (
                  setSure((sure) => !sure),
                  AsyncStorage.clear(),
                  setEntriesData([])
                )}
              >
                <Text
                  style={{ ...styles.singleButton, backgroundColor: "red" }}
                >
                  Yes please delete all!
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: "green",
                }}
                onPress={() => setSure((sure) => !sure)}
              >
                <Text
                  style={{ ...styles.singleButton, backgroundColor: "green" }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setSure((sure) => !sure)}
            >
              <Text style={styles.singleButton}>Reset Entries</Text>
            </TouchableOpacity>
          )}
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
