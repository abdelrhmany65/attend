
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatItem = ({ count, label, color }) => (
  <View style={[styles.statItem, { backgroundColor: color }]}>
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  statItem: {
    width: '48%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  statCount: { fontSize: 28, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 },
  statLabel: { fontSize: 14, color: '#FFFFFF', textTransform: 'uppercase' },
});

export default StatItem;