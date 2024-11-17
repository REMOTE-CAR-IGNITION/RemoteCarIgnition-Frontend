import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Adjust based on your router setup

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter(); // Using router for navigation

  const handleResetPassword = () => {
    // Implement password reset logic here
    console.log('Reset password pressed');
    // After sending reset instructions, navigate back to the Login screen
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="lock" size={40} color="#FFA500" />
        <Text style={styles.headerText}>Forgot Password</Text>
      </View>
      <Text style={styles.instructionText}>
        Enter your email address below. We'll send you instructions to reset your password.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Send Reset Instructions</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backToLoginText}>Back to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
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
  instructionText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLoginText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#FFA500',
    fontSize: 16,
  },
});