import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from "react-redux";

const Settings = ({ navigation }) => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-photo/happy-man-student-with-afro-hairdo-shows-white-teeth-being-good-mood-after-classes_273609-16608.jpg?t=st=1742138896~exp=1742142496~hmac=2cedde6b820211c63e5c75b9af93f6304171c2b0c0597d7fbd473ce89a6e2d76&w=1380',
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Icon name="photo-camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>Abu Baghdadi</Text>
      </View>

      {/* Settings Sections */}
      <View style={styles.card}>
        <MenuItem
          icon="edit"
          text="Edit profile information"
          onPress={() => navigation.navigate('UserProfile', { id: user.id })}
        />
        <MenuItem
          icon="notifications"
          text="Notifications"
          status="ON"
          onPress={() => navigation.navigate('Notifications')}
        />
        <MenuItem
          icon="language"
          text="Language"
          status="English"
          onPress={() => navigation.navigate('Language')}
        />
      </View>

      {/* New Card for additional actions */}
      <View style={styles.card}>
        <MenuItem
          icon="person-add"
          text="Add User"
          onPress={() => navigation.navigate('AddUsers')}
        />
        <MenuItem
          icon="event"
          text="Add Shift"
          onPress={() => navigation.navigate('AddShifts')}
        />
      </View>

      <View style={styles.card}>
        <MenuItem
          icon="security"
          text="Change Password"
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <MenuItem
          icon="event"
          text="Leave Request"
          onPress={() => navigation.navigate('LeaveRequest')}
        />
      </View>

      <View style={styles.card}>
        <MenuItem
          icon="contact-mail"
          text="Contact us"
          onPress={() => navigation.navigate('Contact')}
        />
        <MenuItem icon="privacy-tip" text="Privacy policy" />

        <MenuItem 
        icon="logout"
        text="Logout"
        onPress={() => dispatch(logout())}
        />

      </View>
    </ScrollView>
  );
};

const MenuItem = ({ icon, text, onPress, status }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon name={icon} size={24} color="#333" />
    <Text style={styles.menuText}>{text}</Text>
    {status ? <Text style={styles.menuStatus}>{status}</Text> : null}
    <Icon name="navigate-next" size={24} color="#ccc" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  card: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menuText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  menuStatus: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 5,
  },
});

export default Settings;
