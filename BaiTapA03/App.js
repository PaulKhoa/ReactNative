import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './screen/RegisterScreen';
import LoginScreen from './screen/LoginScreen';
import HomeScreen from './screen/HomeScreen';
import ForgetPasswordScreen from './screen/ForgetPasswordScreen';
import UserScreen from './screen/UserScreen'; // Import UserScreen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Đăng Ký' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Đăng Nhập' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Trang Chủ' }} 
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPasswordScreen}
          options={{ title: 'Quên Mật Khẩu' }}
        />
        <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={{ title: 'Thông Tin Người Dùng' }} // Tùy chọn tiêu đề màn hình
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;