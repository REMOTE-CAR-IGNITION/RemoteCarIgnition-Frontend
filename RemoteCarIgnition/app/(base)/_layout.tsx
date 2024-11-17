import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View} from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function baseLayout() {
return (
  <View>
    <Stack>
    <Stack.Screen name="ConnectedVehiclesScreen" options={{ headerShown: false }} />
    <Stack.Screen name="AddVehicleScreen" options={{ headerShown: false }} />
    <Stack.Screen name="+not-found" />
    </Stack>
    <StatusBar style="auto" />
  </View>
);
}
