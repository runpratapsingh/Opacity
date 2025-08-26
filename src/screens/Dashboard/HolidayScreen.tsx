import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/theme';
import Header from '../../components/HeaderComp';
import { api } from '../../api';
import { ENDPOINTS } from '../../api/Endpoints';

type TimeSheetScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const { height } = Dimensions.get('window');
const currentYear: number = new Date().getFullYear();
const years: number[] = Array.from(
  { length: currentYear - 2008 + 1 },
  (_, i) => 2008 + i,
);

type TimesheetItem = {
  month: string;
  totalDays: number;
  status: 'NO ENTRY' | 'FINAL' | 'OPEN';
};

const HolidayScreen = () => {
  const [isYearPickerVisible, setIsYearPickerVisible] =
    useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleYearSelect = async (year: number) => {
    setSelectedYear(year);
    setIsYearPickerVisible(false);
    await fetchHolidays(year.toString());
  };

  const handleCalendarPress = (): void => {
    setIsYearPickerVisible(!isYearPickerVisible);
  };

  const fetchHolidays = async (year: string) => {
    setIsLoading(true);
    try {
      const result = await api.get(ENDPOINTS.HOLIDAY_LIST, {
        params: {
          holiday_year: year,
        },
      });

      console.log('jhjhjgfyt', result.data?.data?.holiday_list);

      if (result.status === 200 && result.data?.data?.holiday_list) {
        setHolidays(result.data.data.holiday_list);
      } else {
        setHolidays([]);
      }
    } catch (error) {
      console.error('Failed to fetch holidays:', error);
      setHolidays([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays(selectedYear.toString());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={`Holiday List : ${selectedYear}`}
        rightIconName="calendar-month"
        onRightIconPress={handleCalendarPress}
      />

      <View style={styles.tableHeader}>
        {/* <Text style={styles.tableHeaderText}>S.No.</Text> */}
        <Text style={styles.tableHeaderText}>Holiday Date</Text>
        <Text style={styles.tableHeaderText}>Day Name</Text>
        <Text style={styles.tableHeaderText}>Holiday Name</Text>
      </View>
      <ScrollView>
        {holidays.map(holiday => (
          <View key={holiday.id} style={styles.row}>
            {/* <Text style={styles.cell}>{holiday.id}</Text> */}
            <Text style={styles.cell}>{holiday.holiday_date}</Text>
            <Text style={styles.cell}>{holiday.holiday_day}</Text>
            <Text style={styles.cell}>
              {holiday.holiday_name.replace(/(\r\n|\n|\r)+/g, '').trim()}
            </Text>
          </View>
        ))}
      </ScrollView>

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

export default HolidayScreen;

const styles = StyleSheet.create({
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
  header: {
    backgroundColor: '#3b5998',
    padding: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  tableHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',

    // height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    fontSize: 11,
  },
});
