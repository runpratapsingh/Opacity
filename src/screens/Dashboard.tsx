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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get('window');

interface Tile {
  title: string;
  icon: string;
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

const DashboardScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#4158F4'} />
      {/* Top container with parabolic curve */}
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity activeOpacity={0.8}>
              <Icon name="bars" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Dashboard</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity activeOpacity={0.8}>
              <Icon name="search" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Icon name="bullseye" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Icon name="bell" size={20} color="white" />
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
            <Text style={styles.detail}>📱 Mobile App Developer</Text>
            <Text style={styles.detail}>📧 arun.singh@prudencesoftech.com</Text>
            <Text style={styles.detail}>📞 9696809083</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentCardListContainer}>
        <FlatList
          data={tiles}
          numColumns={3}
          contentContainerStyle={styles.grid}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.8} style={styles.tile}>
              <Image source={{ uri: item.icon }} style={styles.tileIcon} />
              <Text style={styles.tileText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
  },
  topContainer: {
    height: height / 3,
    width: width * 1.7,
    backgroundColor: '#4158F4',
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    height: 50,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  headerText: {
    fontSize: 20,
    paddingLeft: 10,
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    gap: 10,
  },
  profileCard: {
    flexDirection: 'row',
    width: width * 0.9,
    marginTop: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  profileText: {
    flex: 1,
    justifyContent: 'center',
    color: '#fff',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#fff',
  },
  detail: {
    fontSize: 12,
    color: '#fff',
  },
  contentCardListContainer: {
    top: -height / 8,
    paddingHorizontal: 10,
  },
  grid: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  tile: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 15,
    margin: 2,
    elevation: 2,
    width: (width - 40) / 3, // Fixed width for each tile
  },
  tileIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  tileText: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DashboardScreen;
