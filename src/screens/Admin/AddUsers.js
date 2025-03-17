import React, { useState } from 'react';
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
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddUsers = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [gender, setGender] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const companies = ['Company A', 'Company B', 'Company C'];
  const genders = ['male', 'female'];

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setIsModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* عنوان الصفحة */}
        <Text style={styles.title}>ADD Users</Text>
        {/* قسم البروفايل */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri:
                  'https://img.freepik.com/free-photo/happy-man-student-with-afro-hairdo-shows-white-teeth-being-good-mood-after-classes_273609-16608.jpg?t=st=1742138896~exp=1742142496~hmac=2cedde6b820211c63e5c75b9af93f6304171c2b0c0597d7fbd473ce89a6e2d76&w=1380'
              }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Icon name="photo-camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Abu Baghdadi</Text>
        </View>

        {/* اختيار الشركة */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsModalVisible(true)}>
          <Text
            style={[
              styles.inputText,
              !selectedCompany && styles.placeholder
            ]}>
            {selectedCompany || 'Chosen company'}
          </Text>
          <Icon name="arrow-drop-down" size={24} color="#666" />
        </TouchableOpacity>

        {/* مودال اختيار الشركة */}
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

        {/* اختيار الجنس */}
        <View style={styles.genderContainer}>
          <Text style={styles.label}>Please select your gender identity</Text>
          <View style={styles.genderOptions}>
            {genders.map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genderButton,
                  gender === g && styles.selectedGender
                ]}
                onPress={() => setGender(g)}>
                <View
                  style={[
                    styles.radio,
                    gender === g && styles.radioSelected
                  ]}>
                  {gender === g && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.genderText}>
                  {g === 'male' ? 'Man' : 'Woman'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* حقول النموذج */}
        <TextInput
          style={styles.input}
          placeholder="Enter Your Username"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Phone Number"
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />

        <TextInput 
          style={styles.input} 
          placeholder="Enter Your Password" 
          secureTextEntry
          placeholderTextColor="#999"
          onChangeText={setPassword}
        />

        <TextInput 
          style={styles.input} 
          placeholder="Confirm password" 
          secureTextEntry
          placeholderTextColor="#999"
          onChangeText={setConfirmPassword}
        />


        {/* زر حفظ التعديلات */}
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>Save Changes</Text>
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
  profileImageContainer: {
    position: 'relative'
  },
  profileImage: {
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
  }
});


export default AddUsers
