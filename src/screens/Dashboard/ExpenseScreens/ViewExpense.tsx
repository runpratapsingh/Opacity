import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../theme/theme';
import Header from '../../../components/HeaderComp';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/StackNavigator';
import { PieChart } from 'react-native-gifted-charts';
import CreateExpense from './CreateExpense';
import { api, BASE_URL, HEADERS } from '../../../api';
import { ENDPOINTS } from '../../../api/Endpoints';
import { getUserData } from '../../../utils/StorageManager';
import axios from 'axios';
import Loader from '../../../components/Loader';

type ViewExpenseRouteProp = RouteProp<RootStackParamList, 'ViewExpenses'>;
type TimeSheetScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Piechart = {
  value: number;
  color: string;
};

const pieData: Piechart[] = [
  { value: 54, color: '#177AD5' },
  { value: 40, color: '#79D2DE' },
  { value: 20, color: '#ED6665' },
];

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // fallback

    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  } catch {
    return dateString;
  }
};

const { height, width } = Dimensions.get('window');

const Legends: React.FC<{ data: Piechart[] }> = ({ data }) => {
  return (
    <View style={styles.legendsContainer}>
      {data.map((item: any, index: number) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>
            {item.label}: ₹ {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

const LegendsBottom: React.FC<{
  data: any[];
  onPressLegend: (item: any) => void;
}> = ({ data, onPressLegend }) => {
  return (
    <View style={styles.legendsContainer}>
      {data.map((item: any, index: number) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => onPressLegend(item)}
          style={{
            height: 80,
            backgroundColor: chartColors[index % chartColors.length],
            marginHorizontal: 10,
            borderRadius: 10,
          }}
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
              <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#333' }}>
                {item.expense_type}
              </Text>
              <Text style={{ color: '#777', fontSize: 12 }}>
                {formatDate(item.expense_date)}
              </Text>
            </View>
            <View
              style={{ gap: 10, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#333' }}>
                ₹ {item.expense_amount}
              </Text>
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

const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
const currentYearInitial = new Date().getFullYear();

const chartColors = [
  '#177AD5',
  '#79D2DE',
  '#ED6665',
  '#FFB347',
  '#6A5ACD',
  '#2ECC71',
  '#FF6347',
];

const ViewExpense: React.FC = () => {
  const route = useRoute<ViewExpenseRouteProp>();
  const defaultTab = route.params?.defaultTab ?? 'SUMMARY';
  let month = null;
  let year = null;
  const expenseDataFromProps = route.params?.expenseData || null;
  const isUpdated = route.params?.isUpdate || false;
  if (defaultTab === 'SUMMARY') {
    [month, year] = route.params?.month_name.split('-');
    month = month || currentMonth;
    year = year || currentYearInitial;
  }
  const [activeTab, setActiveTab] = useState<'SUMMARY' | 'CREATE'>(defaultTab);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(month || currentMonth);
  const [selectedYear, setSelectedYear] = useState(year || currentYearInitial);
  const [modalVisible, setModalVisible] = useState(false);
  const [expenseData, setExpenseData] = useState({});
  const [expenseTypes, setExpenseTypes] = useState<any[]>([]);
  const [expenseHistory, setExpenseHistory] = useState<any[]>([]);
  const [pieData, setPieData] = useState<Piechart[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

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
  };

  const fetchExpenseSummary = async () => {
    try {
      setLoading(true);
      const userData = await getUserData();
      console.log('sjfkjsgfkjsgfjs', {
        emp_id: userData?.emp_id,
        month:
          months.indexOf(selectedMonth) + 1 < 10
            ? `0${months.indexOf(selectedMonth) + 1}`
            : months.indexOf(selectedMonth) + 1,
        year: selectedYear.toString(),
      });

      const response = await axios({
        method: 'POST',
        url: `${BASE_URL}${ENDPOINTS.EXPENSE_HISTORY}`,
        data: {
          emp_id: userData?.emp_id,
          month:
            months.indexOf(selectedMonth) + 1 < 10
              ? `0${months.indexOf(selectedMonth) + 1}`
              : months.indexOf(selectedMonth) + 1,
          year: selectedYear.toString(),
        },
        headers: HEADERS,
      });

      const resData = response.data;

      if (resData?.status === 'Success') {
        const expenses = resData?.Data?.expense_types || [];
        const history = resData?.Data?.expense_history || [];

        setExpenseTypes(expenses);
        setExpenseHistory(history);
        setExpenseData(resData);

        // Convert expense_types → pie chart data
        const pieFormatted = expenses.map((item: any, idx: number) => ({
          value: item.total_amount,
          color: chartColors[idx % chartColors.length],
          label: item.expense_name,
          item: item,
        }));

        setPieData(pieFormatted);
      }
    } catch (error) {
      console.log('Error fetching expense summary:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseSummary();
  }, [selectedMonth, selectedYear]);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2008 + 1 },
    (_, i) => 2008 + i,
  );

  const handleDeleteExpense = async (expense_id: number) => {
    try {
      const response = await api.get(ENDPOINTS.EXPENSE_DELETE, {
        params: {
          expense_id: expense_id,
        },
      });

      if (response.data.status === 'Success') {
        setModalVisible(!modalVisible);
        navigation.navigate('Dashboard');
      }

      console.log('Delete Expense Response:', response.data);
    } catch (error) {
      console.log('Error in the deleting expense', error);
    }
  };

  const confirmDeleteExpense = (expenseId: number) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleDeleteExpense(expenseId),
        },
      ],
      { cancelable: true },
    );
  };

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
      <Loader visible={loading} />
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
              <Text
                style={styles.boxTitle}
              >{`${selectedMonth} ${selectedYear}`}</Text>
              <Text style={styles.boxSub}>
                {' '}
                {expenseData?.expense_status || ''}
              </Text>
            </View>
            <View style={styles.boxRight}>
              <Text style={styles.boxTitle}>TOTAL (₹)</Text>
              <Text style={styles.boxSub}>
                {expenseData?.expense_total || ''}
              </Text>
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
                // data={pieData}
                // onPressLegend={() => setModalVisible(true)}
                data={expenseHistory}
                onPressLegend={item => {
                  console.log('Clicked item:', item);
                  // show modal with clicked item
                  setSelectedExpense(item);
                  setModalVisible(true);
                }}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <CreateExpense
          expenseData={expenseDataFromProps}
          isUpdate={isUpdated}
        />
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
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader1}>
              <Text style={styles.modalHeaderText}>Expense Details</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {selectedExpense &&
                  selectedExpense.expense_Status === 'Open' && (
                    <>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                          navigation.navigate('ViewExpenses', {
                            defaultTab: 'CREATE',
                            expenseData: selectedExpense,
                            isUpdate: true,
                          });
                          setActiveTab('CREATE');
                          setModalVisible(false);
                        }}
                      >
                        <Icon
                          name="create-outline"
                          size={20}
                          color={COLORS.primaryColor}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() =>
                          confirmDeleteExpense(selectedExpense?.expense_id)
                        }
                      >
                        <Icon
                          name="trash-outline"
                          size={20}
                          color={COLORS.primaryColor}
                        />
                      </TouchableOpacity>
                    </>
                  )}

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Icon
                    name="close-outline"
                    size={22}
                    color={COLORS.primaryColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalContent1}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date:</Text>
                <Text style={styles.detailValue}>
                  {formatDate(selectedExpense?.expense_date) || ''}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Project:</Text>
                <Text style={styles.detailValue}>
                  {selectedExpense?.project_name || ''}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Expense Type:</Text>
                <Text style={styles.detailValue}>
                  {selectedExpense?.expense_type || ''}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Expense Amount:</Text>
                <Text style={styles.detailValue}>{`₹${
                  selectedExpense?.expense_amount || 0
                }`}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Description:</Text>
                <Text style={styles.detailValue}>
                  {selectedExpense?.expense_description || ''}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Attachment:</Text>
                <Text style={styles.detailValue}>
                  {/* {selectedExpense?.filenames || ''} */}
                  {''}
                </Text>
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
  },
  chartContainer: {
    width: '100%',
  },
  chartItem: {
    width: width,
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
    color: '#333',
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
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    // backgroundColor: COLORS.primaryColor,
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: COLORS.primaryColor,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#333',
  },
  detailValue: {
    textAlign: 'right',
    color: '#333',
    flex: 1,
  },
});

export default ViewExpense;
