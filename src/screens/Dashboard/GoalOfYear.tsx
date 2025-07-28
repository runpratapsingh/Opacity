import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/theme';
import Header from '../../components/HeaderComp';
import CustomDropdown from '../../components/CustumDropdown';

const TABS = [
  'PERSONAL COMPETENCY',
  'ORGANIZATIONAL COMPETENCY',
  'GOAL HISTORY',
];

// Dummy components for each tab
const PersonalCompetency = () => (
  <View style={styles.tabContent}>
    <Text>Personal Competency Content</Text>
  </View>
);

const OrganizationalCompetency = () => (
  <View style={styles.tabContent}>
    <Text>Organizational Competency Content</Text>
  </View>
);

const GoalHistory = () => (
  <View style={styles.tabContent}>
    <Text>Goal History Content</Text>
  </View>
);

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 2008; year--) {
    years.push({ id: String(year), name: String(year) });
  }
  return years;
};

const yearOptions = generateYearOptions();

const quarterOptions = [
  { id: 'Q1', name: 'Goals Q1(Apr-Jun)' },
  { id: 'Q2', name: 'Goals Q2(Jul-Sep)' },
  { id: 'Q3', name: 'Goals Q3(Oct-Dec)' },
  { id: 'Q4', name: 'Goals Q4(Jan-Mar)' },
];

const GoalsScreen = () => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const [selectedQuarter, setSelectedQuarter] = useState(quarterOptions[1]); // Default to Q2

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'PERSONAL COMPETENCY':
        return <PersonalCompetency />;
      case 'ORGANIZATIONAL COMPETENCY':
        return <OrganizationalCompetency />;
      case 'GOAL HISTORY':
        return <GoalHistory />;
      default:
        return <PersonalCompetency />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="Goals Q2(Jul-Sep) 2025"
        rightIconName="calendar-month"
        onRightIconPress={() => setModalVisible(true)}
      />

      {/* Rating Boxes */}
      <View style={styles.ratingContainer}>
        <View style={styles.ratingBox}>
          <View style={styles.circle}>
            <Text style={styles.ratingValue}>0.0</Text>
          </View>
          <Text style={styles.ratingLabelGreen}>Self Rating</Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.ratingBox}>
          <View style={styles.circle}>
            <Text style={styles.ratingValue}>0.0</Text>
          </View>
          <Text style={styles.ratingLabelOrange}>Manager Rating</Text>
        </View>
      </View>
      <View style={{ height: 50 }}>
        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Goal Filter</Text>

            <View style={styles.dropdownWrapper}>
              <CustomDropdown
                data={yearOptions}
                value={selectedYear}
                onChange={item => setSelectedYear(item)}
                labelField="name"
                valueField="id"
                placeholder="Select Year"
                showLabel={false}
              />
            </View>

            <View style={styles.dropdownWrapper}>
              <CustomDropdown
                data={quarterOptions}
                value={selectedQuarter}
                onChange={item => setSelectedQuarter(item)}
                labelField="name"
                valueField="id"
                placeholder="Select Quarter"
                showLabel={false}
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                console.log('Selected Year:', selectedYear);
                console.log('Selected Quarter:', selectedQuarter);
                setModalVisible(false);
              }}
            >
              <Text style={{ color: '#fff', textAlign: 'center' }}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCloseIcon}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close-circle" size={24} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Content */}
      <View style={styles.contentContainer}>{renderTabContent()}</View>
    </View>
  );
};

export default GoalsScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#3b5edf',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 1,
  },
  ratingBox: {
    width: width * 0.5,
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingLabelGreen: {
    marginTop: 4,
    color: '#4CAF50',
    fontWeight: '600',
  },
  ratingLabelOrange: {
    marginTop: 4,
    color: '#FF9800',
    fontWeight: '600',
  },
  verticalDivider: {
    height: 70,
    width: 1,
    backgroundColor: COLORS.primaryColor,
  },
  tabsContainer: {
    height: '100%',
    flexDirection: 'row',
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: '#fff',
  },
  tabText: {
    color: '#888',
    fontWeight: '500',
    fontSize: 13,
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  dropdownWrapper: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    marginBottom: 4,
    fontWeight: '600',
    color: '#444',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#3b5edf',
    padding: 12,
    borderRadius: 8,
  },
  modalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
