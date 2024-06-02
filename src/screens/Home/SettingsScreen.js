import React, { useState } from "react";
import { Alert, Image, Modal, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserAuthStore } from "../../store/useUserAuthStore";

// Import your logo image from assets
import logo from "../../../assets/logo.png";

const SettingsScreen = () => {
  const { reset } = useUserAuthStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Banawe Cashier",
    email: "banawecashier@gmail.com",
    position: "Cashier",
    dateOfBirth: "01/01/1990",
    id: Math.floor(Math.random() * 9000) + 1000,
    department: "Billing",
    address: "123 Random St, Random City, Random Country",
    profilePic: require("../../../assets/frieren.jpg"),
  });

  const handleLogout = () => {
    Alert.alert("LOGOUT", "Press confirm to proceed.", [
      {
        text: "CANCEL",
        style: "cancel",
      },
      { text: "CONFIRM", onPress: reset },
    ]);
  };

  const handleProfileSettings = () => {
    setModalVisible(true);
  };

  const handleSaveProfile = () => {
    // Handle saving profile data
    setModalVisible(false);
  };

  const handleCancelProfileEdit = () => {
    setModalVisible(false);
  };

  const handleProfilePicChange = () => {
    // Implement logic to change profile picture
  };

  const handleDarkMode = () => {
    // Implement dark mode toggle logic
  };

  const handleNotificationSettings = () => {
    // Implement navigation to notification settings
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Button mode="contained" onPress={handleProfileSettings} style={styles.button}>
        Profile Settings
      </Button>
      <Button mode="contained" onPress={handleDarkMode} style={styles.button}>
        Dark Mode
      </Button>
      <Button mode="contained" onPress={handleNotificationSettings} style={styles.button}>
        Notification Settings
      </Button>
      <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
        LOGOUT
      </Button>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <Image source={profileData.profilePic} style={styles.profilePic} />
            <Button onPress={handleProfilePicChange} style={styles.changePicButton}>
              Change Profile Picture
            </Button>
            <TextInput
              label="Name"
              value={profileData.name}
              onChangeText={(text) => setProfileData({ ...profileData, name: text })}
              style={styles.input}
            />
            <TextInput
              label="Date of Birth"
              value={profileData.dateOfBirth}
              onChangeText={(text) => setProfileData({ ...profileData, dateOfBirth: text })}
              style={styles.input}
            />
            <TextInput
              label="Address"
              value={profileData.address}
              onChangeText={(text) => setProfileData({ ...profileData, address: text })}
              style={styles.input}
            />
            <View style={styles.modalButtonContainer}>
              <Button onPress={handleSaveProfile} style={styles.modalButton}>
                Save
              </Button>
              <Button onPress={handleCancelProfileEdit} style={styles.modalButton}>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB", // Adjust as needed
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    width: 200,
  },
  logoutButton: {
    marginVertical: 10,
    width: 200,
    backgroundColor: "#FF6347", // Adjust as needed
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    width: 250,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  changePicButton: {
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  modalButton: {
    width: 100,
  },
});

export default SettingsScreen;
