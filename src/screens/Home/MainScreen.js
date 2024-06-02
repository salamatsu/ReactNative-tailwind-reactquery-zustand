import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart } from "react-native-chart-kit";

const MainScreen = () => {
  const [profile, setProfile] = useState({
    name: "Banawe Cashier",
    email: "banawecashier@gmail.com",
    position: "Cashier",
    dateOfBirth: "01/01/1990",
    id: Math.floor(Math.random() * 9000) + 1000,
    department: "Billing",
    address: "123 Random St, Random City, Random Country",
    profilePic: require("../../../assets/frieren.jpg"),
  });

  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [40, 35, 50, 40],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image source={profile.profilePic} style={styles.profilePic} />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.email}>{profile.email}</Text>
              <Text style={styles.position}>{profile.position}</Text>
              <Text style={styles.dateOfBirth}>Date of Birth: {profile.dateOfBirth}</Text>
              <Text style={styles.id}>ID: {profile.id}</Text>
              <Text style={styles.department}>Department: {profile.department}</Text>
              <Text style={styles.address}>Address: {profile.address}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.chartTitle}>Total Scan This Month</Text>
        <BarChart
          data={data}
          width={400}
          height={500}
          yAxisSuffix="k"
          chartConfig={{
            backgroundColor: "#000",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#000",
            },
          }}
          verticalLabelRotation={30}
        />
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Health Care</Text>
          <Text style={styles.contentText}>enjoy this app</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  position: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  dateOfBirth: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  id: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  department: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: "#666",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  contentText: {
    fontSize: 16,
    color: "#666",
  },
});

export default MainScreen;
