import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

interface Tile {
  title: string;
  icon: string;
}

interface Activity {
  title: string;
  time: string;
}

interface Stat {
  value: string;
  label: string;
}

const tiles: Tile[] = [
  { title: 'CHECK IN/OUT', icon: 'https://img.icons8.com/color/96/marker.png' },
  {
    title: 'CHECK IN/OUT',
    icon: 'https://img.icons8.com/color/96/todo-list.png',
  },
  { title: 'TIMESHEET', icon: 'https://img.icons8.com/color/96/stopwatch.png' },
  { title: 'EXPENSES', icon: 'https://img.icons8.com/color/96/money.png' },
  { title: 'LEAVE', icon: 'https://img.icons8.com/color/96/beach.png' },
  {
    title: 'ASSIGNMENT',
    icon: 'https://img.icons8.com/color/96/strategy-board.png',
  },
  { title: 'REQUISITION', icon: 'https://img.icons8.com/color/96/task.png' },
  { title: 'HOLIDAYS', icon: 'https://img.icons8.com/color/96/summer.png' },
];

const activities: Activity[] = [
  { title: 'Checked in at Office', time: '10:05 AM' },
  { title: 'Completed React Native UI task', time: '12:30 PM' },
  { title: 'Team standup meeting', time: '02:00 PM' },
  { title: 'Checked out', time: '06:21 PM' },
];

const stats: Stat[] = [
  { value: '42.5', label: 'Hours This Week' },
  { value: '7', label: 'Tasks Pending' },
  { value: '3', label: 'Projects Active' },
  { value: '92%', label: 'Performance' },
];

const DashboardScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4158F4" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.topContainer}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity>
                <Icon name="bars" size={20} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Dashboard</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity>
                <Icon name="search" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="bell" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="question-circle" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.profileCard}>
            <Image
              source={require('../assets/male_placeholder.png')}
              style={styles.avatar}
            />
            <View style={styles.profileText}>
              <Text style={styles.name}>Arun Pratap Singh</Text>
              <Text style={styles.detail}>Emp Code: P0363</Text>
              <Text style={styles.detail}>Mobile App Developer</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.contentCardListContainer}>
          <FlatList
            data={tiles}
            numColumns={3}
            contentContainerStyle={styles.grid}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.tile}>
                <Image source={{ uri: item.icon }} style={styles.tileIcon} />
                <Text style={styles.tileText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.recentActivitiesContainer}>
          <Text style={styles.recentActivitiesTitle}>Recent Activities</Text>
          {activities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityIndicator} />
              <View style={styles.activityTextContainer}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topContainer: {
    backgroundColor: '#4158F4',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  profileText: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: '#fff',
  },
  detail: {
    fontSize: 14,
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  contentCardListContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  grid: {
    justifyContent: 'center',
  },
  tile: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 15,
    margin: 5,
    elevation: 2,
    width: (width - 60) / 3,
  },
  tileIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  tileText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  recentActivitiesContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  recentActivitiesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4158F4',
    marginRight: 10,
  },
  activityTextContainer: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
  },
  activityTime: {
    fontSize: 12,
    color: '#777',
  },
});

export default DashboardScreen;
