import React, { useState } from 'react';
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

type TimeSheetScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const employeeData = [
  {
    id: '1',
    name: 'Abhinav Singh',
    title: 'Director - Projects',
    department: 'Common',
  },
  {
    id: '2',
    name: 'Akhilesh Tiwari',
    title: 'Technical Intern',
    department: 'Microsoft',
  },
  {
    id: '3',
    name: 'Anil Chugh',
    title: 'NAVPBS Consultant',
    department: 'Marketing',
  },
  {
    id: '4',
    name: 'Anubhav Maheshwari',
    title: 'Managing Director',
    department: 'Common',
  },
  {
    id: '5',
    name: 'Nitika Chawla',
    title: 'NAV Technical Consultant',
    department: 'Technical',
  },
  {
    id: '6',
    name: 'Abhishek Mishra',
    title: 'Functional Consultant',
    department: 'Functional',
  },
  {
    id: '7',
    name: 'Gurvinder Singh',
    title: 'Salesforce Developer',
    department: 'Development',
  },
  {
    id: '8',
    name: 'Arun Pratap Singh',
    title: 'MERN Stack Developer',
    department: 'Development',
  },
  {
    id: '9',
    name: 'Priya Sharma',
    title: 'HR Executive',
    department: 'HR',
  },
  {
    id: '10',
    name: 'Siddharth Gupta',
    title: 'Data Analyst',
    department: 'Analytics',
  },
  {
    id: '11',
    name: 'Megha Jain',
    title: 'UI/UX Designer',
    department: 'Design',
  },
  {
    id: '12',
    name: 'Rahul Yadav',
    title: 'Network Engineer',
    department: 'IT',
  },
  {
    id: '13',
    name: 'Kritika Singh',
    title: 'Finance Analyst',
    department: 'Finance',
  },
  {
    id: '14',
    name: 'Mohit Verma',
    title: 'Marketing Specialist',
    department: 'Marketing',
  },
  {
    id: '15',
    name: 'Sneha Kapoor',
    title: 'Content Writer',
    department: 'Content',
  },
  {
    id: '16',
    name: 'Kunal Malhotra',
    title: 'QA Engineer',
    department: 'Quality',
  },
  {
    id: '17',
    name: 'Simran Ahuja',
    title: 'Legal Advisor',
    department: 'Legal',
  },
  {
    id: '18',
    name: 'Rajat Saxena',
    title: 'Project Manager',
    department: 'Management',
  },
  {
    id: '19',
    name: 'Tanya Joshi',
    title: 'Business Analyst',
    department: 'Business',
  },
  {
    id: '20',
    name: 'Yash Mehta',
    title: 'DevOps Engineer',
    department: 'DevOps',
  },
];

const EmployeeListScreen = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<TimeSheetScreenNavigationProp>();

  const filteredEmployees = employeeData.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={() => navigation.navigate('ViewProfile')}
    >
      {/* {item.image ? ( */}
      <Image
        source={require('../../assets/male_placeholder.png')}
        style={styles.profilePic}
      />
      {/* ) : (
        <View style={styles.placeholder}>
          <Icon name="account" size={40} color={COLORS.primaryColor} />
        </View>
      )} */}
      <View style={styles.textBox}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.department}>{item.department}</Text>
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
          Total Employees: {filteredEmployees.length}
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={filteredEmployees}
        keyExtractor={item => item.id}
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
