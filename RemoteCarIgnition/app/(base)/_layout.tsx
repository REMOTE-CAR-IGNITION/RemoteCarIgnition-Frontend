import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, SafeAreaView, Text } from 'react-native';

// Prevent the splash screen from auto-hiding before we are ready
SplashScreen.preventAutoHideAsync();

export default function BaseLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate loading logic (replace with actual data or asset loading)
    const loadAssets = async () => {
      // You can load fonts, images, etc., here
      setTimeout(() => {
        SplashScreen.hideAsync(); // Hide splash screen after loading is complete
        setIsReady(true); // Update state to render the UI
      }, 2000); // Simulate loading delay
    };

    loadAssets();
  }, []);

  if (!isReady) {
    // You can display a loading state or keep the splash screen visible
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="ConnectedVehiclesScreen" options={{ headerShown: false,title: 'Connected Vehicles' }} />
          <Stack.Screen name="AddVehicleScreen" options={{ headerShown: false, title: 'Add Vehicle' }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
