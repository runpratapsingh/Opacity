// navigation/DrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen1 from '../screens/Dashboard/Dashboard';
import CheckInOutScreen from '../screens/Dashboard/CheckInOutScreen';
import AttendanceScreen from '../screens/Dashboard/AttendanceScreen';
import TimeSheetScreen from '../screens/Dashboard/TimeSheetScreens/TimeSheetScreen';
import LeaveScreens from '../screens/Dashboard/LeaveScreens';
import RequisitionScreen from '../screens/Dashboard/RequisitionScreens/RequisitionScreen';
import HolidayScreen from '../screens/Dashboard/HolidayScreen';
import ExpenseScreen from '../screens/Dashboard/ExpenseScreens/ExpenseScreen';
import AssignmentScreen from '../screens/Dashboard/AssignmentScreen';
import CustomDrawerContent from '../components/DrawerContent';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: true }}
      initialRouteName="Dashboard"
    >
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            backgroundColor: '#fff',
            borderRadius: 5,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          },
          drawerLabelStyle: {
            color: '#007aff',
            fontSize: 16,
            //   fontFamily: FONTFAMILY.semibold,
          },
          drawerLabel: 'Dashboard',
          drawerIcon: ({ color, size }) => (
            <Icon name="tachometer-alt" color="#000000" size={20} />
          ),
          headerShown: false,
        }}
        name="Dashboard"
        component={DashboardScreen1}
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            backgroundColor: '#fff',
            borderRadius: 5,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          },
          drawerLabelStyle: {
            color: '#007aff',
            fontSize: 16,
            //   fontFamily: FONTFAMILY.semibold,
          },
          drawerLabel: 'CheckInOut',
          drawerIcon: ({ color, size }) => (
            <Icon name="tachometer-alt" color="#000000" size={20} />
          ),
          headerShown: false,
        }}
        name="CheckInOut"
        component={CheckInOutScreen}
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            backgroundColor: '#fff',
            borderRadius: 5,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          },
          drawerLabelStyle: {
            color: '#007aff',
            fontSize: 16,
            //   fontFamily: FONTFAMILY.semibold,
          },
          drawerLabel: 'Attendance',
          drawerIcon: ({ color, size }) => (
            <Icon name="tachometer-alt" color="#000000" size={20} />
          ),
          headerShown: false,
        }}
        name="Attendance"
        component={AttendanceScreen}
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            backgroundColor: '#fff',
            borderRadius: 5,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          },
          drawerLabelStyle: {
            color: '#007aff',
            fontSize: 16,
            //   fontFamily: FONTFAMILY.semibold,
          },
          drawerLabel: 'Timesheet',
          drawerIcon: ({ color, size }) => (
            <Icon name="tachometer-alt" color="#000000" size={20} />
          ),
          headerShown: false,
        }}
        name="Timesheet"
        component={TimeSheetScreen}
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            backgroundColor: '#fff',
            borderRadius: 5,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          },
          drawerLabelStyle: {
            color: '#007aff',
            fontSize: 16,
            //   fontFamily: FONTFAMILY.semibold,
          },
          drawerLabel: 'Leave',
          drawerIcon: ({ color, size }) => (
            <Icon name="tachometer-alt" color="#000000" size={20} />
          ),
          headerShown: false,
        }}
        name="Leave"
        component={LeaveScreens}
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            backgroundColor: '#fff',
            borderRadius: 5,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          },
          drawerLabelStyle: {
            color: '#007aff',
            fontSize: 16,
            //   fontFamily: FONTFAMILY.semibold,
          },
          drawerLabel: 'Requisition',
          drawerIcon: ({ color, size }) => (
            <Icon name="tachometer-alt" color="#000000" size={20} />
          ),
          headerShown: false,
        }}
        name="Requisition"
        component={RequisitionScreen}
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            backgroundColor: '#fff',
            borderRadius: 5,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          },
          drawerLabelStyle: {
            color: '#007aff',
            fontSize: 16,
            //   fontFamily: FONTFAMILY.semibold,
          },
          drawerLabel: 'Holidays',
          drawerIcon: ({ color, size }) => (
            <Icon name="tachometer-alt" color="#000000" size={20} />
          ),
          headerShown: false,
        }}
        name="Holidays"
        component={HolidayScreen}
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            backgroundColor: '#fff',
            borderRadius: 5,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          },
          drawerLabelStyle: {
            color: '#007aff',
            fontSize: 16,
            //   fontFamily: FONTFAMILY.semibold,
          },
          drawerLabel: 'Expenses',
          drawerIcon: ({ color, size }) => (
            <Icon name="tachometer-alt" color="#000000" size={20} />
          ),
          headerShown: false,
        }}
        name="Expenses"
        component={ExpenseScreen}
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            backgroundColor: '#fff',
            borderRadius: 5,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          },
          drawerLabelStyle: {
            color: '#007aff',
            fontSize: 16,
            //   fontFamily: FONTFAMILY.semibold,
          },
          drawerLabel: 'Assignment',
          drawerIcon: ({ color, size }) => (
            <Icon name="tachometer-alt" color="#000000" size={20} />
          ),
          headerShown: false,
        }}
        name="Assignment"
        component={AssignmentScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
