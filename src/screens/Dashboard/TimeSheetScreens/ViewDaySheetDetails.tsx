import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../../components/HeaderComp';
import { COLORS } from '../../../theme/theme';
import { getUserData } from '../../../utils/StorageManager';
import { api, HEADERS } from '../../../api';
import { ENDPOINTS } from '../../../api/Endpoints';
import { formatDate } from '../../../utils/utilsFn';
import Loader from '../../../components/Loader';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/StackNavigator';

const TimeSheetDayDetailScreen = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [showDetails, setShowDetails] = useState(false);
  const [timesheetTableData, setTimeSheetTableData] = useState({});
  const [timesheetDetails, setTimeSheetDetails] = useState({});
  const [loading, setIsLoading] = useState(false);
  const timeSheetDate = route.params?.dateDetail;

  const handleEditPress = () => {
    navigation.navigate('ViewTimeSheet', {
      isUpdate: true,
      data: {
        timesheet_id: timesheetDetails.timesheet_id,
        customer_name: timesheetDetails.menu[0].customer_name,
        customer_id: timesheetDetails.menu[0].customer_id,
        project_name: timesheetDetails.menu[0].project_name,
        project_id: timesheetDetails.menu[0].project_id,
        description: timesheetDetails.menu[0].description,
        web_entry: timesheetDetails.menu[0].web_entry,
        android_entry: timesheetDetails.menu[0].android_entry,
        date: timesheetTableData.Punch_Time,
        time_in: timesheetTableData.Intime,
        time_out: timesheetTableData.OutTime,
        total_time: timesheetTableData.Total_Time,
        status: timesheetTableData.Status,
        work_type_id: timesheetDetails.worktype_id,
        work_type_name: timesheetDetails.worktype_name,
        timesheet_status: timesheetTableData.Timesheet_status,
        timesheet_status_id: timesheetTableData.Timesheet_status_Id,
        subtask_id: timesheetDetails.menu[0].task_id,
      },
      defaultTab: 'CREATE', // or 'SUMMARY'
    });
  };

  const fetchTimeSheetDetails = async () => {
    try {
      setIsLoading(true);
      const user = await getUserData();
      const response = await api.get(ENDPOINTS.TIMESHEET_DETAILS, {
        params: {
          emp_id: user?.emp_id,
          timesheet_date: timeSheetDate,
        },
      });

      console.log('Response Data', response.data, response.data.time_sheet[0]);
      if (response.data.status === 'Success') {
        setTimeSheetDetails(response.data.data[0]);
        setTimeSheetTableData(response.data.time_sheet[0]);
      }

      // Handle the response data
    } catch (error) {
      console.error('Error fetching time sheet details:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(ENDPOINTS.TIMESHEET_DELETE, {
        params: {
          timesheet_id: timesheetDetails.timesheet_id,
        },
      });

      console.log('Response Data', response.data);
      if (response.data.status === 'Success') {
        setTimeSheetDetails(response.data.data[0]);
        setTimeSheetTableData(response.data.time_sheet[0]);
      }

      // Handle the response data
    } catch (error) {
      console.error('Error fetching time sheet details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmAndDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this entry?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              setIsLoading(true);
              const response = await api.get(ENDPOINTS.TIMESHEET_DELETE, {
                params: {
                  timesheet_id: timesheetDetails.timesheet_id,
                },
              });
              console.log('Response Data', response.data);
              if (response.data.status === 'Success') {
                Alert.alert(
                  'Success',
                  'Entry deleted successfully.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: navigation.goBack,
                    },
                  ],
                  { cancelable: false },
                );
              }
            } catch (error) {
              console.error('Error deleting time sheet:', error);
              Alert.alert('Error', 'Failed to delete entry.');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  useEffect(() => {
    fetchTimeSheetDetails();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Header */}
      <Header title={'10-Jun-2025'} />

      {/* Table Header Row */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}>Time In</Text>
        <Text style={styles.headerCell}>Time Out</Text>
        <Text style={styles.headerCell}>Total Time</Text>
        <Text style={styles.headerCell}>Status</Text>
      </View>

      {/* Summary Row */}
      <View style={styles.summaryRow}>
        <Text style={styles.cell}>
          {formatDate(timesheetTableData.Punch_Time)}
        </Text>
        <Text style={[styles.cell, { paddingLeft: 5 }]}>
          {timesheetTableData.Intime}
        </Text>
        <Text style={styles.cell}>{timesheetTableData.OutTime}</Text>
        <Text style={styles.cell}>{timesheetTableData.Total_Time}</Text>
        <View style={styles.statusBtn}>
          <Text style={styles.statusText}>{timesheetTableData.Status}</Text>
        </View>
      </View>

      {/* Time Slot + Toggle */}
      <TouchableOpacity
        style={styles.timeRow}
        onPress={() => setShowDetails(!showDetails)}
      >
        <View style={styles.timeLeft}>
          <Icon name="clock-time-four-outline" size={20} color="#000" />
          <Text style={styles.timeText}> {timesheetDetails.timeInOut}</Text>
        </View>
        <View style={styles.timeRight}>
          <Text style={styles.officeText}>
            {timesheetDetails.worktype_name}
          </Text>
          <Icon
            name={showDetails ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#000"
          />
        </View>
      </TouchableOpacity>

      <Loader visible={loading} />

      {/* Detail Section */}
      {showDetails && (
        <View style={styles.detailBox}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 5,
              paddingVertical: 5,
            }}
          >
            <TouchableOpacity onPress={handleEditPress}>
              <Icon name="pencil" size={24} color="#4F46E5" />
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmAndDelete}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Customer :</Text>{' '}
            {timesheetDetails.menu[0].customer_name}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Project :</Text>{' '}
            {timesheetDetails.menu[0].project_name}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Description :</Text>{' '}
            {timesheetDetails.menu[0].description}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default TimeSheetDayDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primaryColor,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    // borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCell: {
    width: '20%',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  summaryRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cell: {
    width: '20%',
    fontSize: 12,
    color: '#000',
  },
  statusBtn: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eef1ff',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 8,
  },
  timeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#000',
  },
  timeRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  officeText: {
    fontSize: 14,
    color: '#000',
    marginRight: 6,
  },
  detailBox: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  boldLabel: {
    fontWeight: 'bold',
  },
});
