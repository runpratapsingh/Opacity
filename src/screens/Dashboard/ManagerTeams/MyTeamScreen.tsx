import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import Header from '../../../components/HeaderComp';
import { COLORS } from '../../../theme/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/StackNavigator';
import { useNavigation } from '@react-navigation/native';

const ImageBaseUrl = 'http://apiotstest.prudencesoftech.in/UploadFiles/';

type TimeSheetScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyTeam'
>;

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
  GENDER: 'Male' | 'Female' | string;
};

const MyTeamScreen: React.FC = () => {
  const navigation = useNavigation<TimeSheetScreenNavigationProp>();

  const filteredEmployees: Employee[] = [
    {
      EMP_ID: 309,
      EMP_CODE: 'IN020',
      EMP_NAME: 'Abhikant  Pratap Singh',
      DEPARTMENT_NAME: 'Bespoke',
      DESIGNATION: 'Technical Intern',
      PROFILE_PIC: '',
      EMAIL: '',
      CONTACT: '9555803069',
      ROLE: 3,
      GENDER_ID: 1,
      GENDER: 'Male',
    },
    {
      EMP_ID: 2,
      EMP_CODE: 'P0004',
      EMP_NAME: 'Abhinav  Singh',
      DEPARTMENT_NAME: 'Common',
      DESIGNATION: 'Director - Projects',
      PROFILE_PIC: 'cropped1418687814908732737.jpg',
      EMAIL: '',
      CONTACT: '9811083763',
      ROLE: 2,
      GENDER_ID: 1,
      GENDER: 'Male',
    },
    {
      EMP_ID: 303,
      EMP_CODE: 'IN019',
      EMP_NAME: 'Akhilesh  Tiwari',
      DEPARTMENT_NAME: 'Microsoft',
      DESIGNATION: 'Technical Intern',
      PROFILE_PIC: '287202_kjsnu8a4.jpeg',
      EMAIL: '',
      CONTACT: '8948995255',
      ROLE: 3,
      GENDER_ID: 1,
      GENDER: 'Male',
    },
    {
      EMP_ID: 305,
      EMP_CODE: 'PA011',
      EMP_NAME: 'Anil  Chugh',
      DEPARTMENT_NAME: 'Marketing',
      DESIGNATION: 'NAVPBS Consultant',
      PROFILE_PIC: '',
      EMAIL: '',
      CONTACT: '9810184495',
      ROLE: 3,
      GENDER_ID: 1,
      GENDER: 'Male',
    },
    {
      EMP_ID: 5,
      EMP_CODE: 'P0012',
      EMP_NAME: 'Anubhav  Maheshwari',
      DEPARTMENT_NAME: 'Common',
      DESIGNATION: 'Managing Director',
      PROFILE_PIC: 'cropped3096884249312108262.jpg',
      EMAIL: '',
      CONTACT: '9811168227',
      ROLE: 2,
      GENDER_ID: 1,
      GENDER: 'Male',
    },
  ];

  const renderItem = ({ item }: { item: Employee }) => {
    const imageSource =
      item.GENDER === 'Female'
        ? require('../../../assets/female_placeholder.png')
        : require('../../../assets/male_placeholder.png');

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.card}
        onPress={() => navigation.navigate('MemberDashboard')}
      >
        <Image source={imageSource} style={styles.profilePic} />
        <View style={styles.textBox}>
          <Text style={styles.name}>{item.EMP_NAME}</Text>
          <Text style={styles.title}>{item.DESIGNATION}</Text>
          <Text style={styles.department}>{item.DEPARTMENT_NAME}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Header title="Team Members" />
      <FlatList
        data={filteredEmployees}
        keyExtractor={item => item.EMP_ID.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default MyTeamScreen;

const styles = StyleSheet.create({
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
