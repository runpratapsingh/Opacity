import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const LeaveScreens = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <Text style={{ fontSize: 18 }}>Coming soon...</Text>
    </View>
  );
};

export default LeaveScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
