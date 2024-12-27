import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack>
    <Stack.Screen name="index" options={{ title: 'Log In', headerShown: false }} />
    <Stack.Screen name="LoginPage" options={{ title: 'Log In', headerShown: false }} />
    <Stack.Screen name="RegistrationPage" options={{ title: 'Register' , headerShown: false}} />
    <Stack.Screen name="ForgotPasswordPage" options={{ title: 'Forgot Password' , headerShown: false}} />
    <Stack.Screen name="WelcomePage" options={{ title: 'Welcome' , headerShown: false}} />
  </Stack>
  );
}