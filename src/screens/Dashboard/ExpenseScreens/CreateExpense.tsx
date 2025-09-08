import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomDropdown from '../../../components/CustumDropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import UploadInvoiceModal from '../../../components/ImagePicker';
import { getUserData } from '../../../utils/StorageManager';
import { api } from '../../../api';
import { ENDPOINTS } from '../../../api/Endpoints';
import { StackActions, useNavigation } from '@react-navigation/native';

const expenseTypeOptions = [
  { id: '1', name: 'Frontend UI' },
  { id: '2', name: 'API Integration' },
  { id: '3', name: 'Bug Fixes' },
];

const CreateExpense = ({ expenseData, isUpdate }) => {
  console.log('Expense Data:', expenseData);
  console.log('Is Update:', isUpdate);
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // ⬅️ New state
  const [locationFrom, setLocationFrom] = useState('');
  const [locationTo, setLocationTo] = useState('');
  const [project, setProject] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [travelType, setTravelType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [UploadedFileName, setUploadedFileName] = useState([]);
  const [projectOptions, setProjectOptions] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [expenseTypeOptions, setExpenseTypeOptions] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [TravelTypeOptions, setTravelTypeOptions] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const getProjectDropdown = async () => {
    try {
      const user = await getUserData();
      const response = await api.get(ENDPOINTS.TIMESHEET_PROJECT_LIST, {
        params: {
          emp_id: user?.emp_id,
        },
      });

      console.log('Project Response:', response.data);

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
  const getExpenseTypeDropdown = async () => {
    try {
      const user = await getUserData();
      const response = await api.get(ENDPOINTS.EXPENSE_TYPES);

      console.log('Expense Response:', response.data);

      if (response.data.status === 'Success' && response.data.Data) {
        const ExpenseTypes = response?.data?.Data?.expense_type || [];
        const TravelTypes = response?.data?.Data?.travel_mode || [];
        const formattedExpenseTypes = ExpenseTypes.map((work: any) => ({
          id: work.expense_type_id,
          name: work.expense_type_name,
        }));
        const formattedTravelTypes = TravelTypes.map((work: any) => ({
          id: work.transport_id,
          name: work.transport_name,
        }));
        setExpenseTypeOptions(formattedExpenseTypes);
        setTravelTypeOptions(formattedTravelTypes);
      } else {
        setExpenseTypeOptions([]);
      }
    } catch (error) {
      console.log('Error in getting the dropdown', error);
    }
  };

  useEffect(() => {
    getProjectDropdown();
    getExpenseTypeDropdown();
    console.log('sfklfhskjfhakjfasfshfgsdjfhwg', expenseType);

    if (isUpdate && expenseData) {
      setDate(new Date(expenseData.expense_date));
      setLocationFrom(expenseData.from_location);
      setLocationTo(expenseData.to_location);
      setProject(expenseData.project_id.toString());
      setExpenseType(expenseData.expense_typeId);
      setTravelType(expenseData.transport_id);
      setAmount(expenseData.expense_amount.toString());
      setDescription(expenseData.expense_description);
      setUploadedFileName(expenseData.files || []);
    }
  }, [isUpdate, expenseData]);

  useEffect(() => {
    getProjectDropdown();
    getExpenseTypeDropdown();
  }, []);

  const handleDelete = (index: number) => {
    setUploadedFileName(prev => prev.filter((_, i) => i !== index));
  };

  function convertDateString(dateStr: string) {
    // Map for replacing full/incorrect month names with 3-letter versions
    const monthMap: { [key: string]: string } = {
      Jan: 'Jan',
      Feb: 'Feb',
      Mar: 'Mar',
      Apr: 'Apr',
      May: 'May',
      Jun: 'Jun',
      Jul: 'Jul',
      Aug: 'Aug',
      Sep: 'Sep',
      Sept: 'Sep', // 👈 handles 'Sept'
      Oct: 'Oct',
      Nov: 'Nov',
      Dec: 'Dec',
    };

    // Split incoming string
    const parts = dateStr.split(' '); // ["03", "Sept", "2025"]
    const day = parts[0];
    const month = monthMap[parts[1]] || parts[1]; // convert "Sept" → "Sep"
    const year = parts[2];

    return `${day}-${month}-${year}`;
  }

  const handleCreateExpense = async () => {
    try {
      const user = await getUserData();

      // Build the payload exactly like Android code
      const payload: any = {
        expense_id: isUpdate ? expenseData.expense_id : 0, // since creating new expense
        emp_id: Number(user?.emp_id),
        expense_date: convertDateString(formattedDate), // dd-MMM-yyyy
        project_id: Number(project || 0),
        expensetype_id: Number(expenseType || 0),
        from_location: locationFrom || '',
        to_location: locationTo || '',
        distance: 0, // if you later add distance field
        transport_id: Number(travelType || 0),
        amount: parseFloat(amount || '0'),
        description: description || '',
        files:
          UploadedFileName && UploadedFileName.length > 0
            ? UploadedFileName.map((file: string) => ({ file_name: file }))
            : null,
      };

      console.log('Create Expense Payload:', payload, date);

      // API call
      const response = await api.post(ENDPOINTS.EXPENSE_APPLY, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Create Expense Response:', response.data);
      if (response.data.status === 'Success') {
        Alert.alert(
          'Success',
          response.data.message || 'Expense created successfully ✅',
          [
            {
              text: 'OK',
              onPress: () => {
                // Pop 2 screens (adjust number as needed)
                navigation.dispatch(StackActions.pop(2));
              },
            },
          ],
        );
      } else {
        Alert.alert(response.data.message || 'Failed to create expense ❌');
      }
    } catch (error: any) {
      console.error('Error in createExpense:', error);
      Alert.alert('Something went wrong while creating expense ❌');
    }
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
        selectedValue={expenseType}
        onValueChange={value => setExpenseType(String(value))}
        options={expenseTypeOptions}
      />

      {/* Date and Amount */}
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
            style={styles.textInput}
            placeholder="₹ 0.00"
            placeholderTextColor={'#999'}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Expense Type Specific Fields */}
      {expenseType == '1' && (
        <View style={{ marginBottom: 10 }}>
          {/* Travel Type Dropdown */}
          <CustomDropdown
            label="Travel Type"
            selectedValue={travelType}
            onValueChange={value => setTravelType(value)}
            options={TravelTypeOptions}
          />

          {/* Location From */}
          <Text style={styles.label}>Location From</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter starting location"
            placeholderTextColor={'#999'}
            value={locationFrom}
            onChangeText={setLocationFrom}
          />

          {/* Location To */}
          <Text style={styles.label}>Location To</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter destination location"
            placeholderTextColor={'#999'}
            value={locationTo}
            onChangeText={setLocationTo}
          />
        </View>
      )}

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
        maximumDate={new Date()}
      />

      {/* File Upload */}
      <View style={styles.fileAttachment}>
        <Text style={styles.label}>File</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.textInput}
        >
          <Icon name="cloud-upload" size={20} color="#999" />
          <Text style={styles.uploadInvoiceText}>Upload Receipt</Text>
        </TouchableOpacity>
      </View>

      {/* {selectedImage && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Preview:</Text>
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        </View>
      )} */}
      {UploadedFileName.length > 0 && (
        <FlatList
          data={UploadedFileName}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.row1}>
              <Text style={styles.fileName}>{item.file_name}</Text>
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

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
      <TouchableOpacity onPress={handleCreateExpense} style={styles.submitBtn}>
        <Text style={styles.submitText}>{isUpdate ? 'UPDATE' : 'SUBMIT'}</Text>
      </TouchableOpacity>

      {/* Upload Modal */}
      <UploadInvoiceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        setSelectedImage={setSelectedImage}
        selectedImage={selectedImage}
        setUploadedFileName={setUploadedFileName}
      />
    </ScrollView>
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
  fileAttachment: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
    marginTop: 4,
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
  previewContainer: {
    alignItems: 'flex-start',
    paddingBottom: 16,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  previewImage: {
    width: 180,
    height: 180,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  fileName: {
    fontSize: 16,
    color: '#333',
  },
});

export default CreateExpense;
