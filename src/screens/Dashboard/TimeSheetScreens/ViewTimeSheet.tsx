import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CreateScreen from './CreateTimeSheet';
import { COLORS } from '../../../theme/theme';
import Header from '../../../components/HeaderComp';
import CustomDropdown from '../../../components/CustumDropdown';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/StackNavigator';

const timesheetData = [
  {
    date: '14-Apr-2025',
    in: '09:30',
    out: '18:32',
    total: '09:02',
    status: 'Full Day',
  },
  {
    date: '15-Apr-2025',
    in: '09:25',
    out: '18:30',
    total: '09:05',
    status: 'Full Day',
  },
  {
    date: '16-Apr-2025',
    in: '09:30',
    out: '18:30',
    total: '09:00',
    status: 'Full Day',
  },
  {
    date: '17-Apr-2025',
    in: '09:30',
    out: '18:30',
    total: '09:00',
    status: 'Full Day',
  },
  {
    date: '18-Apr-2025',
    in: '09:30',
    out: '18:30',
    total: '09:00',
    status: 'Full Day',
  },
];

type TimeSheetScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const { height, width } = Dimensions.get('window');

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// Get the current year
const currentYear = new Date().getFullYear();

// Generate an array of years from 2008 to the current year
const years = Array.from(
  { length: currentYear - 2008 + 1 },
  (_, i) => 2008 + i,
);

const options = [
  { id: '1', name: 'Week 1' },
  { id: '2', name: 'Week 2' },
  { id: '3', name: 'Week 3' },
  { id: '4', name: 'Week 4' },
  { id: '5', name: 'Week 5' },
  { id: '6', name: 'Week 6' },
];

const TimesheetScreen = () => {
  const [activeTab, setActiveTab] = useState<'SUMMARY' | 'CREATE'>('SUMMARY');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Jul');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isWeekPickerVisible, setIsWeekPickerVisible] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('1');
  const navigation = useNavigation<TimeSheetScreenNavigationProp>();

  const handleStatusPress = () => {
    navigation.navigate('DaySheetDetails');
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setIsCalendarVisible(false);
    setIsWeekPickerVisible(true);
    setSelectedWeek('6');
  };

  const handleCalendarPress = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setIsYearPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primaryColor}
        barStyle="light-content"
      />
      {/* Header */}

      <Header
        title={
          activeTab === 'SUMMARY'
            ? `Time Sheet : ${selectedMonth}, ${selectedYear}`
            : 'Time Sheet'
        }
        rightIconName={activeTab === 'SUMMARY' ? 'calendar-month' : undefined}
        onRightIconPress={
          activeTab === 'SUMMARY' ? handleCalendarPress : undefined
        }
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={isWeekPickerVisible}
        onRequestClose={() => setIsWeekPickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 10,
                color: '#3E4ADB',
              }}
            >
              Search by weekly basis
            </Text>

            <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>Select Week</Text>
              <View
                style={
                  {
                    // borderWidth: 1,
                    // borderColor: '#ccc',
                    // borderRadius: 6,
                    // padding: 10,
                  }
                }
              >
                <CustomDropdown
                  label="Week"
                  showLabel={false}
                  selectedValue={selectedWeek}
                  onValueChange={setSelectedWeek}
                  options={options}
                />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setIsWeekPickerVisible(false)}>
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsWeekPickerVisible(false)}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabWrap}
          onPress={() => setActiveTab('SUMMARY')}
        >
          <Text
            style={[styles.tab, activeTab === 'SUMMARY' && styles.activeTab]}
          >
            SUMMARY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabWrap}
          onPress={() => setActiveTab('CREATE')}
        >
          <Text
            style={[styles.tab, activeTab === 'CREATE' && styles.activeTab]}
          >
            CREATE
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isCalendarVisible}
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <View style={styles.modalContainer}>
          <StatusBar backgroundColor={COLORS.primaryColor} />
          <View style={styles.modalContent}>
            <View
              style={{
                backgroundColor: COLORS.primaryColor,
                justifyContent: 'center',
                alignItems: 'center',
                height: height * 0.16,
              }}
            >
              <Text style={styles.modalTitle}>Select Month</Text>
              <TouchableOpacity
                onPress={() => setIsYearPickerVisible(!isYearPickerVisible)}
              >
                <Text style={styles.selectedMonth}>
                  <Text style={{ color: '#ddd', fontSize: 25 }}>
                    {selectedYear}
                  </Text>{' '}
                  {selectedMonth}
                </Text>
              </TouchableOpacity>
            </View>

            {isYearPickerVisible ? (
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
            ) : (
              <View style={styles.monthsContainer}>
                {months.map((month, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.monthItem,
                      selectedMonth === month && styles.selectedMonthItem,
                    ]}
                    onPress={() => handleMonthSelect(month)}
                  >
                    <Text
                      style={[
                        styles.monthText,
                        selectedMonth === month && styles.selectedMonthText,
                      ]}
                    >
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setIsCalendarVisible(false)}>
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsCalendarVisible(false)}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {activeTab === 'SUMMARY' ? (
        <>
          {/* Summary Boxes */}
          <View style={styles.summaryBox}>
            <View style={styles.boxLeft}>
              <Text style={styles.boxTitle}>Apr 2025</Text>
              <Text style={styles.boxSub}>FINAL</Text>
            </View>
            <View style={styles.boxRight}>
              <Text style={styles.boxTitle}>TOTAL DAYS</Text>
              <Text style={styles.boxSub}>5</Text>
            </View>
          </View>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.col}>Date</Text>
            <Text style={styles.col1}>Time In</Text>
            <Text style={styles.col}>Time Out</Text>
            <Text style={styles.col}>Total Time</Text>
            <Text style={styles.col}>Status</Text>
          </View>

          <ScrollView>
            {timesheetData.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>{item.date}</Text>
                <Text style={styles.cell1}>{item.in}</Text>
                <Text style={styles.cell}>{item.out}</Text>
                <Text style={styles.cell}>{item.total}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.statusBtn}
                  onPress={handleStatusPress}
                >
                  <Text style={styles.statusText}>{item.status}</Text>
                  <Icon name="chevron-forward" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        // CREATE Tab Content (placeholder for now)
        // <CreateScreen />
        <CreateScreen />
      )}
    </View>
  );
};

