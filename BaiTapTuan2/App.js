import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebase';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import ForgetPasswordScreen from './ForgetPasswordScreen';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="ForgetPassword" 
      component={ForgetPasswordScreen} 
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(user ? true : false);
    });

    return unsubscribe;
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
