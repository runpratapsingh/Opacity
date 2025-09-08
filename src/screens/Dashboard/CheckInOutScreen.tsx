import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from '../../components/HeaderComp';
import { api, BASE_URL, HEADERS } from '../../api';
import { ENDPOINTS } from '../../api/Endpoints';
import { getUserData } from '../../utils/StorageManager';
import CustomDropdown from '../../components/CustumDropdown';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
const GOOGLE_API_KEY = 'AIzaSyAFnBkU725a9jAMm4JCE5rnHOM20z9H2YE';
type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

const CheckInScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const [work, setWork] = useState<string>('');
  const [customer, setCustomer] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [serverDate, setServerDate] = useState<string>('');
  const [serverTime, setServerTime] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(28.414881);
  const [longitude, setLongitude] = useState<number>(77.309692);
  const [city, setCity] = useState<string>(
    'Faridabad 121010, Ekta Nagar, Faridabad, Haryana 121010, India',
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customerOptions, setCustomerOptions] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [workOptions, setWorkOptions] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [checkInRefId, setCheckInRefId] = useState<string>('');
  const isFocus = useIsFocused();

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [address, setAddress] = useState('');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      Geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`,
            );

            console.log('hjhgdajhgdashfsa', response.data);

            if (response.data.results.length > 0) {
              setAddress(response.data.results[0].formatted_address);
            }
          } catch (error) {
            console.log('Error fetching address:', error);
          }
        },
        error => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } catch (error) {
      console.log('fsjdhfkjsdfgshfhfsdfsdfds', error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getFormattedCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' }); // Aug
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getCheckInOutPastData = async () => {
    try {
      const userData = await getUserData();
      const response = await api.get(ENDPOINTS.GET_CHECK_INS, {
        params: { emp_id: userData?.emp_id },
      });

      console.log(
        'sfkjshfsdjkfhsjkdfsd',
        response.data,
        response.data.Data &&
          response.data.Data.past_checkIn &&
          response.data.Data.past_checkIn.length > 0,
      );

      if (response.data.status === 'Success') {
        setServerDate(response.data.ServerDate);
        setServerTime(response.data.ServerTime);
        if (
          response.data.Data &&
          response.data.Data.past_checkIn &&
          response.data.Data.past_checkIn.length > 0
        ) {
          setIsCheckedIn(true);
          console.log('jfhsajkfhaskjf');

          setCheckInRefId(response.data.Data.past_checkIn[0].chk_in_id);
          setWork(response.data.Data.past_checkIn[0].worktype_id.toString());
          if (
            response.data.Data.past_checkIn[0].worktype_id.toString() === '2'
          ) {
            setCustomer(
              response.data.Data.past_checkIn[0].customer_id.toString(),
            );
          }
          setDescription(response.data.Data.past_checkIn[0].remark);
        }
      } else {
        setIsCheckedIn(false);
      }
    } catch (error) {
      console.error('Error fetching check-in/out data:', error);
    }
  };

  const fetchCustomerOptions = async () => {
    try {
      const user = await getUserData();
      console.log('User from storage:', user);
      // const response = await api.get(ENDPOINTS.TIMESHEET_DROPDOWN, {
      //   // params: {
      //   //   emp_id: user?.emp_id,
      //   // },
      // });

      const response = await axios({
        method: 'POST',
        url: `${BASE_URL}${ENDPOINTS.TIMESHEET_DROPDOWN}`,
        headers: HEADERS,
        params: {
          comeFrom: 'CheckInOut',
          PostingDate: getFormattedCurrentDate(),
          emp_id: user?.emp_id,
        },
      });

      console.log('Customer Options Response:', response.data);
      if (response.data.status === 'success' && response.data.Data) {
        const customers = response.data.Data.customer || [];
        const formattedCustomers = customers.map((cust: any) => ({
          id: cust.Value,
          name: cust.Text,
        }));
        setCustomerOptions(formattedCustomers);
      } else {
        setCustomerOptions([]);
      }

      // }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };
  const fetchWorkOptions = async () => {
    try {
      const userData = await getUserData();
      // const response = await api.post(ENDPOINTS.TIMESHEET_DROPDOWN, {
      //   params: {
      //     comeFrom: 'CheckInOut',
      //     PostingDate: getFormattedCurrentDate(),
      //     emp_id: userData?.emp_id,
      //   },
      // });

      const response = await axios({
        method: 'POST',
        // url: 'http://apiotstest.prudencesoftech.in/api/binddropdown/CustomerList',
        url: `${BASE_URL}${ENDPOINTS.TIMESHEET_DROPDOWN}`,
        headers: HEADERS,
        params: {
          comeFrom: 'CheckInOut',
          PostingDate: getFormattedCurrentDate(),
          emp_id: userData?.emp_id,
        },
      });

      console.log('Work Options Response:', response.data);
      if (response.data.status === 'success' && response.data.Data) {
        const workTypes = response.data.Data.work_type || [];
        const formattedWorkTypes = workTypes.map((work: any) => ({
          id: work.Value,
          name: work.Text,
        }));
        setWorkOptions(formattedWorkTypes);
      } else {
        setCustomerOptions([]);
      }

      // }
    } catch (error) {
      console.error('Error fetching workoption data:', error);
    }
  };

  useEffect(() => {
    getCheckInOutPastData();
    fetchWorkOptions();
  }, [isFocus]);

  useEffect(() => {
    if (work === '2') {
      fetchCustomerOptions();
    }
  }, [work]);

  const handleRefresh = () => {
    getCheckInOutPastData();
  };

  const callCheckInApi = async () => {
    if (latitude === 0.0 && longitude === 0.0) {
      Alert.alert(
        'Error',
        'Location is not detecting. Please press the reload button.',
      );
      return;
    }

    if (work == '') {
      Alert.alert('Error', 'Please select a work type.');
      return;
    }

    setIsLoading(true);

    try {
      const userData = await getUserData();
      const response = await api.post(ENDPOINTS.CHECK_IN, {
        Chk_in_id: 0,
        Emp_id: userData?.emp_id,
        Chk_in_lat: latitude.toString(),
        Chk_in_long: longitude.toString(),
        location: city,
        Chk_in_date: serverTime,
        worktype_id: work,
        customer_id: work === '8' ? '113' : customer,
        project_id: work === '8' ? '65' : '0',
        remark: description,
      });

      console.log('fkjskfjskfdkfd', ENDPOINTS.CHECK_IN, {
        Chk_in_id: 0,
        Emp_id: userData?.emp_id,
        Chk_in_lat: latitude.toString(),
        Chk_in_long: longitude.toString(),
        location: city,
        Chk_in_date: serverTime,
        worktype_id: work,
        customer_id: work === '8' ? '113' : customer,
        project_id: work === '8' ? '65' : '0',
        remark: description,
      });

      if (response.data.status === 'Success') {
        // Alert.alert('Success', 'Check-in successful');
        Alert.alert(
          'Success',
          'Check-in successful',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(), // 👈 Go back when OK pressed
            },
          ],
          { cancelable: false },
        );
        setIsCheckedIn(true);
      } else {
        Alert.alert('Error', response.data.message || 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'Server is not responding');
    } finally {
      setIsLoading(false);
    }
  };

  const callCheckOutApi = async () => {
    if (latitude === 0.0 && longitude === 0.0) {
      Alert.alert(
        'Error',
        'Location is not detecting. Please press the reload button.',
      );
      return;
    }

    setIsLoading(true);

    try {
      const userData = await getUserData();
      const response = await api.post(ENDPOINTS.CHECK_OUT, {
        Chk_in_id: checkInRefId,
        Emp_id: userData?.emp_id,
        Chk_out_lat: latitude.toString(),
        Chk_out_long: longitude.toString(),
        location: city,
        Chk_out_date: serverTime,
        worktype_id: work,
        customer_id: work === '8' ? '113' : customer,
        project_id: work === '8' ? '65' : '0',
        remark: description,
      });

      console.log('dkljdskdjslkdjs CheckOut', response.data, {
        Chk_in_id: checkInRefId,
        Emp_id: userData?.emp_id,
        Chk_out_lat: latitude.toString(),
        Chk_out_long: longitude.toString(),
        location: city,
        Chk_out_date: serverTime,
        worktype_id: work,
        customer_id: work === '8' ? '113' : customer,
        project_id: work === '8' ? '65' : '0',
        remark: description,
      });

      if (response.data.status === 'success') {
        // setIsCheckedIn(true);

        Alert.alert(
          'Success',
          'Check-out successful',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(), // 👈 Go back when OK pressed
            },
          ],
          { cancelable: false },
        );
      } else {
        Alert.alert('Error', response.data.message || 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'Server is not responding');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header
        title={isCheckedIn ? 'Check Out' : 'Check In'}
        rightIconName="refresh"
        onRightIconPress={handleRefresh}
      />
      <View style={styles.row}>
        <View style={styles.dateTimeBox}>
          <FontAwesome5 name="calendar-alt" size={18} color="#4158F4" />
          <Text style={styles.dateTimeText}>{serverDate || ''}</Text>
        </View>
        <View style={styles.dateTimeBox}>
          <FontAwesome5 name="clock" size={18} color="#4158F4" />
          <Text style={styles.dateTimeText}>{serverTime || ''}</Text>
        </View>
      </View>
      <View
        pointerEvents={isCheckedIn ? 'none' : 'auto'}
        style={{ marginHorizontal: 10 }}
      >
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
      {work === '2' && (
        <View style={{ marginHorizontal: 10 }}>
          <CustomDropdown
            label="Select Customer"
            selectedValue={customer}
            onValueChange={itemId => setCustomer(itemId.toString())}
            placeholder="Select Customer"
            options={customerOptions}
            loading={false}
            showLabel={false}
          />
        </View>
      )}
      <TextInput
        placeholder="Description"
        placeholderTextColor={'#555'}
        style={[styles.inputBox, styles.textArea]}
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
        editable={!isCheckedIn}
      />
      <View style={styles.locationRow}>
        <View style={styles.locationBox}>
          <Text style={styles.locationText}>
            {city ||
              'Faridabad 121010, Ekta Nagar, Faridabad, Haryana 121010, India'}
          </Text>
        </View>
        <TouchableOpacity style={styles.mapButton}>
          <FontAwesome5 name="map-marker-alt" size={18} color="red" />
          <Text style={styles.mapText}>View Map</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.historyLink}>View History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.checkInButton}
        onPress={isCheckedIn ? callCheckOutApi : callCheckInApi}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.checkInText}>
            {isCheckedIn ? 'CHECK OUT' : 'CHECK IN'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
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
    color: '#444',
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
