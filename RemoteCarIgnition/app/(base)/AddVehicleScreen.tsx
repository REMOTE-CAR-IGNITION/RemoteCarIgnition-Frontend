import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Adjust based on your router setup

export default function AddVehicleScreen() {
  const [vehicleName, setVehicleName] = useState('');
  const [vin, setVin] = useState('');
  const [connectionType, setConnectionType] = useState('');
  const router = useRouter(); // Using router for navigation

  const handleAddVehicle = () => {
    // Implement vehicle addition logic here
    console.log('Add vehicle pressed');
    // After adding, navigate back to the Connected Vehicles screen
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Feather name="plus-circle" size={40} color="#FFA500" />
          <Text style={styles.headerText}>Add New Vehicle</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Vehicle Name"
            value={vehicleName}
            onChangeText={setVehicleName}
          />
          <TextInput
            style={styles.input}
            placeholder="Vehicle Identification Number (VIN)"
            value={vin}
            onChangeText={setVin}
          />
        </View>
        <Text style={styles.sectionTitle}>Connection Type</Text>
        <View style={styles.connectionTypeContainer}>
          <TouchableOpacity
            style={[
              styles.connectionTypeButton,
              connectionType === 'bluetooth' && styles.selectedConnectionType,
            ]}
            onPress={() => setConnectionType('bluetooth')}
          >
            <Feather
              name="bluetooth"
              size={24}
              color={connectionType === 'bluetooth' ? '#FFFFFF' : '#FFA500'}
            />
            <Text
              style={[
                styles.connectionTypeText,
                connectionType === 'bluetooth' && styles.selectedConnectionTypeText,
              ]}
            >
              Bluetooth
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.connectionTypeButton,
              connectionType === 'wifi' && styles.selectedConnectionType,
            ]}
            onPress={() => setConnectionType('wifi')}
          >
            <Feather
              name="wifi"
              size={24}
              color={connectionType === 'wifi' ? '#FFFFFF' : '#FFA500'}
            />
            <Text
              style={[
                styles.connectionTypeText,
                connectionType === 'wifi' && styles.selectedConnectionTypeText,
              ]}
            >
              Wi-Fi
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
          <Text style={styles.addButtonText}>Add Vehicle</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  connectionTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  connectionTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 2,
    borderColor: '#FFA500',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedConnectionType: {
    backgroundColor: '#FFA500',
  },
  connectionTypeText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FFA500',
    fontWeight: 'bold',
  },
  selectedConnectionTypeText: {
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});