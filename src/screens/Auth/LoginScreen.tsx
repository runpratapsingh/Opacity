import React, { useState } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import CustomTextInput from '../../components/CustumInput';
import CustomModal from '../../components/CustumModal';
import axios from 'axios';
import { ENDPOINTS } from '../../api/Endpoints';
import { LoginRequest, LoginResponse } from '../../types/api.types';
import { api, HEADERS } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserAuthorized, setUserData } from '../../utils/StorageManager';

const { height, width } = Dimensions.get('window');

type ModalType = 'success' | 'error';

const LoginScreen: React.FC = () => {
  const [employeeCode, setEmployeeCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [type, setType] = useState<ModalType>('success');
  const [message, setMessage] = useState<string>('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!employeeCode || !password) {
      setType('error');
      setModalVisible(true);
      return;
    }

    const loginPayload: LoginRequest = {
      user_name: employeeCode,
      password: password,
      company_code: 'PTPL',
    };

    try {
      const response = await api.post<LoginResponse>(
        ENDPOINTS.LOGIN,
        loginPayload,
      );

      if (response?.data?.status === 'success') {
        console.log('Login success:', response.data);
        await setUserData(response.data.Data.emp_details[0]);
        await setUserAuthorized(true);
        navigation.replace('Dashboard');
      } else {
        console.error('Login failed:', response.data.message);
        setType('error');
        setModalVisible(true);
        setMessage(
          response?.data?.message || 'Login failed. Please try again.',
        );
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setType('error');
      setModalVisible(true);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
          <View
            style={{
              alignItems: 'center',
              height: height - height / 1.7,
              paddingTop: height * 0.13,
            }}
          >
            <Image
              source={require('../../assets/Logo.png')}
              style={{ width: 150, height: 150 }}
            />
            <Text
              style={{ fontSize: 24, fontWeight: 'bold', color: '#0C2646' }}
            >
              𝕆ℙ𝔸ℂ𝕀𝕋𝕐
            </Text>
          </View>
          {/* Curved background at the bottom with text inside */}
          <View style={styles.bottomCurve}>
            <View style={{ paddingTop: height * 0.08 }}>
              <CustomTextInput
                placeholder="Employee Code"
                icon="account-outline"
                value={employeeCode}
                onChangeText={setEmployeeCode}
              />
              <CustomTextInput
                placeholder="Password"
                icon="lock-outline"
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    onPress={() => setShowPassword(!showPassword)}
                    color={'#FFF'}
                  />
                }
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleForgotPassword}
                style={{ marginTop: 15 }}
              >
                <Text style={{ color: '#FFF', textAlign: 'center' }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <CustomModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            type={type}
            message={message}
            autoClose={false}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  bottomCurve: {
    width: width * 1.7,
    height: height / 1.7,
    backgroundColor: '#4158F4',
    borderTopLeftRadius: width,
    borderTopRightRadius: width,
    alignSelf: 'center',
    alignItems: 'center',
  },
  loginButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#000',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default LoginScreen;
