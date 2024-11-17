import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding until fonts/assets are loaded
SplashScreen.preventAutoHideAsync();

export default function AuthLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate asset loading or other async operations
    const loadAssets = async () => {
      // Here you can add any async asset loading or initialization code
      // For now, let's just wait for a second before hiding the splash screen
      setTimeout(() => {
        SplashScreen.hideAsync();
        setIsReady(true);
      }, 2000); // Replace with your asset loading logic
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
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPasswordScreen" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}
