
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusBadge = ({ status }) => (
  <View style={[styles.badge, status === 'Active' ? styles.active : styles.inactive]}>
    <Text style={[styles.text, status === 'Active' ? styles.activeText : styles.inactiveText]}>
      {status}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20
  },
  active: {
    backgroundColor: '#E8F5E9'
  },
  inactive: {
    backgroundColor: '#FFEBEE'
  },
  text: {
    fontSize: 12,
    fontWeight: '500'
  },
  activeText: {
    color: '#4CAF50'
  },
  inactiveText: {
    color: '#F44336'
  }
});

export default StatusBadge;