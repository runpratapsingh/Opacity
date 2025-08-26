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
import { COLORS } from '../../../theme/theme';
import Header from '../../../components/HeaderComp';
import CustomDropdown from '../../../components/CustumDropdown';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/StackNavigator';
import { PieChart } from 'react-native-gifted-charts';
import CreateScreen from '../TimeSheetScreens/CreateTimeSheet';
import CreateExpense from './CreateExpense';

type ViewExpenseRouteProp = RouteProp<RootStackParamList, 'ViewExpenses'>;
type TimeSheetScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface TimeSheetData {
  date: string;
  in: string;
  out: string;
  total: string;
  status: string;
}

const timesheetData: TimeSheetData[] = [
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

type Piechart = {
  value: number;
  color: string;
};

const pieData: Piechart[] = [
  { value: 54, color: '#177AD5' },
  { value: 40, color: '#79D2DE' },
  { value: 20, color: '#ED6665' },
];

const { height, width } = Dimensions.get('window');

const Legends: React.FC<{ data: Piechart[] }> = ({ data }) => {
  return (
    <View style={styles.legendsContainer}>
      {data.map((item: Piechart, index: number) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>₹ {item.value}</Text>
          <Text style={styles.legendText}>Approved</Text>
        </View>
      ))}
    </View>
  );
};
const LegendsBottom: React.FC<{
  data: Piechart[];
  onPressLegend: (item: Piechart) => void;
}> = ({ data, onPressLegend }) => {
  return (
    <View style={styles.legendsContainer}>
      {data.map((item: Piechart, index: number) => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressLegend(item)}
          style={{
            height: 90,
            backgroundColor: item.color,
            marginHorizontal: 10,
            borderRadius: 10,
          }}
          key={index}
        >
          <View
            style={{
              height: '100%',
              width: '97%',
              position: 'absolute',
              backgroundColor: '#fff',
              borderRadius: 10,
              marginLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}
          >
            <View style={{ gap: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                General Expense
              </Text>
              <Text style={{ color: '#777', fontSize: 12 }}>25-July-2025</Text>
            </View>
            <View
              style={{ gap: 10, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>₹ 10</Text>
              <Icon
                name="alert-circle-outline"
                size={14}
                color={COLORS.primaryColor}
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ViewExpense: React.FC = () => {
  const route = useRoute<ViewExpenseRouteProp>();
  const defaultTab = route.params?.defaultTab ?? 'SUMMARY';
  const [activeTab, setActiveTab] = useState<'SUMMARY' | 'CREATE'>(defaultTab);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Jul');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isWeekPickerVisible, setIsWeekPickerVisible] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<TimeSheetScreenNavigationProp>();

  const handleCalendarPress = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setIsYearPickerVisible(false);
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setIsCalendarVisible(false);
    setIsWeekPickerVisible(true);
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
  const currentYear = new Date().getFullYear();
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

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primaryColor}
        barStyle="light-content"
      />
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
      {activeTab === 'SUMMARY' ? (
        <>
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
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.chartContainer}>
              <View style={styles.chartItem}>
                <View style={{ width: width * 0.4 }}>
                  <PieChart
                    donut
                    data={pieData}
                    isAnimated
                    showText
                    textColor="black"
                    radius={60}
                    innerRadius={20}
                    focusOnPress
                  />
                </View>
                <View style={{ width: width * 0.6 }}>
                  <Legends data={pieData} />
                </View>
              </View>
              <LegendsBottom
                data={pieData}
                onPressLegend={() => setModalVisible(true)}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <CreateExpense />
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isCalendarVisible}
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Month</Text>
              <TouchableOpacity
                onPress={() => setIsYearPickerVisible(!isYearPickerVisible)}
              >
                <Text style={styles.selectedMonth}>
                  <Text style={styles.yearText}>{selectedYear}</Text>{' '}
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={isWeekPickerVisible}
        onRequestClose={() => setIsWeekPickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitleText}>Search by weekly basis</Text>
            <View style={styles.modalDropdownContainer}>
              <Text style={styles.modalDropdownLabel}>Select Week</Text>
              <View>
                <CustomDropdown
                  label="Week"
                  showLabel={false}
                  selectedValue={selectedWeek}
                  onValueChange={value => setSelectedWeek(String(value))}
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader1}>
              <Text style={styles.modalHeaderText}>Expense Details</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent1}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date:</Text>
                <Text style={styles.detailValue}>25-Jul-2025</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Project:</Text>
                <Text style={styles.detailValue}>
                  Biyinzika Navone (Navone/Implementation)
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Expense Type:</Text>
                <Text style={styles.detailValue}>General Expense</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Expense Amount:</Text>
                <Text style={styles.detailValue}>₹2.0</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Description:</Text>
                <Text style={styles.detailValue}>Izzji</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Attachment:</Text>
                <Text style={styles.detailValue}>Image</Text>
              </View>
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
    backgroundColor: '#F2F2F2',
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
  boxTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  boxSub: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
  scrollViewContent: {
    flexGrow: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  chartContainer: {
    width: '100%',
  },
  chartItem: {
    width: width,
    // justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  legendsContainer: {
    gap: 7,
    marginVertical: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 10,
  },
  legendColor: {
    width: 8,
    height: 8,
    marginRight: 10,
  },
  legendText: {
    fontSize: 12,
    color: '#333',
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
  modalHeader: {
    backgroundColor: COLORS.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.16,
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
    color: COLORS.primaryWhiteHex,
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
  modalTitleText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#3E4ADB',
  },
  modalDropdownContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  modalDropdownLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: COLORS.primaryColor,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 2,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContent1: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  detailValue: {
    textAlign: 'right',
    flex: 1,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  openButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    width: width * 0.9,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default ViewExpense;
