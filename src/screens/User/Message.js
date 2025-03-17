import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const notifications = [
  { id: '1', title: 'Lorem ipsum', message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', time: '30m ago' },
  { id: '2', title: 'Lorem ipsum', message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', time: '30m ago' },
  { id: '3', title: 'Lorem ipsum', message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', time: '30m ago' },
];

const Message = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Message</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  time: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
});

export default Message;
