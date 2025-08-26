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
import Icon from 'react-native-vector-icons/FontAwesome';
import UploadInvoiceModal from '../../../components/ImagePicker';

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

const CreateExpense = () => {
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
  const [amount, setAmount] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
      {/* Project */}
      <CustomDropdown
        label="Project"
        selectedValue={project}
        onValueChange={value => setProject(String(value))}
        options={projectOptions}
      />

      {/* Expense Type */}
      <CustomDropdown
        label="Expense Type"
        selectedValue={subTask}
        onValueChange={value => setSubTask(String(value))}
        options={subTaskOptions}
      />
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
          <Text style={styles.label}>Total Amount</Text>
          <TextInput
            style={[styles.textInput]}
            placeholder="₹ 0.00"
            placeholderTextColor={'#999'}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
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

      {/* Customer */}
      {/* <CustomDropdown
        label="Customer"
        selectedValue={customer}
        onValueChange={setCustomer}
        options={customerOptions}
      /> */}
      <View style={styles.fileAttachment}>
        <Text style={styles.label}>File</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.textInput]}
        >
          <Icon name="cloud-upload" size={20} color="#999" />
          <Text style={styles.uploadInvoiceText}>Upload Receipt</Text>
        </TouchableOpacity>
      </View>

      <UploadInvoiceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

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

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateExpense;

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
  fileAttachment: {
    width: '100%',
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
  uploadInvoiceText: {
    color: '#999',
    paddingLeft: 10,
    fontFamily: 'Roboto-Regular',
  },
  textInput: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4158F4',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    fontFamily: 'Roboto-Regular',
    alignItems: 'center',
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
