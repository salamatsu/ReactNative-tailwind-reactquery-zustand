import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { CameraView, Camera } from 'expo-camera';

const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const scanDate = new Date().toLocaleString();
    setHistory([...history, { type, data, date: scanDate }]);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Type: {item.type}</Text>
      <Text>Data: {item.data}</Text>
      <Text>Date: {item.date}</Text>
    </View>
  );

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={styles.camera}
        />
      </View>
      <ScrollView style={styles.historyContainer}>
        {history.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>Type: {item.type}</Text>
            <Text>Data: {item.data}</Text>
            <Text>Date: {item.date}</Text>
          </View>
        ))}
      </ScrollView>
      {scanned && (
        <TouchableOpacity style={styles.scanAgainButton} onPress={() => setScanned(false)}>
          <Text style={styles.scanAgainText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
    aspectRatio: 16/9,
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  historyContainer: {
    maxHeight: 200,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  scanAgainText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ScanScreen;
