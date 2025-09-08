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
import RequisitionScreen from '../screens/Dashboard/RequisitionScreens/RequisitionScreen';
import HolidayScreen from '../screens/Dashboard/HolidayScreen';
import ExpenseScreen from '../screens/Dashboard/ExpenseScreens/ExpenseScreen';
import AssignmentScreen from '../screens/Dashboard/AssignmentScreen';
import ViewTimeSheetScreen from '../screens/Dashboard/TimeSheetScreens/ViewTimeSheet';
import TimeSheetDayDetailScreen from '../screens/Dashboard/TimeSheetScreens/ViewDaySheetDetails';
import EmployeeListScreen from '../screens/Dashboard/SearchScreen';
import EmployeeProfileScreen from '../screens/Dashboard/ViewProfile';
import NotificationScreen from '../screens/Dashboard/NotificationScreen';
import GoalsScreen from '../screens/Dashboard/GoalOfYear';
import ViewExpense from '../screens/Dashboard/ExpenseScreens/ViewExpense';
import CreateRequisition from '../screens/Dashboard/RequisitionScreens/CreateRequisition';
import OSMMap from '../screens/Dashboard/Mapscreen';
import DrawerNavigator from './DrawerNavigation';
import ResetScreen from '../screens/Dashboard/ResetScreen';
import MyTeamScreen from '../screens/Dashboard/ManagerTeams/MyTeamScreen';
import TeamMemberDashboardScreen from '../screens/Dashboard/ManagerTeams/TeamMemberDashboardScreen';
import ManagerAttendanceScreen from '../screens/Dashboard/ManagerTeams/ManagerAttendanceScreen';

type TimesheetData = {
  timesheet_id: number;
  customer_name: string;
  customer_id: string | number;
  project_name: string;
  project_id: string | number;
  description: string;
  web_entry: string;
  android_entry: string;
  date: string;
  time_in: string;
  time_out: string;
  total_time: string;
  status: string;
  work_type_id: number;
  work_type_name: string;
  timesheet_status: string;
  timesheet_status_id: number;
  subtask_id: number; // Optional, if not always present
};

// types.ts
export interface Expense {
  expense_id: number;
  expense_date: string;
  expense_type: string;
  expense_typeId: number;
  expense_amount: number;
  project_id: number;
  project_name: string;
  expense_description: string;
  expense_Status: string;
  filenames: string;
  from_location: string;
  to_location: string;
  distance: number;
  transport_id: number;
  transport_name: string;
  files: { file_name?: string }[]; // in case files array has objects with file_name
}

type UpdateTimeSheetParamList = {
  isUpdate: boolean;
  data: TimesheetData;
  defaultTab: 'CREATE' | 'SUMMARY';
};

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
  DaySheetDetails: { dateDetail: string };
  ViewTimeSheet: UpdateTimeSheetParamList;
  SearchScreen: undefined;
  ViewProfile: { emp_id: string };
  Notification: undefined;
  Goals: undefined;
  ViewExpenses: {
    defaultTab?: 'SUMMARY' | 'CREATE';
    month_name?: string;
    expenseData?: Expense;
    isUpdate?: boolean;
  };
  CreateRequisition: undefined;
  ResetScreen: undefined;
  MyTeams: undefined;
  MemberDashboard: undefined;
  ManagerAttendance: undefined;
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
      {/* <Stack.Screen name="Drawer" component={DrawerNavigator} /> */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CheckInOut" component={CheckInOutScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="Timesheet" component={TimeSheetScreen} />
      <Stack.Screen name="ViewTimeSheet" component={ViewTimeSheetScreen} />
      <Stack.Screen name="Expenses" component={ExpenseScreen} />
      <Stack.Screen name="ViewExpenses" component={ViewExpense} />
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
      <Stack.Screen name="CreateRequisition" component={CreateRequisition} />
      <Stack.Screen name="ResetScreen" component={ResetScreen} />
      <Stack.Screen name="MyTeams" component={MyTeamScreen} />
      <Stack.Screen
        name="MemberDashboard"
        component={TeamMemberDashboardScreen}
      />
      <Stack.Screen
        name="ManagerAttendance"
        component={ManagerAttendanceScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
