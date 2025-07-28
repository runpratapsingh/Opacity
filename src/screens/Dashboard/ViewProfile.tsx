import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/theme';
import Header from '../../components/HeaderComp';

const EmployeeProfileScreen = () => {
  const navigation = useNavigation();

  const employee = {
    name: 'Anubhav Maheshwari',
    empId: 'P0012',
    email: 'anubhav@prudencesoftech.com',
    gender: 'Male',
    phone: '9811168227',
    designation: 'Managing Director',
    department: 'Common',
    manager: 'No Manager',
    image: 'https://i.ibb.co/SXRq8c4/sample-profile.jpg', // Replace with real image URL
  };

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
        <Text style={styles.name}>{employee.name}</Text>
        <Text style={styles.empId}>{employee.empId}</Text>
      </View>

      {/* Details */}
      <View style={styles.infoBox}>
        <LabelValue label="Email Id:" value={employee.email} isLink />
        <LabelValue label="Gender:" value={employee.gender} />
        <LabelValue
          label="Contact Number:"
          value={employee.phone}
          isLink
          phone
        />
        <LabelValue label="Designation:" value={employee.designation} />
        <LabelValue label="Department:" value={employee.department} />
        <LabelValue label="Reporting Manager:" value={employee.manager} />
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
    fontSize: 15,
    color: '#000',
    marginTop: 2,
  },
  link: {
    color: '#1e88e5',
    textDecorationLine: 'underline',
  },
});
