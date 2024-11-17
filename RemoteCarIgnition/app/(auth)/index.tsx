import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Adjust based on your router setup

export default function LandingScreen() {
  const router = useRouter(); // Using router for navigation

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3' }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Feather name="key" size={60} color="#FFA500" />
          <Text style={styles.logoText}>RemoteCarIgnition</Text>
        </View>
        <Text style={styles.tagline}>Ignite Your Journey, Anytime, Anywhere</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.getStartedButton]}
            onPress={() => router.push('/(auth)/SignUpScreen')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={() => router.push('/(auth)/LoginScreen')}
          >
            <Text style={[styles.buttonText, styles.signInText]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFA500',
    marginTop: 10,
  },
  tagline: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  getStartedButton: {
    backgroundColor: '#FFA500',
  },
  signInButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInText: {
    color: '#FFA500',
  },
});