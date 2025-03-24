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
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getEmployeeById, updateEmployee } from '../../services/employeeService';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../../redux/slices/authSlice';
import Toast from 'react-native-toast-message';

const EditUsers = ({ route, navigation }) => {
  const { id = 'default-id' } = route.params || {};
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    gender: '',
    profilePic: '',
    role: 'user',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmployeeById(id);
        setFormData({
          name: data.name,
          department: data.department,
          email: data.email,
          phone: data.phone,
          profilePic: data.profilePic,
          gender: data.gender,
          role: data.role || 'user', 
        });
      } catch (error) {
        console.error('خطأ في جلب بيانات المستخدم:', error);
        Alert.alert('خطأ', 'فشل تحميل بيانات المستخدم');
      }
    };
    fetchData();
  }, [id]);

  const handleSave = async () => {
    try {
      const updatedData = {
        ...formData,
        password: formData.password || user.password,
      };
  
      await updateEmployee(id, updatedData);
  
      Toast.show({
        type: "success",
        text1: "نجاح",
        text2: "تم تحديث الملف بنجاح!",
      });
      if (id === user.id) {
        const updatedUser = { ...user, ...updatedData };
        dispatch(updateUser(updatedUser));
      }
  
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "خطأ",
        text2: "فشل تحديث الملف الشخصي",
      });
    }
  };

  const handleImageEdit = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('رفض الإذن', 'يجب منح إذن الوصول إلى المعرض');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setFormData({ ...formData, profilePic: result.assets[0].uri });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>تعديل المستخدم</Text>
        
        {/* قسم الصورة الشخصية */}
        <View style={styles.profileHeader}>
          <View style={styles.profilePicContainer}>
            <Image
              source={formData.profilePic ? { uri: formData.profilePic } : require('../../../assets/default-profile.png')}
              style={styles.profilePic}
            />
            <TouchableOpacity style={styles.editIcon} onPress={handleImageEdit}>
              <Icon name="photo-camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{formData.name}</Text>
        </View>

        {/* اختيار القسم */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.inputText}>
            {formData.department || 'اختر القسم'}
          </Text>
          <Icon name="arrow-drop-down" size={24} color="#666" />
        </TouchableOpacity>

        {/* نافذة اختيار القسم */}
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>اختر القسم</Text>
              <FlatList
                data={['الشركة أ', 'الشركة ب', 'الشركة ج']}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setFormData({ ...formData, department: item });
                      setIsModalVisible(false);
                    }}>
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
          <Text style={styles.label}>الجنس</Text>
          <View style={styles.genderOptions}>
            {['male', 'female'].map(gender => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.genderButton,
                  formData.gender === gender && styles.selectedGender
                ]}
                onPress={() => setFormData({...formData, gender})}>
                <View style={styles.radio}>
                  {formData.gender === gender && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.genderText}>
                  {gender === 'male' ? 'ذكر' : 'أنثى'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* اختيار الدور */}
        <View style={styles.genderContainer}>
          <Text style={styles.label}>دور المستخدم</Text>
          <View style={styles.genderOptions}>
            {['admin', 'user'].map(role => (
              <TouchableOpacity
                key={role}
                style={[
                  styles.genderButton,
                  formData.role === role && styles.selectedGender
                ]}
                onPress={() => setFormData({...formData, role})}>
                <View style={styles.radio}>
                  {formData.role === role && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.genderText}>
                  {role === 'admin' ? 'مدير' : 'مستخدم'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* حقول الإدخال */}
        <TextInput
          style={styles.input}
          placeholder="الاسم الكامل"
          value={formData.name}
          onChangeText={text => setFormData({...formData, name: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="البريد الإلكتروني"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={text => setFormData({...formData, email: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="الهاتف"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={text => setFormData({...formData, phone: text})}
        />
        
        {/* زر الحفظ */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>حفظ التغييرات</Text>
        </TouchableOpacity>
      </ScrollView>  
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexGrow: 1,
    padding: 25,
    backgroundColor: '#FFFFFF'
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30
  },
  profilePicContainer: {
    position: 'relative'
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 4
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#1A1A1A',
    fontFamily: 'Cairo'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Cairo'
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
    marginBottom: 15
  },
  inputText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Cairo'
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
    fontFamily: 'Cairo'
  },
  genderContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
    fontFamily: 'Cairo'
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
    marginLeft: 10
  },
  selectedGender: {
    borderColor: '#007AFF'
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF'
  },
  genderText: {
    fontSize: 16,
    color: '#1A1A1A',
    marginRight: 8,
    fontFamily: 'Cairo'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1A1A1A',
    fontFamily: 'Cairo',
    textAlign: 'right'
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  modalItemText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Cairo',
    textAlign: 'right'
  },
  modalClose: {
    marginTop: 15,
    alignSelf: 'flex-start'
  },
  modalCloseText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Cairo'
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 13,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Cairo'
  }
});

export default EditUsers;