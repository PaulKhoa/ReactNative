import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './firebase';

const Stack = createStackNavigator();

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Đăng ký thành công!');
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Đăng ký thất bại', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Đăng ký" onPress={handleRegister} />
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('Đăng nhập thất bại', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Đăng nhập" onPress={handleLogin} />
      <Button title="Quên mật khẩu?" onPress={() => navigation.navigate('ForgetPassword')} />
    </View>
  );
};

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Đã gửi email đặt lại mật khẩu');
      })
      .catch(error => {
        Alert.alert('Gửi email thất bại', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Đặt lại mật khẩu" onPress={handleResetPassword} />
    </View>
  );
};

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Welcome!</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
