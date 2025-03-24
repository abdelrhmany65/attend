import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import DateSelector from '../../components/DateSelector';
import CheckInButton from '../../components/CheckInButton';
import BottomNav from '../../components/BottomNav';

const getDaysFromToday = () => {
  const today = new Date();
  let days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date();
    day.setDate(today.getDate() + i);
    const dayName = day.toLocaleString('ar-SA', { weekday: 'short' });
    const dateNumber = day.getDate();
    days.push({
      day: dayName,
      date: dateNumber.toString(),
      selected: i === 0,
    });
  }
  return days;
};

const ManageDashboard = ({ navigation }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const daysArray = getDaysFromToday();
    setDays(daysArray);
  }, []);

  return (
    <View style={styles.container}>
      {/* الهيدر */}
      <Header navigation={navigation} />

      {/* محدد التاريخ */}
      <DateSelector days={days} />

      {/* زر البصمة */}
      <CheckInButton />

      {/* بطاقات الإحصائيات */}
      <View style={styles.cardContainer}>
        {/* البطاقة الأولى */}
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <Text style={styles.cardTitle}>50</Text>
            <Text style={styles.cardSubtitle}>إجمالي الورديات المجدولة اليوم</Text>
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
          <TouchableOpacity 
            style={styles.cardButton} 
            onPress={() => navigation.navigate('MainList')}
          >
            <Text style={styles.cardButtonText}>التفاصيل</Text>
          </TouchableOpacity>
        </View>

        {/* البطاقة الثانية */}
        <View style={[styles.card, { backgroundColor: '#FEE2E2' }]}>
          <View style={styles.cardLeft}>
            <Text style={styles.cardTitle}>60</Text>
            <Text style={styles.cardSubtitle}>عدد الموظفين الحاضرين</Text>
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
          <TouchableOpacity 
            style={styles.cardButton} 
            onPress={() => navigation.navigate('MainList')}
          >
            <Text style={styles.cardButtonText}>التفاصيل</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* القائمة السفلية */}
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
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {},
  greeting: { 
    fontSize: 18, 
    color: '#666',
    textAlign: 'right' 
  },
  username: { 
    fontSize: 24, 
    fontWeight: '600',
    textAlign: 'right' 
  },
  profilePic: { width: 56, height: 56, borderRadius: 28 },

  dateContainer: {
    flexDirection: 'row-reverse',
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
  dayText: { 
    fontSize: 14, 
    color: '#666', 
    fontWeight: '500',
    fontFamily: 'Cairo' 
  },
  dateNumber: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#1A1A1A', 
    marginTop: 4,
    fontFamily: 'Cairo' 
  },
  selectedDayBox: { backgroundColor: '#000000', borderColor: '#000000' },
  selectedDayText: { color: '#FFFFFF' },

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

  cardContainer: {
    marginTop: 30,
    paddingHorizontal: 4, 
  },
  card: {
    flexDirection: 'row-reverse',
    backgroundColor: '#F3F4F6',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginBottom: 5,
    textAlign: 'right',
    fontFamily: 'Cairo' 
  },
  cardSubtitle: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 10,
    textAlign: 'right',
    fontFamily: 'Cairo' 
  },
  avatarGroup: { 
    flexDirection: 'row-reverse' 
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: '#fff',
  },

  cardButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Cairo'
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row-reverse',
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