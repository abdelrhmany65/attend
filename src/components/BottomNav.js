
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const BottomNav = ({ navigation, activeTab }) => {

  const { user } = useSelector(state => state.auth);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.navItem}
        
      >
        <Icon 
          name="home" 
          size={28} 
          
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Message')}
      >
        <Icon 
          name="message" 
          size={28} 
          color={activeTab === 'Message' ? '#007AFF' : '#666'} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Icon name="add-circle" size={50} color="#007AFF" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Calendar')}
      >
        <Icon 
          name="calendar-today" 
          size={28} 
          color={activeTab === 'Calendar' ? '#007AFF' : '#666'} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('UserProfile', { id: user.id })}

      >
        <Icon 
          name="person" 
          size={28} 
          color={activeTab === 'UserProfile' ? '#007AFF' : '#666'} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  navItem: {
    padding: 8,
  },
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

export default BottomNav;