export default TimesheetScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  header: {
    flexDirection: 'row',
    backgroundColor: '#3E4ADB',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  tabWrap: {
    flex: 1,
  },
  tab: {
    paddingVertical: 12,
    textAlign: 'center',
    color: '#555',
    fontWeight: '600',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    color: '#3E4ADB',
    borderBottomColor: '#3E4ADB',
  },
  summaryBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  boxLeft: {
    flex: 1,
    backgroundColor: '#00BEFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  boxRight: {
    flex: 1,
    backgroundColor: '#3E4ADB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  boxTitle: { color: '#fff', fontWeight: '700', fontSize: 16 },
  boxSub: { color: '#fff', fontSize: 14, marginTop: 2 },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  col: { flex: 1, fontWeight: '600', fontSize: 11, color: '#333' },
  col1: {
    flex: 1,
    fontWeight: '600',
    fontSize: 11,
    color: '#333',
    paddingLeft: 10,
  },
  row: {
    marginHorizontal: 2,
    height: 50,
    borderRadius: 6,
    flexDirection: 'row',
    backgroundColor: '#fff',
    // paddingVertical: 10,
    paddingLeft: 6,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  cell: { flex: 1, fontSize: 11, color: '#333' },
  cell1: { flex: 1, fontSize: 11, color: '#333', paddingLeft: 10 },
  statusBtn: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#73B376',
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  createBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createText: {
    fontSize: 16,
    color: '#444',
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
  selectedMonth: {
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.primaryWhiteHex,
    // marginBottom: 20,
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
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  monthItem: {
    width: '22%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 5,
  },
  selectedMonthItem: {
    backgroundColor: COLORS.primaryColor,
  },
  monthText: {
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
    fontSize: 16,
    color: 'blue',
    fontWeight: '500',
  },
  selectedMonthText: {
    color: COLORS.primaryWhiteHex,
  },
});
