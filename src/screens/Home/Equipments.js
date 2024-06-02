import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';

const HospitalItemsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const hospitalItems = [
    { 
      name: 'Laptop Acer', 
      location: 'Room A', 
      available: false,
      damage: true, 
      dateTimeAcquired: '2024-05-15T10:30:00Z',
      equipmentID: 'A12345',
      equipmentSerialNo: 'ABC123456',
      currentUser: { id: '013A', fullName: 'Juan Santos Dela Cruz', department: 'Surgery Department' }
    },
    { 
      name: 'Defibrillators', 
      location: 'Emergency Room', 
      available: true,
      damage: false, 
      dateTimeAcquired: '',
      equipmentID: 'A12346',
      equipmentSerialNo: 'ABC123457',
      currentUser: { id: '', fullName: 'None', department: 'Emergency Department' }
    },
    // Add more items as needed
    { 
      name: 'Surgical lights', 
      location: 'Emergency Room', 
      available: true,
      damage: false, 
      dateTimeAcquired: '',
      equipmentID: 'A12346',
      equipmentSerialNo: 'ABC123457',
      currentUser: { id: '', fullName: 'None', department: 'Emergency Department' }
    },
    { 
      name: 'Stethoscopes', 
      location: 'Clinic Room', 
      available: false,
      damage: false, 
      dateTimeAcquired: '',
      equipmentID: 'LD322DDA',
      equipmentSerialNo: 'DSAD321',
      currentUser: { id: 'hak321', fullName: 'Benladeen Nawal', department: 'IT Department' }
    },
    { 
      name: 'Ultra Sound', 
      location: 'Radiology Room', 
      available: false,
      damage: false, 
      dateTimeAcquired: '',
      equipmentID: 'Wa23if2u',
      equipmentSerialNo: 'Fri23en',
      currentUser: { id: 'C23u4t2e', fullName: 'Frieren', department: 'Radiology Department' }
    },
  ];

  const filteredItems = hospitalItems.filter(item => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Equipment List</Text>
        {filteredItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.item}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.location}>Location: {item.location}</Text>
            </View>
            {item.available ? (
              <Text style={[styles.status, styles.available]}>Available</Text>
            ) : (
              <Text style={[styles.status, styles.notAvailable]}>Not Available</Text>
            )}
            <View style={styles.details}>
              <Text style={styles.detail}>Damage: {item.damage ? 'Yes' : 'No'}</Text>
              <Text style={styles.detail}>Date and Time Acquired: {item.dateTimeAcquired}</Text>
              <Text style={styles.detail}>Equipment ID No.: {item.equipmentID}</Text>
              <Text style={styles.detail}>Equipment Serial No.: {item.equipmentSerialNo}</Text>
              <Text style={styles.detail}>Current User: {item.currentUser.id} {item.currentUser.fullName}, {item.currentUser.department}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontStyle: 'italic',
  },
  status: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  available: {
    color: 'green',
    backgroundColor: 'lightgreen',
  },
  notAvailable: {
    color: 'red',
    backgroundColor: 'salmon',
  },
  details: {
    marginTop: 10,
  },
  detail: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export default HospitalItemsScreen;
