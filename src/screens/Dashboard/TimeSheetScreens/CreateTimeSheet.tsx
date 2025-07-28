import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomDropdown from '../../../components/CustumDropdown';

// Define dropdown options
const workTypeOptions = [
  { id: '1', name: 'Development' },
  { id: '2', name: 'Testing' },
  { id: '3', name: 'Design' },
];

const projectOptions = [
  { id: '1', name: 'Navfarm' },
  { id: '2', name: 'Health2Mama' },
  { id: '3', name: 'E-Commerce App' },
];

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
  const [project, setProject] = useState('');
  const [subTask, setSubTask] = useState('');
  const [customer, setCustomer] = useState('');
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
            onValueChange={setWorkType}
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
        onValueChange={setProject}
        options={projectOptions}
      />

      {/* Sub-Sub Task */}
      <CustomDropdown
        label="Sub-Sub Task"
        selectedValue={subTask}
        onValueChange={setSubTask}
        options={subTaskOptions}
      />

      {/* Customer */}
      <CustomDropdown
        label="Customer"
        selectedValue={customer}
        onValueChange={setCustomer}
        options={customerOptions}
      />

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
        value={description}
        onChangeText={setDescription}
      />

      {/* Task Status */}
      <CustomDropdown
        label="Task status"
        selectedValue={taskStatus}
        onValueChange={setTaskStatus}
        options={taskStatusOptions}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn}>
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
