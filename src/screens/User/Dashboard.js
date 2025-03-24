import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import DateSelector from '../../components/DateSelector';
import StatItem from '../../components/StatItem';
import CheckInButton from '../../components/CheckInButton';
import BottomNav from '../../components/BottomNav';


// دالة لحساب الأيام ابتداءً من اليوم ولمدة 7 أيام
const getDaysFromToday = () => {
  const today = new Date();
  let days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date();
    day.setDate(today.getDate() + i);
    const dayName = day.toLocaleString('en-US', { weekday: 'short' });
    const dateNumber = day.getDate();
    days.push({
      day: dayName,
      date: dateNumber.toString(),
      selected: i === 0, // اليوم الأول (اليوم) يكون مختاراً افتراضياً
    });
  }
  return days;
};

const Dashboard = ({ navigation }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const daysArray = getDaysFromToday();
    setDays(daysArray);
  }, []);

  const stats = [
    { count: '08', label: 'Attendance', color: '#4CAF50' },
    { count: '05', label: 'Early leave', color: '#F44336' },
    { count: '08', label: 'late in', color: '#FF9800' },
    { count: '08', label: 'total leaves', color: '#2196F3' },
  ];

  return (
    <View style={styles.container}>

      {/* Header Section */}
      <Header navigation={navigation} />
      
      {/* Date Selector Section */}
      <DateSelector days={days} />

      {/* Check-in Button */}
      <CheckInButton />

      {/* Bottom Navigation  */}
      <BottomNav 
        navigation={navigation}
        activeTab="Home" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 40,
  },

  attendanceHeader: { marginBottom: 20, alignItems: 'flex-start' },
  attendanceTitle: { fontSize: 20, fontWeight: '600', color: '#1A1A1A' },
  attendanceSubtitle: { fontSize: 14, color: '#666' },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  
});

export default Dashboard;
