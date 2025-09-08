import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/theme';
import { BASE_URL, HEADERSUPLOAD } from '../api';
import { ENDPOINTS } from '../api/Endpoints';
import axios from 'axios';

const UploadInvoiceModal = ({
  visible,
  onClose,
  setSelectedImage,
  selectedImage,
  setUploadedFileName,
}) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode) {
        const image = response.assets[0];
        setSelectedImage(image.uri);
        console.log('Photo taken:', image);
        setImage(image);
        onClose();
      }
    });
  };

  useEffect(() => {
    if (image !== null) {
      uploadProfilePic(image);
    }
  }, [image]);

  // ✅ Upload function
  const uploadProfilePic = async imagePath => {
    console.log('Uploading image:', imagePath);
    console.log('Uploading image:', imagePath.originalPath);

    try {
      const formData = new FormData();
      formData.append('Files', {
        uri: image.uri,
        name: image.fileName || `photo_${Date.now()}.jpg`,
        type: image.type || 'image/jpeg',
      });
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}${ENDPOINTS.UPLOAD}`,
        formData,
        {
          headers: HEADERSUPLOAD,
        },
      );
      console.log(
        'fskhfksjfhskjfhskj',
        `${BASE_URL}${ENDPOINTS.UPLOAD}`,
        formData,
        {
          headers: HEADERSUPLOAD,
        },
      );

      console.log('Uploaded response:', response.data);
      if (response.data.status === 'Success') {
        setUploadedFileName(prev => [...prev, ...response.data.Data]);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error('Upload error:', error);
      Alert.alert('Error', 'File not uploaded');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFile = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode) {
        const image = response.assets[0];
        setSelectedImage(image.uri);
        setImage(image);
        console.log('File selected:', image);
        onClose();
      }
    });
  };

  return (
    <View>
      <Modal transparent visible={visible} animationType="fade">
        <StatusBar backgroundColor="#00000099" barStyle="light-content" />
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Upload Invoice</Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsContainer}>
              {/* <TouchableOpacity style={styles.option} onPress={handleTakePhoto}>
                <Icon name="camera-outline" size={40} color="#3366FF" />
                <Text style={styles.optionText}>Take a Photo</Text>
              </TouchableOpacity>

              <View style={styles.divider} /> */}

              <TouchableOpacity
                style={styles.option}
                onPress={handleSelectFile}
              >
                <Icon name="document-text-outline" size={40} color="#3366FF" />
                <Text style={styles.optionText}>Select File</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UploadInvoiceModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#ffffff',
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  optionsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  option: {
    flex: 1,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    color: '#333',
  },
  divider: {
    width: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
});
