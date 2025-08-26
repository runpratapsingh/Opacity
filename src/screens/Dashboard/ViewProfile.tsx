import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/theme';
import Header from '../../components/HeaderComp';
import { api } from '../../api';
import { ENDPOINTS } from '../../api/Endpoints';

type EmployeeDetails = {
  emp_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  emp_code: string;
  email: string;
  dob: string; // Format: "DD-MM-YYYY HH:mm:ss" — consider converting to Date if needed
  doj: string; // Same as above
  designation: string;
  image: string;
  department_id: number;
  department: string;
  manager: string;
  manager_id: number;
  contact_number: string;
  gender: 'Male' | 'Female' | string; // Add more values if applicable
  gender_id: number;
};

const EmployeeProfileScreen = () => {
  const navigation = useNavigation();
  const [employee, setEmployee] = useState<EmployeeDetails>();
  const route = useRoute();
  const { emp_id } = route.params;

  const fetchProfileData = async () => {
    try {
      const response = await api.get(ENDPOINTS.EMPLOYEE_PROFILE, {
        params: {
          emp_id: emp_id,
        },
      });

      if (response.data.status === 'success') {
        console.log('inside');

        setEmployee(response.data.Data[0]);
      }

      console.log(
        'res=============>View profile',
        response.data.Data[0],
        response,
        response.data.status,
      );
    } catch (error) {
      console.log('Error in viewProfile API', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Profile" />

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/male_placeholder.png')}
          style={styles.profileImage}
        />
        <Text
          style={styles.name}
        >{`${employee?.first_name} ${employee?.last_name}`}</Text>
        <Text style={styles.empId}>{employee?.emp_id}</Text>
      </View>

      {/* Details */}
      <View style={styles.infoBox}>
        <LabelValue label="Email Id:" value={employee?.email} isLink />
        <LabelValue label="Gender:" value={employee?.gender} />
        <LabelValue
          label="Contact Number:"
          value={employee?.contact_number}
          isLink
          phone
        />
        <LabelValue label="Designation:" value={employee?.designation} />
        <LabelValue label="Department:" value={employee?.department} />
        <LabelValue label="Reporting Manager:" value={employee?.manager} />
      </View>
    </View>
  );
};

const LabelValue = ({ label, value, isLink = false, phone = false }) => {
  const handlePress = () => {
    if (isLink && value) {
      const url = phone ? `tel:${value}` : `mailto:${value}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={handlePress} disabled={!isLink}>
        <Text style={[styles.value, isLink && styles.link]}>{value}</Text>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: 'gray',
          borderBottomWidth: 0.3,
          marginTop: 10,
          marginHorizontal: -40,
        }}
      ></View>
    </View>
  );
};

export default EmployeeProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: COLORS.primaryColor,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.primaryColor,
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  empId: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  infoBox: {
    padding: 16,
  },
  row: {
    flexDirection: 'column',
    marginBottom: 12,
  },
  label: {
    color: '#444',
    fontWeight: '600',
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  link: {
    color: '#1e88e5',
    textDecorationLine: 'underline',
  },
});
