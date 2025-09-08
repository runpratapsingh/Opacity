import React, { useEffect, useState } from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../../theme/theme';
import { api } from '../../../api';
import { ENDPOINTS } from '../../../api/Endpoints';
import { getUserData } from '../../../utils/StorageManager';
import Header from '../../../components/HeaderComp';

const { height, width } = Dimensions.get('window');

type AttendanceRecord = {
  In_Lat: string;
  In_Long: string;
  Out_Lat: string;
  Out_Long: string;
  In_Id: number;
  Emp_Id: number;
  Emp_Name: string;
  In_Date: string;
  Out_Date: string;
  In_Time: string;
  Out_Time: string;
  In_Address: string;
  Out_Address: string;
  Total_Hours: string;
  Work_Type: string;
};

type AttendanceItem = {
  date: string;
  punchIn: string;
  punchOut: string;
  totalHours: string;
  workType: string;
};

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
const TodayDate = new Date();
const currentYear = TodayDate.getFullYear();
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
          {item.workType === 'Work From Home' ? 'WFH' : item.workType}
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

const ManagerAttendanceScreen = () => {
  const [activeTab, setActiveTab] = useState<'biometric' | 'opacity'>(
    'biometric',
  );
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    TodayDate.toLocaleString('default', { month: 'short' }),
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [biometricData, setBiometricData] = useState<AttendanceItem[]>([]);
  const [opacityData, setOpacityData] = useState<AttendanceItem[]>([]);

  const fetchAttendanceData = async () => {
    try {
      const userData = await getUserData();
      const response = await api.get(ENDPOINTS.CHECK_IN_OUT_HISTORY, {
        params: {
          Emp_id: userData?.emp_id,
          month: months.indexOf(selectedMonth) + 1,
          year: selectedYear,
        },
      });

      const { Opacity, Biometric } = response.data;
      console.log('Opacity Data:', Opacity);
      console.log('Biometric Data:', Biometric);

      const mapAttendanceData = (
        data: AttendanceRecord[],
      ): AttendanceItem[] => {
        return data.map(item => ({
          date: activeTab === 'opacity' ? item.In_Date : item.ATTENDANCE_DATE,
          punchIn: activeTab === 'opacity' ? item.In_Time : item.CHECK_IN,
          punchOut: activeTab === 'opacity' ? item.Out_Time : item.CHECK_OUT,
          totalHours:
            activeTab === 'opacity' ? item.Total_Hours : item.TOTAL_HOURS,
          workType: activeTab === 'opacity' ? item.Work_Type : item.WORK_TYPE,
        }));
      };

      setBiometricData(mapAttendanceData(Biometric));
      setOpacityData(mapAttendanceData(Opacity));
    } catch (error) {
      console.log('Error in fetching the attendance data', error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [selectedYear, selectedMonth, activeTab]);

  const handleCalendarPress = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setIsCalendarVisible(false);
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
        data={currentData.reverse()}
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
    color: '#333',
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
    color: '#333',
  },
  selectedMonthText: {
    color: COLORS.primaryWhiteHex,
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
    fontSize: 11,
    color: '#555',
    marginLeft: 6,
  },
  timeValue: {
    fontSize: 11,
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
});

export default ManagerAttendanceScreen;
