import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/StackNavigator';
import { COLORS } from '../../../theme/theme';
import Header from '../../../components/HeaderComp';

// ✅ Define navigation + route types
type MyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MemberDashboard'
>;
type MyScreenRouteProp = RouteProp<RootStackParamList, 'MemberDashboard'>;

const TeamMemberDashboardScreen: React.FC = () => {
  const navigation = useNavigation<MyScreenNavigationProp>();
  const route = useRoute<MyScreenRouteProp>();

  // ✅ Menu array with icons8 URLs
  const menuItems = [
    {
      id: '1',
      title: 'IN/OUT HISTORY',
      icon: 'https://img.icons8.com/color/96/checklist.png',
      route: 'ManagerAttendance',
    },
    {
      id: '2',
      title: 'EXPENSES',
      icon: 'https://img.icons8.com/color/96/money.png',
      route: 'Expenses',
    },
    {
      id: '3',
      title: 'TIME SHEET',
      icon: 'https://img.icons8.com/color/96/stopwatch.png',
      route: 'TimeSheet',
    },
    {
      id: '4',
      title: 'GOALS',
      icon: 'https://img.icons8.com/color/96/target.png',
      route: 'Goals',
    },
  ];

  const renderItem = ({ item }: { item: (typeof menuItems)[0] }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(item.route as keyof RootStackParamList)
      }
    >
      <Image source={{ uri: item.icon }} style={styles.icon} />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Team Dashboard" />

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={require('../../../assets/male_placeholder.png')} // ✅ Replace with your avatar image
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Arun Pratap Singh</Text>
          <Text style={styles.empCode}>Emp Code: P0363</Text>
          <Text style={styles.role}>👨‍💻 Mobile App Developer</Text>
          <Text
            style={styles.email}
            onPress={() =>
              Linking.openURL('mailto:arun.singh@prudencesoftech.com')
            }
          >
            📧 arun.singh@prudencesoftech.com
          </Text>
          <Text
            style={styles.phone}
            onPress={() => Linking.openURL('tel:9696809083')}
          >
            📞 9696809083
          </Text>
        </View>
      </View>

      {/* Grid Menu */}
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2} // ✅ makes it a 2-column grid
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

export default TeamMemberDashboardScreen;

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileCard: {
    backgroundColor: COLORS.primaryColor,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  empCode: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
  },
  role: {
    fontSize: 14,
    color: '#fff',
    marginTop: 2,
  },
  email: {
    fontSize: 13,
    color: '#fff',
    marginTop: 4,
  },
  phone: {
    fontSize: 13,
    color: '#fff',
    marginTop: 2,
  },
  gridContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    flex: 1,
    margin: 5,
    height: 120,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
