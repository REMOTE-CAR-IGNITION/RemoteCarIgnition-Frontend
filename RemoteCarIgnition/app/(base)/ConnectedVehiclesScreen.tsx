import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Adjust based on your router setup
interface Vehicle {
  id: string;
  name: string;
  status: string;
  image: string;
}

const vehicles = [
  { id: '1', name: 'Toyota Prado', status: 'Last Started: 3 hours ago', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3' },
  { id: '2', name: 'Nissan X-Trail', status: 'Connected: Active', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3' },
];

export default function ConnectedVehiclesScreen({  }) {
  const router = useRouter(); // Using router for navigation
  const renderVehicleCard = ({ item  }: { item: Vehicle }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.vehicleImage} />
      <View style={styles.cardContent}>
        <Text style={styles.vehicleName}>{item.name}</Text>
        <Text style={styles.vehicleStatus}>{item.status}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.ignitionButton}>
            <Feather name="power" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Ignition</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.disconnectButton}>
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
        <TouchableOpacity onPress={() => router.push('/(base)AddVehicleScreen')}>
          <Feather name="plus-circle" size={24} color="#FFA500" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={vehicles}
        renderItem={renderVehicleCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
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