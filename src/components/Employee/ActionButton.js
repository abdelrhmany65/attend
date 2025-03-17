import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActionButton = ({ icon, color, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Icon name={icon} size={20} color={color} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 8
  }
});

export default ActionButton;