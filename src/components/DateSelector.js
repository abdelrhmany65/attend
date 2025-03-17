
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const DateSelector = ({ days }) => (
  <View style={styles.dateContainer}>
    {days.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.dateBox, item.selected && styles.selectedDayBox]}
        activeOpacity={0.8}
      >
        <Text style={[styles.dayText, item.selected && styles.selectedDayText]}>
          {item.day}
        </Text>
        <Text style={[styles.dateNumber, item.selected && styles.selectedDayText]}>
          {item.date}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 8,
  },
  dateBox: {
    width: 75,
    height: 70,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  dayText: { fontSize: 14, color: '#666', fontWeight: '500' },
  dateNumber: { fontSize: 18, fontWeight: '600', color: '#1A1A1A', marginTop: 4 },
  selectedDayBox: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
});

export default DateSelector;