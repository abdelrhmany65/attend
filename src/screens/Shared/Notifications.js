import React, { useState } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Switch, 
  ScrollView, 
  StatusBar 
} from 'react-native';

const Notifications = () => {
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

  const toggleSwitch = (key) => {
    setNotifications(prev => ({...prev, [key]: !prev[key]}));
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
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <Text style={styles.header}>Notifications</Text>

      {/* Common Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common</Text>
        <NotificationItem 
          label="General Notification" 
          value={notifications.general}
          onValueChange={() => toggleSwitch('general')}
        />
        <NotificationItem 
          label="Sound" 
          value={notifications.sound}
          onValueChange={() => toggleSwitch('sound')}
        />
        <NotificationItem 
          label="Vibrate" 
          value={notifications.vibrate}
          onValueChange={() => toggleSwitch('vibrate')}
        />
      </View>

      {/* System & Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System & services update</Text>
        <NotificationItem 
          label="App updates" 
          value={notifications.appUpdates}
          onValueChange={() => toggleSwitch('appUpdates')}
        />
        <NotificationItem 
          label="Bill Reminder" 
          value={notifications.billReminder}
          onValueChange={() => toggleSwitch('billReminder')}
        />
        <NotificationItem 
          label="Promotion" 
          value={notifications.promotion}
          onValueChange={() => toggleSwitch('promotion')}
        />
        <NotificationItem 
          label="Discount Available" 
          value={notifications.discount}
          onValueChange={() => toggleSwitch('discount')}
        />
        <NotificationItem 
          label="Payment Request" 
          value={notifications.paymentRequest}
          onValueChange={() => toggleSwitch('paymentRequest')}
        />
      </View>

      {/* Others Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Others</Text>
        <NotificationItem 
          label="New Service Available" 
          value={notifications.newService}
          onValueChange={() => toggleSwitch('newService')}
        />
        <NotificationItem 
          label="New Tips Available" 
          value={notifications.newTips}
          onValueChange={() => toggleSwitch('newTips')}
        />
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
  },
  itemContainer: {
    flexDirection: 'row',
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
  },
});

export default Notifications;