import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import MainScreen from "./MainScreen"; 
import SettingsScreen from "./SettingsScreen";
import ScanScreen from "./ScanScreen";
import Equipments from './Equipments'

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          } else if (route.name === 'ScanScreen') {
            iconName = 'scan-outline';
          }
          else if (route.name === 'Equipments') {
            iconName = 'medical-outline';
          }
          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
        },
      })}
    >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="ScanScreen" component={ScanScreen} />
      <Tab.Screen name="Equipments" component={Equipments} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
export default Home;