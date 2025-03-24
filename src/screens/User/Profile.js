import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { updateUser, getEmployeeById } from '../../services/employeeService';
import Toast from 'react-native-toast-message';
import { updateUser as updateUserAction } from '../../redux/slices/authSlice';

const UserEditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, token } = useSelector((state) => state.auth);
  
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    gender: '',
    company: '',
    profileImage: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const companies = ['شركة أ', 'شركة ب', 'شركة ج'];
  const genders = ['ذكر', 'أنثى'];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getEmployeeById(user.id);
        setFormData({
          username: userData.username || userData.name,
          email: userData.email,
          phone: userData.phone,
          gender: userData.gender,
          company: userData.company,
          profileImage: userData.profileImage || 'https://example.com/default-avatar.jpg',
        });
      } catch (error) {
        console.error('خطأ في جلب بيانات المستخدم:', error);
        Toast.show({
          type: 'error',
          text1: 'خطأ في تحميل البيانات',
          text2: 'تعذر تحميل معلومات الملف الشخصي',
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (user && user.id) fetchUserData();
  }, [user.id]);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Toast.show({
        type: "error",
        text1: "تم رفض الإذن",
        text2: "يجب السماح بالوصول إلى المعرض.",
      });
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
  
    if (!result.canceled && result.assets.length > 0) {
      console.log("رابط الصورة المحددة:", result.assets[0].uri);
      setFormData({ ...formData, profileImage: result.assets[0].uri });
    }
  };
  

  const handleSelectCompany = (company) => {
    setFormData({ ...formData, company });
    setIsModalVisible(false);
  };

  const validateForm = () => {
    if (!formData.email.includes('@')) {
      Toast.show({ 
        type: 'error', 
        text1: 'بريد إلكتروني غير صالح',
        text2: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
      });
      return false;
    }
    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      Toast.show({
        type: 'error',
        text1: 'رقم هاتف غير صالح',
        text2: 'يجب أن يحتوي رقم الهاتف على أرقام فقط',
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
  
    try {
  
      const updatedData = {
        ...user, 
        name: formData.username,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        company: formData.company,
        profilePic: formData.profileImage, 
      };
  
      const updatedUser = await updateUser(user.id, updatedData, token);
      
      dispatch(updateUserAction(updatedUser));
      
      Toast.show({
        type: 'success',
        text1: 'تم تحديث الملف الشخصي',
        text2: 'تم حفظ التغييرات بنجاح',
      });
      
      navigation.goBack();
    } catch (error) {
      console.error('خطأ في تحديث الملف الشخصي:', error);
      Toast.show({
        type: 'error',
        text1: 'خطأ في التحديث',
        text2: 'فشل في حفظ التغييرات',
      });
    }
  };
  

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* العنوان */}
        <Text style={styles.title}>تعديل المعلومات الشخصية</Text>

        {/* قسم الصورة الشخصية */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: formData.profileImage }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon} onPress={handleImagePick}>
              <Icon name="photo-camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{formData.username || 'اسم المستخدم'}</Text>
        </View>

        {/* اختيار الشركة */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsModalVisible(true)}>
          <Text style={[styles.inputText, !formData.company && styles.placeholder]}>
            {formData.company || 'اختر شركة'}
          </Text>
          <Icon name="arrow-drop-down" size={24} color="#666" />
        </TouchableOpacity>

        {/* نافذة اختيار الشركة */}
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>اختر شركة</Text>
              <FlatList
                data={companies}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => handleSelectCompany(item)}>
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalCloseText}>إغلاق</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* اختيار الجنس */}
        <View style={styles.genderContainer}>
          <Text style={styles.label}>اختر جنسك</Text>
          <View style={styles.genderOptions}>
            {genders.map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genderButton,
                  formData.gender === g && styles.selectedGender,
                ]}
                onPress={() => setFormData({ ...formData, gender: g })}>
                <View
                  style={[
                    styles.radio,
                    formData.gender === g && styles.radioSelected,
                  ]}>
                  {formData.gender === g && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.genderText}>
                  {g === 'ذكر' ? 'ذكر' : 'أنثى'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* حقول الإدخال */}
        <TextInput
          style={styles.input}
          placeholder="أدخل اسم المستخدم"
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="أدخل بريدك الإلكتروني"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="أدخل رقم هاتفك"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />

        {/* زر الحفظ */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSave}>
          <Text style={styles.signupText}>حفظ التغييرات</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

// الأنماط تبقى كما هي دون تغيير
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center', 
    marginBottom: 30,
    fontFamily: 'Cairo', 
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
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
    left: 0, 
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#1A1A1A',
    fontFamily: 'Cairo',
  },
  inputContainer: {
    flexDirection: 'row-reverse', 
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
  },
  inputText: {
    fontSize: 16,
    color: '#1A1A1A',
    textAlign: 'right', 
    fontFamily: 'Cairo', 
  },
  placeholder: {
    color: '#999999',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#1A1A1A',
    textAlign: 'right', 
    fontFamily: 'Cairo', 
  },
  genderContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
    textAlign: 'right', 
    fontFamily: 'Cairo', 
  },
  genderOptions: {
    flexDirection: 'row-reverse', 
  },
  genderButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginLeft: 10,
  },
  selectedGender: {
    borderColor: '#007AFF',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#007AFF',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  genderText: {
    fontSize: 16,
    color: '#1A1A1A',
    marginRight: 8, 
    fontFamily: 'Cairo', 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1A1A1A',
    textAlign: 'right', 
    fontFamily: 'Cairo', 
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#1A1A1A',
    textAlign: 'right', 
    fontFamily: 'Cairo', 
  },
  modalClose: {
    marginTop: 15,
    alignSelf: 'flex-start', 
  },
  modalCloseText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Cairo', 
  },
  signupButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Cairo', 
  },
});

export default UserEditProfile;