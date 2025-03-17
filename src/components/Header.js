
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({ navigation }) => (
  <View style={styles.header}>
    <View style={styles.userInfo}>
      <Text style={styles.greeting}>Hello,</Text>
      <Text style={styles.username}>Abu Baghdadi</Text>
    </View>
    <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-photo/happy-man-student-with-afro-hairdo-shows-white-teeth-being-good-mood-after-classes_273609-16608.jpg',
        }}
        style={styles.profilePic}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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
  profilePic: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    borderWidth: 2, 
    borderColor: '#007AFF' 
  },
});

export default Header;