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
import { logout, checkOutUser } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from "react-redux";

const Settings = ({ navigation }) => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* القسم العلوي */}
      <View style={styles.headerSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={
              user && user.profilePic
                ? { uri: user.profilePic }
                : require('../../../assets/default-profile.png') 
            }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Icon name="photo-camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{user ? user.name : "زائر"}</Text>
      </View>

      {/* أقسام الإعدادات */}
      <View style={styles.card}>
        <MenuItem
          icon="edit"
          text="تعديل معلومات الملف الشخصي"
          onPress={() => navigation.navigate('UserProfile', { id: user.id })}
        />
        <MenuItem
          icon="notifications"
          text="الإشعارات"
          onPress={() => navigation.navigate('Notifications')}
        />
        <MenuItem
          icon="language"
          text="اللغة"
          status="العربية"
          // onPress={() => navigation.navigate('Language')}
          disabled={true}
        />
      </View>

      {/* قسم جديد للإجراءات الإضافية */}
      {user?.role === "admin" && (
        <View style={styles.card}>
          <MenuItem
            icon="person-add"
            text="إضافة مستخدم"
            onPress={() => navigation.navigate('AddUsers')}
          />
          <MenuItem
            icon="event"
            text="إضافة شيفت"
            onPress={() => navigation.navigate('AddShifts')}
          />
        </View>
      )}

      <View style={styles.card}>
        <MenuItem
          icon="security"
          text="تغيير كلمة المرور"
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <MenuItem
          icon="event"
          text="طلب إجازة"
          onPress={() => navigation.navigate('LeaveRequest')}
        />
      </View>

      <View style={styles.card}>
        <MenuItem
          icon="contact-mail"
          text="اتصل بنا"
          onPress={() => navigation.navigate('Contact')}
        />
        <MenuItem icon="privacy-tip" text="سياسة الخصوصية" />

        <MenuItem 
          icon="logout"
          text="تسجيل الخروج"
          onPress={async () => {
            await dispatch(checkOutUser(user.id));
            dispatch(logout());
          }}
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
    flexDirection: 'row-reverse', 
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menuText: {
    flex: 1,
    marginRight: 10, 
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  menuStatus: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 5, 
  },
});

export default Settings;
