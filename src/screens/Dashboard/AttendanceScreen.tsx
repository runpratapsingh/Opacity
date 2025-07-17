import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
} from 'react-native';
import Header from '../../components/HeaderComp';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../theme/theme';

const { height, width } = Dimensions.get('window');

interface AttendanceItem {
  date: string;
  punchIn: string;
  punchOut: string;
  totalHours: string;
  workType: string;
}

const biometricData: AttendanceItem[] = [
  {
    date: '01-Jul-2025',
    punchIn: '09:44',
    punchOut: '18:30',
    totalHours: '08:46',
    workType: 'Office',
  },
  {
    date: '03-Jul-2025',
    punchIn: '09:46',
    punchOut: '18:34',
    totalHours: '08:47',
    workType: 'Office',
  },
  {
    date: '04-Jul-2025',
    punchIn: '09:42',
    punchOut: '18:29',
    totalHours: '08:47',
    workType: 'Office',
  },
  {
    date: '07-Jul-2025',
    punchIn: '09:49',
    punchOut: '18:33',
    totalHours: '08:44',
    workType: 'Office',
  },
  {
    date: '08-Jul-2025',
    punchIn: '10:49',
    punchOut: '18:34',
    totalHours: '07:45',
    workType: 'Office',
  },
];

const opacityData: AttendanceItem[] = [
  {
    date: '02-Jul-2025',
    punchIn: '10:00',
    punchOut: '18:00',
    totalHours: '08:00',
    workType: 'Remote',
  },
  {
    date: '05-Jul-2025',
    punchIn: '10:15',
    punchOut: '18:15',
    totalHours: '08:00',
    workType: 'Remote',
  },
];

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

const AttendanceCard = ({ item }: { item: AttendanceItem }) => (
  <View style={styles.card}>
    <View style={styles.rowContainer}>
      <View style={styles.row}>
        <Icon name="map-marker-alt" size={16} color="green" />
        <Text style={styles.timeLabel}>Punch In</Text>
        <Text style={styles.timeValue}>{item.punchIn}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="map-marker-alt" size={16} color="red" />
        <Text style={styles.timeLabel}>Punch Out</Text>
        <Text style={styles.timeValue}>{item.punchOut}</Text>
      </View>
    </View>
    <View style={styles.rowContainer}>
      <View style={styles.row}>
        <MaterialIcon name="access-time" size={16} color="#444" />
        <Text style={styles.timeLabel}>Total Hours</Text>
        <Text style={[styles.timeValue, { color: '#0057D8' }]}>
          {item.totalHours}
        </Text>
      </View>
      <View style={styles.row}>
        <MaterialIcon name="work" size={16} color="#444" />
        <Text style={styles.timeLabel}>Work Type</Text>
        <Text style={[styles.timeValue, { color: '#FF9800' }]}>
          {item.workType}
        </Text>
      </View>
    </View>
    <View style={styles.dateLabel}>
      <Text style={styles.dateLabelText}>{item.date}</Text>
    </View>
    <TouchableOpacity style={styles.bottomRightIcon}>
      <MaterialIcon name="location-searching" size={18} color="#000" />
    </TouchableOpacity>
  </View>
);

const AttendanceScreen = () => {
  const [activeTab, setActiveTab] = useState<'biometric' | 'opacity'>(
    'biometric',
  );
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Jul');
  const [selectedYear, setSelectedYear] = useState(2025);

  const handleCalendarPress = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setIsYearPickerVisible(false);
  };

  const currentData = activeTab === 'biometric' ? biometricData : opacityData;

  return (
    <View style={styles.container}>
      <Header
        title={`Attendance History : ${selectedMonth}, ${selectedYear}`}
        rightIconName="calendar-month"
        onRightIconPress={handleCalendarPress}
      />
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
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('biometric')}>
          <Text
            style={[styles.tab, activeTab === 'biometric' && styles.activeTab]}
          >
            Biometric
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('opacity')}>
          <Text
            style={[styles.tab, activeTab === 'opacity' && styles.activeTab]}
          >
            Opacity
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={currentData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <AttendanceCard item={item} />}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  tab: {
    fontSize: 16,
    color: COLORS.primaryColor,
    paddingBottom: 5,
    width: width * 0.48,
    textAlign: 'center',
  },
  activeTab: {
    color: COLORS.primaryColor,
    borderBottomColor: COLORS.primaryColor,
    borderBottomWidth: 2,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: height * 0.17,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    justifyContent: 'center',
    shadowRadius: 3,
    elevation: 3,
    position: 'relative',
  },
  dateLabel: {
    position: 'absolute',
    top: 10,
    right: 0,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateLabelText: {
    fontSize: 11,
    color: '#888',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  timeLabel: {
    fontSize: 14,
    color: '#555',
    marginLeft: 6,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#76C7AC',
    marginLeft: 6,
  },
  bottomRightIcon: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#000',
    padding: 2,
    bottom: 10,
    right: 10,
  },
  selectedMonthText: {
    color: COLORS.primaryWhiteHex,
  },
});

export default AttendanceScreen;
