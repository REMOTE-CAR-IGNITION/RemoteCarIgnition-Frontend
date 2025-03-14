import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Adjust based on your router setup

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Using router for navigation

  const handleLogin = () => {
    router.push('/(base)/ConnectedVehiclesScreen')
    // Implement login logic here
    console.log('Login pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="lock" size={40} color="#FFA500" />
        <Text style={styles.headerText}>Welcome Back</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email or Phone Number"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={() => router.push('/(auth)/ForgotPasswordScreen')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(auth)/SignUpScreen')}>
        <Text style={styles.signupLink}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
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
  forgotPassword: {
    textAlign: 'right',
    color: '#FFA500',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupLink: {
    textAlign: 'center',
    marginTop: 20,
    color: '#FFA500',
    fontSize: 16,
  },
});