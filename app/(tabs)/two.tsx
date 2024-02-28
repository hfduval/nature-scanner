import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Text, View } from '@/components/Themed';
import Scanner from '@/components/Scanner';

export default function TabTwoScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showScanner, setShowScanner] = useState(false);

  function renderScanner() {
    requestPermission();
    setShowScanner(true);
  }
  
    if (!permission) {
      return <View />;
    }
  
    if (!permission.granted) {
        return (
            <View style={styles.container}>
              <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
              <Button onPress={requestPermission} title="grant permission" />
            </View>
          );
    }

  return (
    <View style={styles.container}>
      {showScanner ? (
        <View style={styles.scanner}>
          <Scanner />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowScanner(false)}
          >
            <FontAwesome name="times" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Button
            title="Take a photo"
            onPress={() => setShowScanner(true)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanner: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
