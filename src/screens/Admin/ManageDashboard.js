import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import DateSelector from '../../components/DateSelector';
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
      selected: i === 0, // اليوم الأول (اليوم الحالي) يكون مختاراً افتراضياً
    });
  }
  return days;
};

const ManageDashboard = ({navigation}) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const daysArray = getDaysFromToday();
    setDays(daysArray);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Header navigation={navigation} />
      
      {/* Date Selector Section */}
      <DateSelector days={days} />

      {/* Check-in Button */}
      <CheckInButton />

      {/* Cards Section */}
      <View style={styles.cardContainer}>
        {/* الكارد الأول */}
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <Text style={styles.cardTitle}>50</Text>
            <Text style={styles.cardSubtitle}>Total shifts scheduled today</Text>
            <View style={styles.avatarGroup}>
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                style={styles.avatar}
              />
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/women/2.jpg' }}
                style={styles.avatar}
              />
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/3.jpg' }}
                style={styles.avatar}
              />
            </View>
          </View>
          {/* زر في الكارد الأول */}
          <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('MainList')}>
            <Text style={styles.cardButtonText}>Details</Text>
          </TouchableOpacity>
        </View>

        {/* الكارد الثاني */}
        <View style={[styles.card, { backgroundColor: '#FEE2E2' }]}>
          <View style={styles.cardLeft}>
            <Text style={styles.cardTitle}>60</Text>
            <Text style={styles.cardSubtitle}>Number of employees present</Text>
            <View style={styles.avatarGroup}>
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/women/4.jpg' }}
                style={styles.avatar}
              />
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/5.jpg' }}
                style={styles.avatar}
              />
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/women/6.jpg' }}
                style={styles.avatar}
              />
            </View>
          </View>
          {/* زر في الكارد الثاني */}
          <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('MainList')}>
            <Text style={styles.cardButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
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

  /* الهيدر */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {},
  greeting: { fontSize: 18, color: '#666' },
  username: { fontSize: 24, fontWeight: '600' },
  profilePic: { width: 56, height: 56, borderRadius: 28 },

  /* اختيار التاريخ */
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
  selectedDayBox: { backgroundColor: '#000000', borderColor: '#000000' },
  selectedDayText: { color: '#FFFFFF' },

  /* زر البصمة */
  checkinButton: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },

  /* الكروت */
  cardContainer: {
    marginTop: 30,
    paddingHorizontal: 4, 
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flex: 1,
    marginRight: 10, 
  },
  cardTitle: { fontSize: 24, fontWeight: '700', marginBottom: 5 },
  cardSubtitle: { fontSize: 14, color: '#666', marginBottom: 10 },
  avatarGroup: { flexDirection: 'row' },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: -8,
    borderWidth: 2,
    borderColor: '#fff',
  },

  cardButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'flex-end', 
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  /* البار السفلي */
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
});

export default ManageDashboard;
