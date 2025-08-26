import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Header from '../../../components/HeaderComp';
import { COLORS } from '../../../theme/theme';
import CustomDropdown from '../../../components/CustumDropdown';

// Define types for dropdown options
type DropdownOption = {
  id: string;
  name: string;
};

// Define types for a line item
type LineItem = {
  itemNo: string;
  itemDescription: string;
  specification: string;
  requiredQty: string;
};

// Define dropdown options
const workTypeOptions: DropdownOption[] = [
  { id: '1', name: 'Development' },
  { id: '2', name: 'Testing' },
  { id: '3', name: 'Design' },
];

const projectOptions: DropdownOption[] = [
  { id: '1', name: 'Navfarm' },
  { id: '2', name: 'Health2Mama' },
  { id: '3', name: 'E-Commerce' },
];

const subTaskOptions: DropdownOption[] = [
  { id: '1', name: 'Frontend UI' },
  { id: '2', name: 'API Integration' },
  { id: '3', name: 'Bug Fixes' },
];

const customerOptions: DropdownOption[] = [
  { id: '1', name: 'Customer A' },
  { id: '2', name: 'Customer B' },
  { id: '3', name: 'Customer C' },
];

const taskStatusOptions: DropdownOption[] = [
  { id: '1', name: 'Pending' },
  { id: '2', name: 'In Progress' },
  { id: '3', name: 'Completed' },
];

const itemDescriptionOptions: DropdownOption[] = [
  { id: '1', name: 'Laptop...' },
  { id: '2', name: 'Desktop' },
];

const CreateExpense: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [needByDate, setNeedByDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showNeedByDatePicker, setShowNeedByDatePicker] =
    useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<'from' | 'to' | null>(
    null,
  );
  const [workType, setWorkType] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [subTask, setSubTask] = useState<string>('');
  const [customer, setCustomer] = useState<string>('');
  const [timeFrom, setTimeFrom] = useState<string>('');
  const [timeTo, setTimeTo] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [itemNo, setItemNo] = useState<string>('');
  const [itemDescription, setItemDescription] = useState<string>('');
  const [specification, setSpecification] = useState<string>('');
  const [requiredQty, setRequiredQty] = useState<string>('');
  const [lines, setLines] = useState<LineItem[]>([]);

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedNeedByDate = needByDate.toLocaleDateString('en-GB', {
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

  const handleAddLine = () => {
    const newLine: LineItem = {
      itemNo,
      itemDescription,
      specification,
      requiredQty,
    };
    setLines([...lines, newLine]);
    setModalVisible(false);
    // Reset modal fields
    setItemNo('');
    setItemDescription('');
    setSpecification('');
    setRequiredQty('');
  };

  const handleDeleteLine = (index: number) => {
    const updatedLines = [...lines];
    updatedLines.splice(index, 1);
    setLines(updatedLines);
  };

  const handleSubmit = () => {
    const formData = {
      date,
      needByDate,
      workType,
      project,
      subTask,
      customer,
      timeFrom,
      timeTo,
      description,
      amount,
      taskStatus,
      lines,
    };
    console.log('Form Data:', formData);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Create Requisition" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Requisition Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Requisition Number"
              placeholderTextColor={'#999'}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.halfInput}>
            <CustomDropdown
              label="Requisition Type"
              selectedValue={project}
              onValueChange={value => setProject(String(value))}
              options={projectOptions}
              showLabel={true}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Requisition Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.inputText}>{formattedDate}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Need By Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowNeedByDatePicker(true)}
            >
              <Text style={styles.inputText}>{formattedNeedByDate}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Employee Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Employee Name"
              placeholderTextColor={'#999'}
              value={'Arun singh'}
              onChangeText={setCustomer}
              editable={false}
            />
          </View>
          <View style={styles.halfInput}>
            <CustomDropdown
              label="Item Category"
              selectedValue={project}
              onValueChange={value => setProject(String(value))}
              options={projectOptions}
              showLabel={true}
            />
          </View>
        </View>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          onConfirm={(selectedDate: Date) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
          onCancel={() => setShowDatePicker(false)}
          isDarkModeEnabled={false}
        />
        <DateTimePickerModal
          isVisible={showNeedByDatePicker}
          mode="date"
          onConfirm={(selectedDate: Date) => {
            setShowNeedByDatePicker(false);
            if (selectedDate) setNeedByDate(selectedDate);
          }}
          onCancel={() => setShowNeedByDatePicker(false)}
          minimumDate={new Date()}
          isDarkModeEnabled={false}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text style={styles.label}>Fuel Expense line(s):</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>Add Line(s)</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={lines}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.lineItem}>
              <View style={styles.lineItemDetails}>
                <Text style={styles.lineText}>
                  Item No:{' '}
                  <Text style={{ fontWeight: 'normal', color: '#333' }}>
                    {item.itemNo}
                  </Text>
                </Text>
                <Text style={styles.lineText}>
                  Description:{' '}
                  <Text style={{ fontWeight: 'normal', color: '#333' }}>
                    {item.itemDescription}
                  </Text>
                </Text>
                <Text style={styles.lineText}>
                  Specification:{' '}
                  <Text style={{ fontWeight: 'normal', color: '#333' }}>
                    {item.specification}
                  </Text>
                </Text>
                <Text style={styles.lineText}>
                  Required Qty:{' '}
                  <Text style={{ fontWeight: 'normal', color: '#333' }}>
                    {item.requiredQty}
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleDeleteLine(index)}
                style={styles.deleteButton}
              >
                <Icon name="delete" size={24} color="#FF0000" />
              </TouchableOpacity>
            </View>
          )}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalText}>Create Line</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.closeButton}>X</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                }}
              >
                <TextInput
                  style={styles.input}
                  onChangeText={setItemNo}
                  value={itemNo}
                  placeholder="Item No."
                  placeholderTextColor={'#999'}
                  editable={false}
                />
                <CustomDropdown
                  label="Description"
                  selectedValue={itemDescription}
                  onValueChange={value => setItemDescription(String(value))}
                  options={itemDescriptionOptions}
                  showLabel={false}
                />
                <TextInput
                  style={styles.activeInput}
                  onChangeText={setSpecification}
                  value={specification}
                  placeholder="Specification"
                  placeholderTextColor={'#999'}
                />
                <TextInput
                  style={styles.activeInput}
                  onChangeText={setRequiredQty}
                  value={requiredQty}
                  placeholder="Required Qty"
                  keyboardType="numeric"
                  placeholderTextColor={'#999'}
                />
                <TouchableOpacity style={styles.button} onPress={handleAddLine}>
                  <Text style={styles.textStyle}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

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
  addButton: {
    backgroundColor: COLORS.primaryColor,
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  lineItemDetails: {
    flex: 1,
  },
  lineText: {
    marginBottom: 3,
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  closeButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: COLORS.primaryColor,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    width: '100%',
  },
  activeInput: {
    height: 40,
    borderColor: COLORS.primaryColor,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    width: '100%',
  },
});

export default CreateExpense;
