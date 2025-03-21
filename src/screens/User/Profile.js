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
  const companies = ['Company A', 'Company B', 'Company C'];
  const genders = ['male', 'female'];

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
        console.error('Error fetching user data:', error);
        Toast.show({
          type: 'error',
          text1: 'Error Loading Data',
          text2: 'Unable to load profile information',
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
        text1: "Permission Denied",
        text2: "You need to allow access to your gallery.",
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
      console.log("Selected Image URI:", result.assets[0].uri);
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
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
      return false;
    }
    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Phone Number',
        text2: 'Phone number must contain digits only',
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
        text1: 'Profile Updated',
        text2: 'Your profile changes have been saved successfully',
      });
      
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Update Error',
        text2: 'Failed to save profile changes',
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
        {/* Title */}
        <Text style={styles.title}>Edit Profile Information</Text>

        {/* Profile Section */}
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
          <Text style={styles.profileName}>{formData.username || 'User Name'}</Text>
        </View>

        {/* Company Selection */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsModalVisible(true)}>
          <Text style={[styles.inputText, !formData.company && styles.placeholder]}>
            {formData.company || 'Select Company'}
          </Text>
          <Icon name="arrow-drop-down" size={24} color="#666" />
        </TouchableOpacity>

        {/* Modal for Company Selection */}
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select a Company</Text>
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
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Gender Selection */}
        <View style={styles.genderContainer}>
          <Text style={styles.label}>Select your gender</Text>
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
                  {g === 'male' ? 'Man' : 'Woman'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Enter Your Username"
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Phone Number"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSave}>
          <Text style={styles.signupText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 30,
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
    right: 0,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#1A1A1A',
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
    marginBottom: 15,
  },
  inputText: {
    fontSize: 16,
    color: '#1A1A1A',
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
  },
  genderContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
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
    marginRight: 10,
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
    marginLeft: 8,
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
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  modalClose: {
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  modalCloseText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
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
  },
});

export default UserEditProfile;
