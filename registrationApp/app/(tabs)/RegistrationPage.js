import React, { useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import GlobalStyles from '../../styles/GlobalStyles';
import axiosInstance from '../../services/axiosInstance';
import axios from 'axios';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');


    // Fetch random message and show toast
    const fetchRandomMessage = async () => {
      try {
        // Fetch random message from Node.js server
        const randomMessageResponse = await axios.get('http://192.168.0.178:5001/random-message');
        const randomMessage = randomMessageResponse.data.message;
  
        // Show toast message with the random content from the Node.js server
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Welcome!',
          text2: randomMessage,
        });
  
      } catch (error) {
        setError(error.response?.data?.message || 'Something went wrong');
        console.error('Error fetching random message:', error);
      }
    };
  
    useEffect(() => {
      fetchRandomMessage();  // Fetch message when page loads
    }, []);  // Empty dependency array means it will only run once when the page loads
  

  const handleRegister = async () => {
    // Input validation
    if (!name || !surname || !phone || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {  // Simple email regex validation
      setError('Please enter a valid email.');
      return;
    }
    if (password.length < 6) {  // Password must be at least 6 characters
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {  // Simple phone number validation (10 digits)
      setError('Please enter a valid phone number.');
      return;
    }
  
    setError('');  // Clear previous error
  
    const userData = {
      name,
      surname,
      phone,
      email,
      password,
    };
  
    console.log("Register button pressed");
  
    try {
      console.log("Preparing to make API call...");
      const response = await axiosInstance.post('/users/create', userData);
      console.log('Response:', response.data);
  
      if (response.status === 201) {
        router.push('WelcomePage'); // Navigate to WelcomePage
      } else {
        setError('Unexpected response from server');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Something went wrong');
      } else {
        setError('No response from server');
      }
      console.error('Error occurred:', error);
    }
  };
  
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={GlobalStyles.container}>
              {/* Logo */}
              <View style={GlobalStyles.logoContainer}>
                <Image
                  source={require('../../assets/images/Logo.png')}
                  style={GlobalStyles.logo}
                />
              </View>
              <Text style={GlobalStyles.title}>Register</Text>

              {/* Error Message */}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              {/* Name and Surname in Same Row */}
              <View style={GlobalStyles.rowContainer}>
                <View style={[GlobalStyles.inputContainer, GlobalStyles.halfWidth]}>
                  <Icon
                    name="account-outline"
                    size={20}
                    color="#888"
                    style={GlobalStyles.icon}
                  />
                  <TextInput
                    style={GlobalStyles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                      setError('');
                    }}
                  />
                </View>
                <View style={[GlobalStyles.inputContainer, GlobalStyles.halfWidth]}>
                  <Icon
                    name="account-outline"
                    size={20}
                    color="#888"
                    style={GlobalStyles.icon}
                  />
                  <TextInput
                    style={GlobalStyles.input}
                    placeholder="Surname"
                    value={surname}
                    onChangeText={(text) => {
                      setSurname(text);
                      setError('');
                    }}
                  />
                </View>
              </View>

              {/* Phone Number Input */}
              <View style={GlobalStyles.inputContainer}>
                <Icon
                  name="phone-outline"
                  size={20}
                  color="#888"
                  style={GlobalStyles.icon}
                />
                <TextInput
                  style={GlobalStyles.input}
                  placeholder="Phone Number"
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                    setError('');
                  }}
                  keyboardType="phone-pad"
                />
              </View>

              {/* Email Input */}
              <View style={GlobalStyles.inputContainer}>
                <Icon
                  name="email-outline"
                  size={20}
                  color="#888"
                  style={GlobalStyles.icon}
                />
                <TextInput
                  style={GlobalStyles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setError('');
                  }}
                  keyboardType="email-address"
                />
              </View>

              {/* Password Input */}
              <View style={GlobalStyles.inputContainer}>
                <Icon
                  name="lock-outline"
                  size={20}
                  color="#888"
                  style={GlobalStyles.icon}
                />
                <TextInput
                  style={GlobalStyles.input}
                  placeholder="Password"
                  value={password}
                  secureTextEntry
                  onChangeText={(text) => {
                    setPassword(text);
                    setError('');
                  }}
                />
              </View>

              {/* Confirm Password Input */}
              <View style={GlobalStyles.inputContainer}>
                <Icon
                  name="lock-outline"
                  size={20}
                  color="#888"
                  style={GlobalStyles.icon}
                />
                <TextInput
                  style={GlobalStyles.input}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  secureTextEntry
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setError('');
                  }}
                />
              </View>

              {/* Register Button */}
              <TouchableOpacity style={GlobalStyles.loginButton} onPress={handleRegister}>
                <Text style={GlobalStyles.loginButtonText}>Register</Text>
              </TouchableOpacity>

              {/* Go Back to Login */}
              <View style={GlobalStyles.registerContainer}>
                <Text style={GlobalStyles.registerText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push('LoginPage')}>
                  <Text style={GlobalStyles.registerLink}> Log in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

export default RegistrationPage;
