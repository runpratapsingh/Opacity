import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomDropdown from '../../components/CustumDropdown';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import Header from '../../components/HeaderComp';

const CheckInScreen: React.FC = () => {
  const [work, setWork] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Define options for the dropdown
  const workOptions = [
    { id: '1', name: 'Office' },
    { id: '2', name: 'Work From Home' },
    { id: '3', name: 'Client Location' },
    { id: '4', name: 'Travel Time' },
  ];

  useEffect(() => {
    // Set the initial date and time
    setCurrentDateTime(new Date());
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleRefresh = () => {
    // Update the current date and time
    setCurrentDateTime(new Date());
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date
      .toLocaleString('default', { month: 'short' })
      .toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header
        title="Check In"
        rightIconName="refresh"
        onRightIconPress={handleRefresh}
      />

      {/* Date and Time */}
      <View style={styles.row}>
        <View style={styles.dateTimeBox}>
          <FontAwesome5 name="calendar-alt" size={18} color="#4158F4" />
          <Text style={styles.dateTimeText}>{formatDate(currentDateTime)}</Text>
        </View>
        <View style={styles.dateTimeBox}>
          <FontAwesome5 name="clock" size={18} color="#4158F4" />
          <Text style={styles.dateTimeText}>{formatTime(currentDateTime)}</Text>
        </View>
      </View>

      {/* Work Dropdown */}
      <View style={{ marginHorizontal: 10 }}>
        <CustomDropdown
          label="Select Work"
          selectedValue={work}
          onValueChange={itemId => setWork(itemId.toString())}
          placeholder="Select Work"
          options={workOptions}
          loading={false}
          showLabel={false}
        />
      </View>

      {/* Description */}
      <TextInput
        placeholder="Description"
        placeholderTextColor={'#555'}
        style={[styles.inputBox, styles.textArea]}
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      {/* Location Box */}
      <View style={styles.locationRow}>
        <View style={styles.locationBox}>
          <Text style={styles.locationText}>
            Faridabad 121010 20, Ekta Nagar, Faridabad, Haryana 121010, India
          </Text>
        </View>
        <TouchableOpacity style={styles.mapButton}>
          <FontAwesome5 name="map-marker-alt" size={18} color="red" />
          <Text style={styles.mapText}>View Map</Text>
        </TouchableOpacity>
      </View>

      {/* History Link */}
      <TouchableOpacity>
        <Text style={styles.historyLink}>View History</Text>
      </TouchableOpacity>

      {/* Check In Button */}
      <TouchableOpacity style={styles.checkInButton}>
        <Text style={styles.checkInText}>CHECK IN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#4158F4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  dateTimeBox: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4158F4',
    padding: 10,
    borderRadius: 10,
  },
  dateTimeText: {
    color: '#4158F4',
    fontSize: 16,
    fontWeight: '500',
  },
  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4158F4',
    paddingHorizontal: 12,
    marginHorizontal: 10,
    marginBottom: 16,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  iconLeft: {
    marginRight: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
    marginBottom: 16,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#4158F4',
  },
  locationBox: {
    flex: 1,
    padding: 10,
  },
  locationText: {
    fontSize: 14,
    color: '#444',
  },
  mapButton: {
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4158F4',
    margin: 10,
    borderRadius: 10,
  },
  mapText: {
    color: '#4158F4',
    fontWeight: '600',
    marginTop: 4,
  },
  historyLink: {
    color: '#4158F4',
    textAlign: 'right',
    marginBottom: 24,
    fontWeight: '500',
    fontSize: 15,
    marginRight: 10,
  },
  checkInButton: {
    backgroundColor: '#4158F4',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  checkInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckInScreen;
