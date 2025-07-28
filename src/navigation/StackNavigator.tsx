import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import SplashScreen from '../screens/Splace/SplaceScreen';
import DashboardScreen1 from '../screens/Dashboard/Dashboard';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import CheckInOutScreen from '../screens/Dashboard/CheckInOutScreen';
import AttendanceScreen from '../screens/Dashboard/AttendanceScreen';
import TimeSheetScreen from '../screens/Dashboard/TimeSheetScreens/TimeSheetScreen';
import LeaveScreens from '../screens/Dashboard/LeaveScreens';
import RequisitionScreen from '../screens/Dashboard/RequisitionScreen';
import HolidayScreen from '../screens/Dashboard/HolidayScreen';
import ExpenseScreen from '../screens/Dashboard/ExpenseScreen';
import AssignmentScreen from '../screens/Dashboard/AssignmentScreen';
import ViewTimeSheetScreen from '../screens/Dashboard/TimeSheetScreens/ViewTimeSheet';
import TimeSheetDayDetailScreen from '../screens/Dashboard/TimeSheetScreens/ViewDaySheetDetails';
import EmployeeListScreen from '../screens/Dashboard/SearchScreen';
import EmployeeProfileScreen from '../screens/Dashboard/ViewProfile';
import NotificationScreen from '../screens/Dashboard/NotificationScreen';
import GoalsScreen from '../screens/Dashboard/GoalOfYear';

export type RootStackParamList = {
  Dashboard: undefined;
  Login: undefined;
  Splash: undefined;
  ForgotPassword: undefined;
  CheckInOut: undefined;
  Attendance: undefined;
  Timesheet: undefined;
  Expenses: undefined;
  Leave: undefined;
  Assignment: undefined;
  Requisition: undefined;
  Holidays: undefined;
  DaySheetDetails: undefined;
  ViewTimeSheet: undefined;
  SearchScreen: undefined;
  ViewProfile: undefined;
  Notification: undefined;
  Goals: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen1} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CheckInOut" component={CheckInOutScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="Timesheet" component={TimeSheetScreen} />
      <Stack.Screen name="ViewTimeSheet" component={ViewTimeSheetScreen} />
      <Stack.Screen name="Expenses" component={ExpenseScreen} />
      <Stack.Screen name="Leave" component={LeaveScreens} />
      <Stack.Screen name="Assignment" component={AssignmentScreen} />
      <Stack.Screen name="Requisition" component={RequisitionScreen} />
      <Stack.Screen name="Holidays" component={HolidayScreen} />
      <Stack.Screen
        name="DaySheetDetails"
        component={TimeSheetDayDetailScreen}
      />
      <Stack.Screen name="SearchScreen" component={EmployeeListScreen} />
      <Stack.Screen name="ViewProfile" component={EmployeeProfileScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Goals" component={GoalsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
