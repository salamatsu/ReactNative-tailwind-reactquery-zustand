import { StyleSheet } from "react-native";
import Home from "../screens/Home";
import Login from "../screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useUserAuthStore } from "../store/useUserAuthStore";

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const { token, userInfo } = useUserAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token && userInfo ? "Home" : "Login"}>
        {token && userInfo ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
