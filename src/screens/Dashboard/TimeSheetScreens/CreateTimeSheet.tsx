import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomDropdown from '../../../components/CustumDropdown';
import { api } from '../../../api';
import { ENDPOINTS } from '../../../api/Endpoints';
import { getUserData } from '../../../utils/StorageManager';

const subTaskOptions = [
  { id: '1', name: 'Frontend UI' },
  { id: '2', name: 'API Integration' },
  { id: '3', name: 'Bug Fixes' },
];

const customerOptions = [
  { id: '1', name: 'Customer A' },
  { id: '2', name: 'Customer B' },
  { id: '3', name: 'Customer C' },
];

const taskStatusOptions = [
  { id: '1', name: 'Pending' },
  { id: '2', name: 'In Progress' },
  { id: '3', name: 'Completed' },
];

const CreateScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState<'from' | 'to' | null>(
    null,
  );

  const [workType, setWorkType] = useState('');
  const [workTypeOptions, setWorkTypeOptions] = useState([]);
  const [project, setProject] = useState('');
  const [projectOptions, setProjectOptions] = useState([]);
  const [subTask, setSubTask] = useState('');
  const [subTaskOptions, setSubTaskOptions] = useState([]);
  const [customer, setCustomer] = useState('');
  const [customerOptions, setCustomerOptions] = useState([]);
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [description, setDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('');

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const handleTimeConfirm = (pickedDate: Date) => {
    const formattedTime = pickedDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (showTimePicker === 'from') {
      setTimeFrom(formattedTime);
    } else if (showTimePicker === 'to') {
      setTimeTo(formattedTime);
    }
    setShowTimePicker(null);
  };

  const getProjectDropdown = async () => {
    try {
      const user = await getUserData();
      const response = await api.get(ENDPOINTS.TIMESHEET_PROJECT_LIST, {
        params: {
          emp_id: user?.emp_id,
        },
      });

      if (response.data.status === 'success' && response.data.Data) {
        const workTypes = response.data.Data || [];
        const formattedWorkTypes = workTypes.map((work: any) => ({
          id: work.Value,
          name: work.Text,
        }));
        setProjectOptions(formattedWorkTypes);
      } else {
        setProjectOptions([]);
      }
    } catch (error) {
      console.log('Error in getting the dropdown', error);
    }
  };
  const getSubTaskDropdown = async (project: string) => {
    try {
      const user = await getUserData();
      const response = await api.get(ENDPOINTS.TIMESHEET_SUBTASK_LIST, {
        params: {
          emp_id: user?.emp_id,
          project_id: project,
        },
      });

      console.log('Sub Task Response:', response.data);

      if (response.data.status === 'success' && response.data.Data) {
        const workTypes = response.data.Data || [];
        const formattedWorkTypes = workTypes.map((work: any) => ({
          id: { id: work.task_id, customer: work.customer_name },
          name: work.project_name,
        }));
        setSubTaskOptions(formattedWorkTypes);
      } else {
        setSubTaskOptions([]);
      }
    } catch (error) {
      console.log('Error in getting the dropdown', error);
    }
  };

  const fetchWorkOptions = async () => {
    try {
      const response = await api.get(ENDPOINTS.TIMESHEET_DROPDOWN);

      console.log('Work Options Response:', response.data);
      if (response.data.status === 'success' && response.data.Data) {
        const workTypes = response.data.Data.work_type || [];
        const formattedWorkTypes = workTypes.map((work: any) => ({
          id: work.Value,
          name: work.Text,
        }));
        setWorkTypeOptions(formattedWorkTypes);
      } else {
        setWorkTypeOptions([]);
      }

      // }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const handleProjectChange = async (projectId: string) => {
    try {
      setProject(projectId);
      // Fetch and update sub-task options based on selected project
      await getSubTaskDropdown(projectId);
    } catch (error) {
      console.error('Error handling project change:', error);
    }
  };
  const handleWorkTypeChange = async (workTypeId: string) => {
    try {
      setWorkType(workTypeId);
      // Fetch and update sub-task options based on selected work type
      await getProjectDropdown();
    } catch (error) {
      console.error('Error handling work type change:', error);
    }
  };

  useEffect(() => {
    getProjectDropdown();
    fetchWorkOptions();
  }, []);

  const handleSubmit = async () => {
    try {
      const user = await getUserData();
      const payload = {
        emp_id: user?.emp_id,
        posting_date: date.toLocaleDateString('en-GB'),
        worktype_id: workType,
        customer_id: customer,
        project_id: project,
        task_status: taskStatus,
        sub_task_id: subTask,
        time_from:
          workTypeOptions.find(opt => opt.id === workType)?.name ===
            'Holiday' ||
          workTypeOptions.find(opt => opt.id === workType)?.name === 'Leave' ||
          workTypeOptions.find(opt => opt.id === workType)?.name ===
            'Weekend' ||
          workTypeOptions.find(opt => opt.id === workType)?.name === 'Comp-Off'
            ? '00:00'
            : `${date.toLocaleDateString('en-GB')} ${timeFrom}`,
        time_to:
          workTypeOptions.find(opt => opt.id === workType)?.name ===
            'Holiday' ||
          workTypeOptions.find(opt => opt.id === workType)?.name === 'Leave' ||
          workTypeOptions.find(opt => opt.id === workType)?.name ===
            'Weekend' ||
          workTypeOptions.find(opt => opt.id === workType)?.name === 'Comp-Off'
            ? '00:00'
            : `${date.toLocaleDateString('en-GB')} ${timeTo}`,
        description: description,
      };

      const response = await api.post(ENDPOINTS.TIMESHEET_CREATE, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Submit Timesheet Response:', response.data, payload);

      if (response.data.status === 'success') {
        Alert.alert(response.data.message);
        // Optionally reset form or navigate
      } else if (response.data.status === 'error') {
        Alert.alert(response.data.message);
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting timesheet:', error);
      alert('Server is not responding');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Date and Work Type */}
      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.inputText}>{formattedDate}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.halfInput}>
          <CustomDropdown
            label="Work Type"
            selectedValue={workType}
            onValueChange={Value => handleWorkTypeChange(String(Value))}
            options={workTypeOptions}
          />
        </View>
      </View>

      {/* Date Picker */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={selectedDate => {
          setShowDatePicker(false);
          if (selectedDate) setDate(selectedDate);
        }}
        onCancel={() => setShowDatePicker(false)}
        isDarkModeEnabled={false}
      />

      {/* Project */}
      <CustomDropdown
        label="Project"
        selectedValue={project}
        onValueChange={value => handleProjectChange(String(value))}
        options={projectOptions}
      />

      {/* Sub-Sub Task */}
      <CustomDropdown
        label="Sub-Sub Task"
        selectedValue={subTask}
        onValueChange={value => {
          setSubTask(String(value.id.toString()));
          setCustomer(String(value.customer));
        }}
        options={subTaskOptions}
      />

      {/* Customer */}
      {/* <CustomDropdown
        label="Customer"
        selectedValue={customer}
        onValueChange={value => setCustomer(String(value))}
        options={customerOptions}
      /> */}

      <View pointerEvents="none" style={{ marginVertical: 8 }}>
        <Text style={styles.label}>Customer</Text>
        <TextInput
          style={[styles.textInput]}
          placeholder="Customer"
          placeholderTextColor={'#555'}
          value={customer}
          onChangeText={setCustomer}
        />
      </View>

      {/* Time From and To */}
      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Time From</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowTimePicker('from')}
          >
            <Text style={styles.inputText}>{timeFrom || 'Select Time'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Time To</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowTimePicker('to')}
          >
            <Text style={styles.inputText}>{timeTo || 'Select Time'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={showTimePicker !== null}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setShowTimePicker(null)}
      />

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.textInput, styles.textArea]}
        multiline
        numberOfLines={4}
        placeholder="Description"
        placeholderTextColor={'#555'}
        value={description}
        onChangeText={setDescription}
      />

      {/* Task Status */}
      <CustomDropdown
        label="Task status"
        selectedValue={taskStatus}
        onValueChange={value => setTaskStatus(String(value))}
        options={taskStatusOptions}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 30,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
    fontFamily: 'Roboto-Regular',
  },
  dateInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4158F4',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    height: 40,
  },
  inputText: {
    color: '#000',
    fontFamily: 'Roboto-Regular',
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4158F4',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    fontFamily: 'Roboto-Regular',
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: '#4158F4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
});
