export const ENDPOINTS = {
  // Authentication
  LOGIN: '/api/login/userLogin',
  CHANGE_PASSWORD: '/api/timesheet/changepassword',
  FORGOT_PASSWORD: '/api/timesheet/forgotpassword',
  GET_APP_VERSION: '/api/login/Get_AppVersion',

  // Check-In/Check-Out
  GET_CHECK_INS: '/api/checkinout/GetCheckIns',
  CHECK_IN: '/api/checkinout/checkin',
  CHECK_OUT: '/api/checkInOut/CheckOut',
  CHECK_IN_OUT_HISTORY: '/api/checkInOut/CheckInOutHistory',

  // Requisition
  REQUISITION_LIST: '/api/Requisition/GetRequisitionList',
  REQUISITION_APPROVAL: '/api/Requisition/RequisitionApproval',
  REQUISITION_ITEMS_CATEGORY: '/api/Requisition/ReqItemsCategory',
  REQUISITION_SEARCHED_ITEMS: '/api/Requisition/SearchedItems',
  REQUISITION_CREATE: '/api/Requisition/saveRequisition',
  REQUISITION_UPDATE: '/api/Requisition/UpdateRequisition',
  REQUISITION_DETAILS: '/api/Requisition/GetRequisitionDetails',
  REQUISITION_APPROVE_REJECT: '/api/Requisition/RequisitionApproval_Submit',

  // Timesheet
  TIMESHEET_PROJECTS: '/api/timesheet/getproject',
  TIMESHEET_PUNCH_TIME: '/api/timesheet/Get_InTime',
  TIMESHEET_CREATE: '/api/timesheet/create_timesheet',
  TIMESHEET_FINAL_SUBMIT: '/api/timesheet/final_submit',
  TIMESHEET_CUSTOMER_LIST: '/api/timesheet/getemployee_assigned_task_Customer',
  TIMESHEET_PROJECT_LIST: '/api/timesheet/getemployee_assigned_task_project',
  TIMESHEET_SUBTASK_LIST: '/api/timesheet/getemployee_assigned_task',
  TIMESHEET_MONTHLY_WEEK_LIST: '/api/timesheet/getmonthly_weeklist',
  TIMESHEET_UPDATE: '/api/timesheet/update_timesheet',
  TIMESHEET_STATUS: '/api/timesheet/timesheet_status',
  TIMESHEET_DELETE: '/api/timesheet/Delete_TimesheetEntry',
  TIMESHEET_DROPDOWN: '/api/binddropdown/CustomerList',
  TIMESHEET_SUBMIT: '/api/expense/timesheet_submit',
  TIMESHEET_APPROVE: '/api/expense/timesheet_approve',
  TIMESHEET_REJECT: '/api/expense/timesheet_reject',
  TIMESHEET_WEEKLY_SUMMARY: '/api/expense/timesheet_history',
  TIMESHEET_DETAILS: '/api/timesheet/Timesheet_breakup',

  // Expense
  EXPENSE_TYPES: '/api/expense/expense_type',
  EXPENSE_HISTORY: '/api/expense/expensehistory',
  EXPENSE_SUBMIT: '/api/expense/expense_submit',
  EXPENSE_DELETE: '/api/expense/delete_expense',
  EXPENSE_CHECK_DUPLICATE: '/api/expense/check_duplicate_expense',
  EXPENSE_APPLY: '/api/expense/apply_expense',
  EXPENSE_APPROVE: '/api/expense/expense_approve',
  EXPENSE_REJECT: '/api/expense/expense_reject',
  EXPENSE_PENDING_COUNT: '/api/expense/pending_count',
  EXPENSE_PAY_DAYS: '/api/expense/pay_days',
  EXPENSE_DETAILS: '/api/expense/expense_detail',
  EXPENSE_DELETE_FILE: '/api/expense/ExpenseDeleteFile',
  EXPENSE_MANAGER_EMPLOYEES: '/api/expense/manager_employees',
  EXPENSE_EMPLOYEES_LIST: '/api/expense/employees_list',
  EXPENSE_STATUS: '/api/expense/expense_status',
  EXPENSE_PROJECT_LIST: '/api/expense/ProjectList',

  // File Upload
  UPLOAD: '/api/upload',
  UPLOAD_PROFILE: '/api/upload/postprofile',
  UPLOAD_SALE_FILE: '/api/uploadSaleFile',

  // Feedback
  FEEDBACK_SUBMIT: '/api/feedback/submit_feedback',

  // Holiday
  HOLIDAY_LIST: '/api/holiday/holidays_list',

  // Notification
  NOTIFICATION_HISTORY: '/api/ots_master/Get_Notification_History',
  NOTIFICATION_READ_STATUS: '/api/ots_master/Notification_Count_Status',
  FCM_TOKEN: '/api/ots_master/updateDeviceToken',

  // Task
  TASK_LOAD: '/api/task/load_task',
  TASK_DETAILS: '/api/task/get_task_detail',
  TASK_HISTORY: '/api/task/get_task_history',
  TASK_CREATE: '/api/task/create_task',
  TASK_UPDATE: '/api/task/Updatebyemp',
  TASK_DELETE_FILE: '/api/task/DeleteFile',

  // Sales Task
  SALES_TASK_HISTORY: '/api/saletask/GetSalesTaskHistory',
  SALES_TASK_DETAILS: '/api/saletask/GetSalesTaskDetails',
  SALES_TASK_UPDATE_FOLLOW_UP: '/api/saletask/UpdateFollow_up',
  SALES_TASK_LOAD: '/api/saletask/load_saletask',
  SALES_TASK_CREATE: '/api/saletask/SubmitSalesTask',
  SALES_TASK_UPDATE_MANAGER: '/api/saletask/SalesTaskUpdatebymanager',
  SALES_TASK_UPDATE_EMPLOYEE: '/api/saletask/SalesTaskUpdatebyEmp',
  SALES_TASK_DELETE_FILE: '/api/saletask/DeleteSaleTaskFile',
  SALES_TASK_SEARCH_PROSPECT: '/api/saletask/SearchProspectName',

  // Goal
  GOAL_HISTORY: '/api/goal/get_goalhistory',

  // Customer
  CUSTOMER_LIST: '/api/binddropdown/CustomerList',

  // Menu
  MENU: '/api/ots_master/get_menu',

  // Profile
  EMPLOYEE_PROFILE: '/api/timesheet/employeeprofile',

  // Tashi Endpoints (Leave and Delegation)
  LEAVE_HISTORY: '/api/Leave/GetLeaveHistory',
  LEAVE_TYPES: '/api/Leave/leavetype',
  LEAVE_BALANCE: '/api/Leave/get_leavebalance_on_leavetype',
  LEAVE_APPLY: '/api/Leave/Applyleave',
  LEAVE_SANDWICH_BALANCE: '/api/Leave/get_sandwith_leavebalance',
  LEAVE_SANDWICH_TYPE: '/api/Leave/apply_leavetypeforsandwich',
  LEAVE_APPROVAL_HISTORY: '/api/Leave/get_leaveapproval_history',
  LEAVE_APPROVE_REJECT: '/api/Leave/leaveapproveal',
  LEAVE_DETAILS: '/api/Leave/get_apply_leave_detail',
  LEAVE_CANCEL: '/api/Leave/cancelLeave',
  LEAVE_CANCEL_WITHDRAW: '/api/Leave/cancelleavewithdraw',
  LEAVE_ENCASHMENT_APPROVAL_HISTORY:
    '/api/Leave/get_leaveencashment_approval_history',
  LEAVE_ENCASHMENT_APPROVE_REJECT: '/api/Leave/leaveencashment_approval',
  LEAVE_ENCASHMENT_DATA: '/api/Leave/get_leaveencashment',
  LEAVE_ENCASHMENT_APPLY: '/api/Leave/addLeaveEncashment',
  LEAVE_DELEGATION_APPROVAL: '/api/Delegation/Leave_Delegation_Approval',
  BIND_EMPLOYEE: '/api/settings/bindemployee',
  EMPLOYEE_DASHBOARD: '/api/ots_master/get_employeedashboard',
} as const;
