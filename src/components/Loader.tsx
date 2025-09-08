// Loader.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { COLORS } from '../theme/theme';

interface LoaderProps {
  visible: boolean;
}

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color={COLORS.primaryColor} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 5,
  },
});
