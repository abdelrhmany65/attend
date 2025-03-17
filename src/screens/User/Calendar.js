import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  // بيانات الأيام المُلونة (مؤقتة، سيتم استبدالها لاحقًا من API)
  const markedDates = {
    '2025-03-01': { selected: true, marked: true, selectedColor: 'blue' },   // حضور
    '2025-03-02': { selected: true, marked: true, selectedColor: 'red' },    // غياب
    '2025-03-03': { selected: true, marked: true, selectedColor: 'green' },  // إجازة
    '2025-03-04': { marked: true, dotColor: 'blue' },   // يوم حضور (نقطة صغيرة)
    '2025-03-05': { marked: true, dotColor: 'red' },    // يوم غياب (نقطة صغيرة)
    '2025-03-06': { marked: true, dotColor: 'green' },  // يوم إجازة (نقطة صغيرة)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance Calendar</Text>
      <Calendar
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#007AFF',
          todayTextColor: '#FF6F00',
          arrowColor: '#333',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CalendarScreen;
