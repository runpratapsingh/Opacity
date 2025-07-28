import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../components/HeaderComp';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Notifications" />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 18, padding: 20 }}>No new notifications</Text>
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
  },
});
