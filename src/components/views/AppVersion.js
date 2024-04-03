import * as Device from "expo-device";
import React, { useEffect, useState } from "react";
import {
  Alert,
  AppState,
  BackHandler,
  Linking,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const AppVersion = ({ textStyles }) => {
  // CHECK APP VERSION : STATIC
  const currentAppVersion = "1.0.0";
  const deviceManufacturer = Device.manufacturer;
  const [modalShown, setModalShown] = useState(false);
  const [buttonName, setButtonName] = useState("");

  // const checkAppVersion = (newVersion) => {
  //   if (currentAppVersion >= newVersion?.supportedVersion) {
  //     setModalShown(false);
  //   } else {
  //     setModalShown(true);

  //     let name = deviceManufacturer.toUpperCase().includes("HUAWEI")
  //       ? "UPDATE"
  //       : Platform.OS == "android"
  //       ? "PLAY STORE"
  //       : "APP STORE";
  //     setButtonName(name);
  //   }
  // };

  const closeApp = () => {
    BackHandler.exitApp();
  };
  const redirectApp = () => {
    const url = deviceManufacturer.toUpperCase().includes("HUAWEI")
      ? appInfo?.directLink
      : appInfo?.storeLink;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Cannot open URL", url);
      }
    });
  };

  // useEffect(() => {
  //   if (appInfo) {
  //     checkAppVersion(appInfo);
  //   }
  // }, [appInfo]);

  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        // Trigger an action when the app is resumed from the background
        // dispatch(
        //   getAppVersion({
        //     body: {
        //       type: "exhibitor",
        //       platform: Platform.OS,
        //     },
        //   })
        // );
      }
      setAppState(nextAppState);
    };

    const myListener = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      myListener.remove();
    };
  }, [appState]);

  return (
    <View>
      <Portal>
        <Dialog
          visible={modalShown}
          dismissable={false}
          style={{ backgroundColor: "white" }}
        >
          <Dialog.Title style={{ textAlign: "center" }}>
            New version available
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ textAlign: "center" }}>
              There is a new version available for download.{" "}
              {Platform.OS == "ios" && "Please update the app!"}
            </Text>
            {Platform.OS == "android" && (
              <Text style={{ textAlign: "center" }}>
                Please update the app!
              </Text>
            )}
          </Dialog.Content>

          <Dialog.Actions>
            {Platform.OS == "android" && (
              <Button onPress={closeApp} textColor="gray">
                CLOSE APPLICATION
              </Button>
            )}
            <Button
              contentStyle={{ borderRadius: 2 }}
              style={{ borderRadius: 2 }}
              onPress={redirectApp}
            >
              PROCEED TO {buttonName}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Text variant="labelSmall" style={textStyles}>
        Version {currentAppVersion}
      </Text>
    </View>
  );
};

export default AppVersion;

const styles = StyleSheet.create({});
