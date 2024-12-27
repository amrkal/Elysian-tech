import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function IndexPage() {
  const router = useRouter();

  // Automatically navigate to the login page after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/LoginPage'); // Navigate to the login page
    }, 0); // 3 seconds delay

    return () => clearTimeout(timeout); // Cleanup the timeout
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2D4DB3" />
      <Text style={styles.title}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#2D4DB3',
  },
});
