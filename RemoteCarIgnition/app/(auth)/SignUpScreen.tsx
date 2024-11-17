import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Adjust based on your router setup

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const router = useRouter(); // Using router for navigation

  const handleSignup = () => {
    // Implement signup logic here
    console.log('Signup pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Feather name="user-plus" size={40} color="#FFA500" />
          <Text style={styles.headerText}>Create Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={() => setAgreeToTerms(!agreeToTerms)}>
            <Feather
              name={agreeToTerms ? 'check-square' : 'square'}
              size={24}
              color="#FFA500"
            />
          </TouchableOpacity>
          <Text style={styles.termsText}>I agree to the Terms and Conditions</Text>
        </View>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)/LoginScreen')}>
          <Text style={styles.loginLink}>Already have an account? Log In</Text>
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666666',
  },
  signupButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: 20,
    color: '#FFA500',
    fontSize: 16,
  },
});