import {
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../../theme/theme';
import Header from '../../../components/HeaderComp';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/StackNavigator';
import { useNavigation } from '@react-navigation/native';
import { ENDPOINTS } from '../../../api/Endpoints';
import { getUserData } from '../../../utils/StorageManager';
import { api } from '../../../api';

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

const { height } = Dimensions.get('window');

const months = [
  { name: 'Jan', value: 1 },
  { name: 'Feb', value: 2 },
  { name: 'Mar', value: 3 },
  { name: 'Apr', value: 4 },
  { name: 'May', value: 5 },
  { name: 'Jun', value: 6 },
  { name: 'Jul', value: 7 },
  { name: 'Aug', value: 8 },
  { name: 'Sep', value: 9 },
  { name: 'Oct', value: 10 },
  { name: 'Nov', value: 11 },
  { name: 'Dec', value: 12 },
];

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 2008 + 1 },
  (_, i) => 2008 + i,
);

const RequisitionScreen = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(7); // Default to July (7)
  const [selectedYear, setSelectedYear] = useState(2025);
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const handleCalendarPress = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleMonthSelect = (monthValue: number) => {
    setSelectedMonth(monthValue);
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setIsYearPickerVisible(false);
  };

  const handlePlusPress = () => {
    navigation.navigate('CreateRequisition');
  };

  const getRequisitionHistory = async () => {
    try {
      const user = await getUserData();
      const body = {
        emp_id: user?.emp_id,
        month: selectedMonth,
        year: selectedYear,
      };

      const response = await api.post(ENDPOINTS.REQUISITION_LIST, {
        params: {
          emp_id: user?.emp_id,
          month: selectedMonth,
          year: selectedYear,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('getRequisitionHistory Response:', response.data);
    } catch (error: any) {
      console.error(
        'getRequisitionHistory Error:',
        error?.response || error?.message,
      );
      throw error;
    }
  };

  useEffect(() => {
    getRequisitionHistory();
  }, [selectedMonth, selectedYear]);

  const getMonthName = (monthValue: number) => {
    const month = months.find(m => m.value === monthValue);
    return month ? month.name : 'Jan';
  };

  return (
    <View style={styles.container}>
      <Header
        title={`Requisition History : ${getMonthName(
          selectedMonth,
        )}, ${selectedYear}`}
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
                  {getMonthName(selectedMonth)}
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
                      selectedMonth === month.value && styles.selectedMonthItem,
                    ]}
                    onPress={() => handleMonthSelect(month.value)}
                  >
                    <Text
                      style={[
                        styles.monthText,
                        selectedMonth === month.value &&
                          styles.selectedMonthText,
                      ]}
                    >
                      {month.name}
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
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={handlePlusPress}>
          <Text style={{ color: COLORS.primaryWhiteHex, fontSize: 24 }}>+</Text>
        </TouchableOpacity>
      </View>
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
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: COLORS.primaryColor,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    backgroundColor: COLORS.primaryColor,
  },
});

export default RequisitionScreen;
