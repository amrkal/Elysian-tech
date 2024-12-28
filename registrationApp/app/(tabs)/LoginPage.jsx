import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import GlobalStyles from '../../styles/GlobalStyles';
import axiosInstance from '../../services/axiosInstance';


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  

  const handleLogin = async () => {

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    console.log('new login');
    setError('');  // Clear any previous error
    console.log('new login');
    const userData = {
      email,
      password,
    };

        console.log('new login');
    try {
      
      const response = await axiosInstance.post('/users/login', userData); // Assuming you have a login route
      console.log('Login successful:', response.data);

      if (response.status === 200) {
        router.push('WelcomePage'); // Navigate to the WelcomePage on successful login
      } else {
        setError('Invalid credentials'); // Handle invalid credentials
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      console.error('Login failed:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axiosInstance.get('/auth/login/google');
      console.log('Google Login successful:', response.data);
      router.push('WelcomePage');
    } catch (error) {
      console.error('Google Login failed:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const response = await axiosInstance.get('/auth/login/facebook');
      console.log('Facebook Login successful:', response.data);
      router.push('WelcomePage');
    } catch (error) {
      console.error('Facebook Login failed:', error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
    <View style={GlobalStyles.container}>
      {/* Logo */}
      <View style={GlobalStyles.logoContainer}>
        <Image source={require('../../assets/images/Logo.png')} style={GlobalStyles.logo} />
      </View>

      {/* Title */}
      <Text style={GlobalStyles.title}>Log in</Text>

      {/* Email Input */}
      <View style={GlobalStyles.inputContainer}>
        <Icon name="email-outline" size={20} color="#888" style={GlobalStyles.icon} />
        <TextInput
          style={GlobalStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
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
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={GlobalStyles.icon}>
          <Icon
            name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity
        onPress={() => router.push('ForgotPasswordPage')}
        style={GlobalStyles.forgotPassword}>
        <Text style={GlobalStyles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={GlobalStyles.loginButton} onPress={handleLogin}>
        <Text style={GlobalStyles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      {/* Or Divider */}
      <View style={GlobalStyles.dividerContainer}>
        <View style={GlobalStyles.divider} />
        <Text style={GlobalStyles.orText}>Or</Text>
        <View style={GlobalStyles.divider} />
      </View>

      {/* Social Buttons */}
      <View style={GlobalStyles.socialContainer}>
        <TouchableOpacity style={GlobalStyles.socialButton} onPress={handleGoogleLogin}>
          <Image
            source={require('../../assets/images/google-icon.png')}
            style={GlobalStyles.socialIcon}
          />
          <Text style={GlobalStyles.socialText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={GlobalStyles.socialButton}
          onPress={handleFacebookLogin}>
          <Image
            source={require('../../assets/images/facebook-icon.png')}
            style={GlobalStyles.socialIcon}
          />
          <Text style={GlobalStyles.socialText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      {/* Register */}
      <Text style={GlobalStyles.registerText}>Have no account yet?</Text>
      <View style={GlobalStyles.registerContainer}>
        <TouchableOpacity 
          style={GlobalStyles.loginButton} 
          onPress={() => router.push('RegistrationPage')}
        >
          <Text style={GlobalStyles.loginButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};



export default LoginPage;
