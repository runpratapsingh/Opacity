import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/theme';

const UploadInvoiceModal = ({ visible, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null); // ⬅️ New state

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode) {
        const image = response.assets[0];
        setSelectedImage(image.uri);
        console.log('Photo taken:', image);
        onClose();
      }
    });
  };

  const handleSelectFile = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode) {
        const image = response.assets[0];
        setSelectedImage(image.uri);
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
              <TouchableOpacity style={styles.option} onPress={handleTakePhoto}>
                <Icon name="camera-outline" size={40} color="#3366FF" />
                <Text style={styles.optionText}>Take a Photo</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

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
      {/* Image Preview */}
      {selectedImage && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Preview:</Text>
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        </View>
      )}
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
  },
  divider: {
    width: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  previewContainer: {
    marginTop: 16,
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
});
