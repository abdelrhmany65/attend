import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Signup = ({ navigation }) => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const companies = ['Al-Asilan Decorations', 'Factory', 'Seller'];

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setIsModalVisible(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Create an account</Text>

          {/* Company Selection */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setIsModalVisible(true)}>
            <Text style={[styles.inputText, !selectedCompany && styles.placeholder]}>
              {selectedCompany || 'Chosen company'}
            </Text>
            <Icon name="arrow-drop-down" size={24} color="#666" />
          </TouchableOpacity>

          {/* Company Modal */}
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
        <Text style={styles.label}>Please select your gender identity</Text>
        <View style={styles.genderOptions}>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
            onPress={() => setGender('male')}>
            <View style={[styles.radio, gender === 'male' && styles.radioSelected]}>
              {gender === 'male' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.genderText}>Man</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
            onPress={() => setGender('female')}>
            <View style={[styles.radio, gender === 'female' && styles.radioSelected]}>
              {gender === 'female' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.genderText}>Woman</Text>
          </TouchableOpacity>
        </View>
      </View>

          {/* Form Fields */}
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

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity 
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginHighlight}>Login</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginVertical: 30,
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
    gap: 20,
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
  loginLink: {
    marginTop: 25,
    alignItems: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginHighlight: {
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default Signup;
