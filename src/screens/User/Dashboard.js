import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.username}>Abu Baghdadi</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-photo/happy-man-student-with-afro-hairdo-shows-white-teeth-being-good-mood-after-classes_273609-16608.jpg?t=st=1742138896~exp=1742142496~hmac=2cedde6b820211c63e5c75b9af93f6304171c2b0c0597d7fbd473ce89a6e2d76&w=1380',
            }}
            style={styles.profilePic}
          />
        </TouchableOpacity>
      </View>

      {/* Date Selector - يبدأ من اليوم ولمدة 7 أيام */}
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

      {/* Attendance Status */}
      <View style={styles.attendanceHeader}>
        <Text style={styles.attendanceTitle}>Attendance</Text>
        <Text style={styles.attendanceSubtitle}>current month</Text>
      </View>

      {/* Statistics Grid */}
      <View style={styles.statsGrid}>
        {stats.map((item, index) => (
          <View key={index} style={[styles.statItem, { backgroundColor: item.color }]}>
            <Text style={styles.statCount}>{item.count}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Check-in Button - Centered & Elevated */}
      <TouchableOpacity style={styles.checkinButton}>
        <Icon name="fingerprint" size={50} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navigation with Centered Menu Icon */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={28} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="message" size={28} color="#666" onPress={() => navigation.navigate('Message')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="add-circle" size={50} color="#007AFF" onPress={() => navigation.navigate('Settings')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="calendar-today" size={28} color="#666" onPress={() => navigation.navigate('Calendar')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person" size={28} color="#666" onPress={() => navigation.navigate('UserProfile')} />
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {},
  greeting: { fontSize: 18, color: '#666', fontWeight: '500' },
  username: { fontSize: 24, fontWeight: '600', color: '#1A1A1A' },
  profilePic: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: '#007AFF' },
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
  attendanceHeader: { marginBottom: 20, alignItems: 'flex-start' },
  attendanceTitle: { fontSize: 20, fontWeight: '600', color: '#1A1A1A' },
  attendanceSubtitle: { fontSize: 14, color: '#666' },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statItem: {
    width: '48%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  statCount: { fontSize: 28, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 },
  statLabel: { fontSize: 14, color: '#FFFFFF', textTransform: 'uppercase' },
  checkinButton: {
    position: 'absolute',
    bottom: 140,
    left: '50%',
    marginLeft: -40,
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
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  navItem: { padding: 8 },
  menuButton: {
    marginTop: -25,
    backgroundColor: '#fff',
    borderRadius: 35,
    padding: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  navText: { fontSize: 14, color: '#555' },
});

export default Dashboard;
