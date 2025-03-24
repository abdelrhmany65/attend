import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Switch, 
  ScrollView, 
  StatusBar, 
  Alert 
} from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState({
    general: true,
    sound: false,
    vibrate: true,
    appUpdates: false,
    billReminder: true,
    promotion: true,
    discount: false,
    paymentRequest: false,
    newService: false,
    newTips: true,
  });

  // تحميل الإعدادات المخزنة عند فتح التطبيق
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem('notificationSettings');
        if (storedSettings) {
          setNotifications(JSON.parse(storedSettings));
        }
      } catch (error) {
        console.error("خطأ في تحميل الإعدادات:", error);
      }
    };

    loadSettings();
  }, []);

  // طلب إذن الإشعارات
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert("تم رفض الإذن", "يرجى تمكين الإشعارات من إعدادات الهاتف.");
        }
      }
    };

    requestPermission();
  }, []);

  // تبديل حالة الإشعارات مع الحفظ
  const toggleSwitch = async (key) => {
    const newSettings = { ...notifications, [key]: !notifications[key] };
    setNotifications(newSettings);

    try {
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error("خطأ في حفظ الإعدادات:", error);
    }
  };

  const NotificationItem = ({ label, value, onValueChange }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemLabel}>{label}</Text>
      <Switch
        trackColor={{ false: '#f0f0f0', true: '#007AFF' }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>الإشعارات</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>عام</Text>
        <NotificationItem label="الإشعارات العامة" value={notifications.general} onValueChange={() => toggleSwitch('general')} />
        <NotificationItem label="الصوت" value={notifications.sound} onValueChange={() => toggleSwitch('sound')} />
        <NotificationItem label="الاهتزاز" value={notifications.vibrate} onValueChange={() => toggleSwitch('vibrate')} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>التحديثات والخدمات</Text>
        <NotificationItem label="تحديثات التطبيق" value={notifications.appUpdates} onValueChange={() => toggleSwitch('appUpdates')} />
        <NotificationItem label="تذكير الفواتير" value={notifications.billReminder} onValueChange={() => toggleSwitch('billReminder')} />
        <NotificationItem label="العروض الترويجية" value={notifications.promotion} onValueChange={() => toggleSwitch('promotion')} />
        <NotificationItem label="التخفيضات المتاحة" value={notifications.discount} onValueChange={() => toggleSwitch('discount')} />
        <NotificationItem label="طلبات الدفع" value={notifications.paymentRequest} onValueChange={() => toggleSwitch('paymentRequest')} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>أخرى</Text>
        <NotificationItem label="خدمات جديدة متاحة" value={notifications.newService} onValueChange={() => toggleSwitch('newService')} />
        <NotificationItem label="نصائح جديدة" value={notifications.newTips} onValueChange={() => toggleSwitch('newTips')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 30,
    textAlign: 'right', 
    fontFamily: 'Cairo', 
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    textAlign: 'right', 
    fontFamily: 'Cairo', 
  },
  itemContainer: {
    flexDirection: 'row-reverse', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  itemLabel: {
    fontSize: 17,
    color: '#444',
    fontWeight: '500',
    textAlign: 'right', 
    marginRight: 10, 
    fontFamily: 'Cairo', 
  },
});

export default NotificationsScreen;
