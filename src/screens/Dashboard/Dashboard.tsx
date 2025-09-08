import React, { useEffect } from 'react';
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
import { RootStackParamList } from '../../navigation/StackNavigator';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getUserData } from '../../utils/StorageManager';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { UserData } from '../../types/api.types';
import { SafeAreaView } from 'react-native-safe-area-context';

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

const { width } = Dimensions.get('window');

interface Activity {
  title: string;
  time: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Tile {
  title: string;
  icon: string;
  navigateTo?: keyof RootStackParamList;
}

const tiles: Tile[] = [
  {
    title: 'CHECK IN/OUT',
    icon: 'https://img.icons8.com/color/96/marker.png',
    navigateTo: 'CheckInOut',
  },
  {
    title: 'ATTENDANCE',
    icon: 'https://img.icons8.com/color/96/todo-list.png',
    navigateTo: 'Attendance',
  },
  {
    title: 'TIMESHEET',
    icon: 'https://img.icons8.com/color/96/stopwatch.png',
    navigateTo: 'Timesheet',
  },
  {
    title: 'EXPENSES',
    icon: 'https://img.icons8.com/color/96/money.png',
    navigateTo: 'Expenses',
  },
  // {
  //   title: 'LEAVE',
  //   icon: 'https://img.icons8.com/color/96/beach.png',
  //   navigateTo: 'Leave',
  // },
  {
    title: 'ASSIGNMENT',
    icon: 'https://img.icons8.com/color/96/strategy-board.png',
    navigateTo: 'Assignment',
  },
  {
    title: 'REQUISITION',
    icon: 'https://img.icons8.com/color/96/task.png',
    navigateTo: 'Requisition',
  },
  {
    title: 'HOLIDAYS',
    icon: 'https://img.icons8.com/color/96/summer.png',
    navigateTo: 'Holidays',
  },
  {
    title: 'MY TEAMS',
    icon: 'https://img.icons8.com/color/96/conference.png', // good team icon
    navigateTo: 'MyTeams',
  },
  // {
  //   title: 'RESET PASSWORD',
  //   icon: 'https://img.icons8.com/color/96/password1.png', // Replace with another if you prefer
  //   navigateTo: 'ResetScreen',
  // },
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
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const navigation1 = useNavigation();
  const [userDetails, setUserDetails] = React.useState<UserData | null>(null);

  useEffect(() => {
    // To retrieve later
    const getUserDataFromStorage = async () => {
      const user = await getUserData();
      setUserDetails(user);
      console.log('User from storage:', user);
    };
    getUserDataFromStorage();
  }, []);

  const handleTilePress = (navigateTo?: keyof RootStackParamList) => {
    if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

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
              {/* <TouchableOpacity
              // onPress={() => navigation1.dispatch(DrawerActions.openDrawer())}
              >
                <Icon name="bars" size={20} color="white" />
              </TouchableOpacity> */}
              <Text style={styles.headerText}>Dashboard</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SearchScreen')}
              >
                <Icon name="search" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Goals')}>
                <Icon name="bullseye" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Notification')}
              >
                <Icon name="bell" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.profileCard}>
            <Image
              source={
                // userDetails?.image
                //   ? { uri: userDetails?.image }
                //   :
                require('../../assets/male_placeholder.png')
              }
              style={styles.avatar}
            />
            <View style={styles.profileText}>
              <Text style={styles.name}>{userDetails?.emp_name || ''}</Text>
              {/* <Text style={styles.detail}>Emp Code: P0363</Text>
              <Text style={styles.detail}>Mobile App Developer</Text> */}
              <Text style={styles.detail}>
                Emp Code: {userDetails?.emp_code || ''}
              </Text>
              <View style={styles.row}>
                <Icon
                  name="user-o"
                  size={12}
                  color="#FFF"
                  style={styles.icon}
                />
                <Text style={styles.detail}>
                  {userDetails?.designation || ''}
                </Text>
              </View>

              <View style={styles.row}>
                <Icon
                  name="envelope"
                  size={12}
                  color="#FFF"
                  style={styles.icon}
                />
                <Text style={styles.detail}>{userDetails?.email || ''}</Text>
              </View>

              <View style={styles.row}>
                <Icon name="phone" size={12} color="#FFF" style={styles.icon} />
                <Text style={styles.detail}>{userDetails?.contact || ''}</Text>
              </View>
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
              <TouchableOpacity
                onPress={() => handleTilePress(item.navigateTo)}
                style={styles.tile}
                activeOpacity={0.7}
              >
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
    // paddingHorizontal: 15,
    // paddingTop: 10,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingHorizontal: 15,
    // backgroundColor: 'red',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
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
    paddingHorizontal: 15,
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
    fontSize: 16,
    marginBottom: 4,
    color: '#fff',
  },
  // detail: {
  //   fontSize: 12,
  //   color: '#fff',
  // },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  detail: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 15,
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
    paddingHorizontal: 15,
    marginTop: 20,
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 15,
    margin: 3,
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
    color: '#333',
    textAlign: 'center',
  },
  recentActivitiesContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  recentActivitiesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#333',
  },
  activityTime: {
    fontSize: 12,
    color: '#777',
  },
});

export default DashboardScreen;
