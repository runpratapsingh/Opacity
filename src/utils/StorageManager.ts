import AsyncStorage from '@react-native-async-storage/async-storage';

// Key for storing user data

const StorageKeys = {
  USER_DATA_KEY: '@User:userData',
  AUTHORIZED: '@User:authorized',
};

// Define the type for the user data (based on your login response)
export interface UserData {
  emp_id: number;
  emp_name: string;
  emp_code: string;
  role: number;
  emp_type: number;
  email: string;
  contact: string;
  image: string;
  gender: string;
  gender_id: number;
  designation: string;
  DEPARTMENT_ID: number;
  department_name: string;
}

// Save user data
export const setUserData = async (userData: UserData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem(StorageKeys.USER_DATA_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Get user data
export const getUserData = async (): Promise<UserData | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(StorageKeys.USER_DATA_KEY);
    return jsonValue != null ? (JSON.parse(jsonValue) as UserData) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

// Remove user data
export const removeUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(StorageKeys.USER_DATA_KEY);
  } catch (error) {
    console.error('Error removing user data:', error);
  }
};

// Check if user is authorized
export const isUserAuthorized = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(StorageKeys.AUTHORIZED);
    return value === 'true';
  } catch (error) {
    console.error('Error checking user authorization:', error);
    return false;
  }
};

// Set user as authorized
export const setUserAuthorized = async (authorized: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(StorageKeys.AUTHORIZED, String(authorized));
  } catch (error) {
    console.error('Error setting user authorization:', error);
  }
};
