import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/Dashboard';
import LoginScreen from '../screens/Auth/LoginScreen';
import SplashScreen from '../screens/SplaceScreen';
import DashboardScreen1 from '../screens/Dashboard1';
import ForgotPassword from '../screens/Auth/ForgotPassword';

export type RootStackParamList = {
  Dashboard: undefined;
  Login: undefined;
  Splash: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen1} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
