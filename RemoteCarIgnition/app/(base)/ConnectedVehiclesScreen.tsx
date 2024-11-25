import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import FingerPrintAuthModal from './FingerPrintAuthModal';
import { useRouter } from 'expo-router';

interface Vehicle {
  id: string;
  name: string;
  status: string;
  image: string;
  ip: string;  // Added IP address property
  isIgnited: boolean; // Track ignition state
}

// Example vehicles with IP addresses and initial ignition state
const vehicles: Vehicle[] = [
  { id: '1', name: 'Toyota Prado', status: 'Last Started: 3 hours ago', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3', ip: '192.168.1.101', isIgnited: false },
  { id: '2', name: 'Nissan X-Trail', status: 'Connected: Active', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3', ip: '192.168.0.154', isIgnited: false },
];

export default function ConnectedVehiclesScreen() {
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>(vehicles); // Dynamic vehicles state
  const router = useRouter(); // Using router for navigation

  // Function to send a request to the vehicle's IP to activate the relay (ignition)
  const activateRelay = async (vehicle: Vehicle) => {
    try {
      const response = await fetch(`http://${vehicle.ip}/relay/on`);
      if (response.ok) {
        updateVehicleStatus(vehicle.id, 'Ignition Started', true);
        Alert.alert('Success', `${vehicle.name} ignition started!`);
      } else {
        Alert.alert('Error', `Failed to activate ignition for ${vehicle.name}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to connect to vehicle.');
    }
  };

  // Function to deactivate the relay (turn off ignition)
  const deactivateRelay = async (vehicle: Vehicle) => {
    try {
      const response = await fetch(`http://${vehicle.ip}/relay/off`);
      if (response.ok) {
        updateVehicleStatus(vehicle.id, 'Ignition Off', false);
        Alert.alert('Success', `${vehicle.name} ignition turned off!`);
      } else {
        Alert.alert('Error', `Failed to deactivate ignition for ${vehicle.name}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to connect to vehicle.');
    }
  };

  // Function to update vehicle status and ignition state in the state
  const updateVehicleStatus = (vehicleId: string, newStatus: string, isIgnited: boolean) => {
    const updatedVehicles = vehiclesData.map(vehicle => 
      vehicle.id === vehicleId ? { ...vehicle, status: newStatus, isIgnited } : vehicle
    );
    setVehiclesData(updatedVehicles);
  };

  const handleIgnition = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsAuthModalVisible(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalVisible(false);
    // After successful authentication, send the request to start the ignition
    if (selectedVehicle) {
      if (selectedVehicle.isIgnited) {
        deactivateRelay(selectedVehicle);  // If already ignited, turn it off
      } else {
        activateRelay(selectedVehicle);  // Otherwise, turn it on
      }
    }
  };

  const handleAuthCancel = () => {
    setIsAuthModalVisible(false);
    setSelectedVehicle(null);
  };

  const renderVehicleCard = ({ item }: { item: Vehicle }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.vehicleImage} />
      <View style={styles.cardContent}>
        <Text style={styles.vehicleName}>{item.name}</Text>
        <Text style={styles.vehicleStatus}>{item.status}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.ignitionButton} onPress={() => handleIgnition(item)}>
            <Feather name="power" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>{item.isIgnited ? 'Turn Off' : 'Ignition'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.disconnectButton} onPress={() => updateVehicleStatus(item.id, 'Disconnected', false)}>
            <Feather name="x-circle" size={20} color="#FF6347" />
            <Text style={[styles.buttonText, styles.disconnectText]}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Connected Vehicles</Text>
        <TouchableOpacity onPress={() => router.push('/(base)/AddVehicleScreen')}>
          <Feather name="plus-circle" size={24} color="#FFA500" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={vehiclesData}
        renderItem={renderVehicleCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <FingerPrintAuthModal
        isVisible={isAuthModalVisible}
        onSuccess={handleAuthSuccess}
        onCancel={handleAuthCancel}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  vehicleImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  vehicleStatus: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ignitionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  disconnectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF6347',
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  disconnectText: {
    color: '#FF6347',
  },
});
