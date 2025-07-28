import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../../components/HeaderComp';
import { COLORS } from '../../../theme/theme';

const TimeSheetDayDetailScreen = () => {
  const [showDetails, setShowDetails] = useState(false);

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
        <Text style={styles.cell}>10-Jun-2025</Text>
        <Text style={styles.cell}>09:30</Text>
        <Text style={styles.cell}>18:30</Text>
        <Text style={styles.cell}>09:00</Text>
        <View style={styles.statusBtn}>
          <Text style={styles.statusText}>Full Day</Text>
        </View>
      </View>

      {/* Time Slot + Toggle */}
      <TouchableOpacity
        style={styles.timeRow}
        onPress={() => setShowDetails(!showDetails)}
      >
        <View style={styles.timeLeft}>
          <Icon name="clock-time-four-outline" size={20} color="#000" />
          <Text style={styles.timeText}> 09:30 to 18:30</Text>
        </View>
        <View style={styles.timeRight}>
          <Text style={styles.officeText}>Office</Text>
          <Icon
            name={showDetails ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#000"
          />
        </View>
      </TouchableOpacity>

      {/* Detail Section */}
      {showDetails && (
        <View style={styles.detailBox}>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Customer :</Text> Prudence Technology
            Pvt. Ltd.
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Project :</Text> NavFarm Internal
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Description :</Text> Fix the UI of
            the daily data entry as per research the multiple UIs.
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
