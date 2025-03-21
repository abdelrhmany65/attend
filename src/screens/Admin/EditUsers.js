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
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to load user data');
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
        text1: "Success",
        text2: "Profile updated successfully!",
      });
  
      const updatedUser = { ...user, ...updatedData };
      dispatch(updateUser(updatedUser));
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update profile.",
      });
    }
  };
  

  const handleImageEdit = async () => {
    // طلب الإذن للوصول إلى المعرض
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant permission to access the gallery.');
      return;
    }
  
    // فتح المعرض لاختيار صورة
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // ضبط النسبة للطول والعرض
      quality: 1, // أعلى جودة
    });
  
    if (!result.canceled) {
      setFormData({ ...formData, profilePic: result.assets[0].uri });
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>EDIT USER</Text>
        
        {/* Profile Section */}
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

        {/* Department Selection */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.inputText}>
            {formData.department || 'Select Department'}
          </Text>
          <Icon name="arrow-drop-down" size={24} color="#666" />
        </TouchableOpacity>

        {/* Department Modal */}
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Department</Text>
              <FlatList
                data={['IT', 'HR', 'Finance']}
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
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Gender Selection */}
        <View style={styles.genderContainer}>
          <Text style={styles.label}>Gender</Text>
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
                  {gender === 'male' ? 'Male' : 'Female'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Form Fields */}
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={formData.name}
          onChangeText={text => setFormData({...formData, name: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={text => setFormData({...formData, email: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={text => setFormData({...formData, phone: text})}
        />
        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
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
    right: 0,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 4
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#1A1A1A'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 30
  },
  inputContainer: {
    flexDirection: 'row',
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
    color: '#1A1A1A'
  },
  placeholder: {
    color: '#999999'
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#1A1A1A'
  },
  genderContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10
  },
  genderOptions: {
    flexDirection: 'row',
    
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 10
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
  radioSelected: {
    borderColor: '#007AFF'
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
    marginLeft: 8
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
    color: '#1A1A1A'
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  modalItemText: {
    fontSize: 16,
    color: '#1A1A1A'
  },
  modalClose: {
    marginTop: 15,
    alignSelf: 'flex-end'
  },
  modalCloseText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500'
  },
  signupButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20
  },
  signupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
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
    fontWeight: '600'
  }
});


export default EditUsers
