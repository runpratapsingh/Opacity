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

const { height, width } = Dimensions.get('window');

type ModalType = 'success' | 'error';

const LoginScreen: React.FC = () => {
  const [employeeCode, setEmployeeCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [type, setType] = useState<ModalType>('success');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    if (employeeCode && password) {
      navigation.replace('Dashboard');
    } else {
      setType('error');
      setModalVisible(true);
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
            message={
              type === 'success'
                ? 'Operation Successful!'
                : 'Please enter both Employee Code and Password!'
            }
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
