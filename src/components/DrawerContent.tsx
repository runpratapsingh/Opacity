import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS, FONTFAMILY } from '../theme/theme';
// import { logout } from '../utils/UtilsFn/Logout';
// import { appStorage } from '../utils/services/StorageHelper';
// import ConfirmLogoutAndExitModal from './ExitAndLogoutModalComp';
import { RootStackParamList } from '../navigation/StackNavigator';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    // try {
    //   await logout();
    //   setModalVisible(false);
    //   navigation.reset({
    //     index: 0,
    //     routes: [{ name: 'Login' }],
    //   });
    // } catch (error) {
    //   console.error('Logout error:', error);
    // }
  };

  const handleExitApp = () => {
    setModalVisible(false);
    BackHandler.exitApp();
  };

  const handleBackPress = () => {
    const navState = navigation.getState();
    const stackLength = navState?.routes.length || 0;

    if (stackLength <= 1) {
      setModalVisible(true);
      setTitle('Exit App');
      setMessage('Are you sure you want to exit the app?');
      setButtonText('Exit');
      return true;
    }
    return false;
  };

  const getUserName = async () => {
    // try {
    //   const userData = await appStorage.getUserData();
    //   if (userData !== null && userData.name) {
    //     setUserName(userData.name);
    //   }
    // } catch (error) {
    //   console.error('Error retrieving user name:', error);
    // }
  };

  useEffect(() => {
    getUserName();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            }}
            style={styles.userImage}
          />
          <Text style={styles.userName}>{userName || ''}</Text>
        </View>
        <View style={styles.drawerItemList}>
          <DrawerItemList {...props} />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          setModalVisible(true);
          setTitle('Logout');
          setMessage('Are you sure you want to logout?');
          setButtonText('Logout');
        }}
      >
        <View style={styles.logoutIconContainer}>
          <Icon name="sign-out-alt" size={25} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </TouchableOpacity>

      {/* <ConfirmLogoutAndExitModal
        visible={modalVisible}
        title={title}
        message={message}
        buttonText={buttonText}
        onClose={() => setModalVisible(false)}
        onConfirm={title === 'Logout' ? handleLogout : handleExitApp}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: COLORS.primaryColor,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: FONTFAMILY.bold,
    color: '#fff',
  },
  drawerItemList: {
    width: '100%',
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#ff4c4c',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTFAMILY.bold,
    marginLeft: 10,
  },
});

export default CustomDrawerContent;
