
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CheckInButton = () => (
  <TouchableOpacity style={styles.checkinButton}>
    <Icon name="fingerprint" size={50} color="#fff" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkinButton: {
    position: 'absolute',
    bottom: 100,
    left: '50%',
    marginLeft: -50,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});

export default CheckInButton;