import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../api';
import { ENDPOINTS } from '../../api/Endpoints';

const ImageBaseUrl = 'http://apiotstest.prudencesoftech.in/UploadFiles/';

type TimeSheetScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type Employee = {
  EMP_ID: number;
  EMP_CODE: string;
  EMP_NAME: string;
  DEPARTMENT_NAME: string;
  DESIGNATION: string;
  PROFILE_PIC: string;
  EMAIL: string;
  CONTACT: string;
  ROLE: number;
  GENDER_ID: number;
  GENDER: 'Male' | 'Female' | string; // adjust if more gender types can exist
};

const EmployeeListScreen = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<TimeSheetScreenNavigationProp>();
  const [employeeData, setEployeeData] = useState<Array<Employee>>();

  const filteredEmployees =
    employeeData &&
    employeeData.filter(emp =>
      emp.EMP_NAME.toLowerCase().includes(search.toLowerCase()),
    );

  const fetchEmployeeData = async () => {
    try {
      const response = await api.get(ENDPOINTS.EXPENSE_EMPLOYEES_LIST);
      console.log('Res========>', response.data);
      if (response.data.status === 'Success') {
        setEployeeData(response.data.Data.Employee_List);
      }
    } catch (error) {
      console.log('Error in the fetch emplyee data', error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={() =>
        navigation.navigate('ViewProfile', { emp_id: item.EMP_ID })
      }
    >
      {/* {item.image ? ( */}
      <Image
        // source={require('../../assets/male_placeholder.png')}
        source={
          item.PROFILE_PIC
            ? { uri: `${ImageBaseUrl}${item.PROFILE_PIC}` }
            : item.GENDER === 'Female'
            ? require('../../assets/female_placeholder.png')
            : require('../../assets/male_placeholder.png')
        }
        style={styles.profilePic}
      />
      {/* ) : (
        <View style={styles.placeholder}>
          <Icon name="account" size={40} color={COLORS.primaryColor} />
        </View>
      )} */}
      <View style={styles.textBox}>
        <Text style={styles.name}>{item.EMP_NAME}</Text>
        <Text style={styles.title}>{item.DESIGNATION}</Text>
        <Text style={styles.department}>{item.DEPARTMENT_NAME}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search Profile"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Count */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>
          Total Employees: {filteredEmployees && filteredEmployees.length}
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={filteredEmployees}
        keyExtractor={item => item.EMP_ID}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default EmployeeListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: {
    backgroundColor: '#fff',
    flex: 1,
    height: 40,
    marginLeft: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#000',
  },
  totalBox: {
    backgroundColor: '#000',
    paddingVertical: 8,
    alignItems: 'center',
  },
  totalText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 8,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },
  placeholder: {
    width: 70,
    height: 70,
    borderRadius: 27,
    borderColor: COLORS.primaryColor,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textBox: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  title: {
    fontSize: 13,
    color: '#444',
  },
  department: {
    fontSize: 13,
    color: '#777',
  },
});
