import React from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserAuthStore } from "../../store/useUserAuthStore";

const Home = () => {
  const { reset } = useUserAuthStore();

  const handleLogout = () => {
    Alert.alert("LOGOUT", "Press confirm to proceed.", [
      {
        text: "CANCEL",
        style: "cancel",
      },
      { text: "CONFIRM", onPress: reset },
    ]);
  };
  return (
    <SafeAreaView className=" bg-red-200 flex-1 flex justify-center items-center">
      <Text className=" text-blue-900 text-2xl font-bold">HOME</Text>
      <Button mode="contained" onPress={handleLogout}>
        LOGOUT
      </Button>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
