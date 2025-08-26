import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import Header from '../../../components/HeaderComp';
import { COLORS } from '../../../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/StackNavigator';
import { api } from '../../../api';
import { ENDPOINTS } from '../../../api/Endpoints';
import { getUserData } from '../../../utils/StorageManager';

type TimeSheetScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const { height } = Dimensions.get('window');
const currentYear: number = new Date().getFullYear();
const years: number[] = Array.from(
  { length: currentYear - 2008 + 1 },
  (_, i) => 2008 + i,
);

type TimesheetItem = {
  week_start_date: string;
  week_end_date: string;
  week_name: string;
  month_name: string;
  status_id: string;
  days: string;
  status: 'NO ENTRY' | 'Approved' | 'OPEN';
};

// const timesheetData: TimesheetItem[] = [
//   { month: 'Jan-2025', totalDays: 0, status: 'NO ENTRY' },
//   { month: 'Feb-2025', totalDays: 0, status: 'NO ENTRY' },
//   { month: 'Mar-2025', totalDays: 18, status: 'FINAL' },
//   { month: 'Apr-2025', totalDays: 22, status: 'FINAL' },
//   { month: 'May-2025', totalDays: 22, status: 'FINAL' },
//   { month: 'Jun-2025', totalDays: 21, status: 'FINAL' },
//   { month: 'Jul-2025', totalDays: 10, status: 'OPEN' },
//   { month: 'Aug-2025', totalDays: 0, status: 'NO ENTRY' },
//   { month: 'Sep-2025', totalDays: 0, status: 'NO ENTRY' },
//   { month: 'Oct-2025', totalDays: 0, status: 'NO ENTRY' },
//   { month: 'Nov-2025', totalDays: 0, status: 'NO ENTRY' },
//   { month: 'Dec-2025', totalDays: 0, status: 'NO ENTRY' },
// ];

const TimeSheetScreen: React.FC = () => {
  const [isYearPickerVisible, setIsYearPickerVisible] =
    useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [timesheetData, setTimeSheetData] = useState<TimesheetItem[]>([]);
  const navigation = useNavigation<TimeSheetScreenNavigationProp>();

  const handleCalendarPress = (): void => {
    setIsYearPickerVisible(!isYearPickerVisible);
  };

  const handleYearSelect = (year: number): void => {
    setSelectedYear(year);
    setIsYearPickerVisible(false);
  };

  const getStatusColor = (status: TimesheetItem['status']): string => {
    switch (status) {
      case 'Approved':
        return '#73B376';
      case 'OPEN':
        return '#00BEFF';
      default:
        return '#B5BEAD';
    }
  };

  const handleStatusPress = () => {
    navigation.navigate('ViewTimeSheet', { defaultTab: 'SUMMARY' });
  };
  const handleApplyExpense = () => {
    navigation.navigate('ViewTimeSheet', { defaultTab: 'CREATE' });
  };

  const renderHeader = (): React.ReactElement => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Month</Text>
      <Text style={styles.headerText}>Total Days</Text>
      <Text style={styles.headerText}>Status</Text>
    </View>
  );

  const renderItem = ({
    item,
  }: {
    item: TimesheetItem;
  }): React.ReactElement => (
    <View style={styles.itemContainer}>
      <Text style={styles.monthText}>{item.month_name}</Text>
      <Text style={styles.totalDaysText}>{item.days}</Text>
      {item.status === 'Approved' || item.status === 'OPEN' ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.statusContainer,
            { backgroundColor: getStatusColor(item.status) },
          ]}
          onPress={() => handleStatusPress()}
        >
          <Text style={styles.statusText}>{item.status}</Text>
          <View style={styles.icon}>
            <Icon name="angle-right" size={12} color="#fff" />
          </View>
        </TouchableOpacity>
      ) : (
        <View
          style={[
            styles.statusContainer,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      )}
    </View>
  );

  const getTimeSheet = async () => {
    try {
      const user = await getUserData();
      console.log('User from storage:', user);
      const res = await api.get(ENDPOINTS.TIMESHEET_STATUS, {
        params: {
          emp_id: user?.emp_id,
          year: selectedYear,
        },
      });

      if (res.status === 200) {
        setTimeSheetData(res.data.data.month_status);
      }

      console.log('hfsjakhfkjahfkaj', res);
    } catch (error) {
      console.log('shfkjdhfksjfhskjd', error);
    }
  };

  useEffect(() => {
    getTimeSheet();
  }, [selectedYear]);

  return (
    <View style={styles.container}>
      <Header
        title={`TimeSheet List : ${selectedYear}`}
        rightIconName="calendar-month"
        onRightIconPress={handleCalendarPress}
      />
      <FlatList
        data={timesheetData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
      />
      <TouchableOpacity
        onPress={handleApplyExpense}
        style={styles.createButton}
      >
        <Text style={styles.createButtonText}>CREATE TIME SHEET</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isYearPickerVisible}
        onRequestClose={() => setIsYearPickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                backgroundColor: COLORS.primaryColor,
                justifyContent: 'center',
                alignItems: 'center',
                height: height * 0.13,
              }}
            >
              <Text style={styles.modalTitle}>Select Year</Text>
            </View>
            <ScrollView style={styles.yearList}>
              {years.reverse().map((year, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.yearItem}
                  onPress={() => handleYearSelect(year)}
                >
                  <Text style={styles.yearText}>{year}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setIsYearPickerVisible(false)}>
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsYearPickerVisible(false)}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: COLORS.primaryColor,
  },
  headerText: {
    fontSize: 12,
    color: '#fff',
    width: '33%',
    textAlign: 'center',
  },
  itemContainer: {
    marginTop: 5,
    flexDirection: 'row',
    height: height * 0.045,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 2,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  monthText: {
    fontSize: 12,
    width: '30%',
    textAlign: 'center',
  },
  totalDaysText: {
    fontSize: 12,
    width: '20%',
    textAlign: 'center',
  },
  statusContainer: {
    borderRadius: 10,
    height: '100%',
    backgroundColor: 'red',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    marginLeft: 5,
    right: 10,
  },
  createButton: {
    backgroundColor: COLORS.primaryColor,
    padding: 15,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.primaryWhiteHex,
  },
  yearList: {
    maxHeight: 200,
    marginBottom: 20,
  },
  yearItem: {
    padding: 10,
    alignItems: 'center',
  },
  yearText: {
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 12,
    color: 'blue',
    fontWeight: '500',
  },
});

export default TimeSheetScreen;
