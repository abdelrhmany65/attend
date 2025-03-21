import React, { useState } from "react";
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
  Alert,
} from "react-native";
import { addEmployee } from "../../services/employeeService";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";


const AddUsers = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [gender, setGender] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const companies = ["Company A", "Company B", "Company C"];
  const genders = ["male", "female"];

  const navigation = useNavigation();

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setIsModalVisible(false);
  };

  // image 
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "You need to allow access to photos.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
      Toast.show({
        type: "success",
        text1: "Profile Updated",
        text2: "Profile picture updated successfully.",
      });
    }
  };

  const handleSave = async () => {
    if (!name || !email || !phone || !password || !confirmPassword || !selectedCompany || !gender) {
      Toast.show({
        type: "error",
        text1: "Missing Information",
        text2: "Please fill out all fields.",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password Mismatch",
        text2: "Passwords do not match.",
      });
      return;
    }

    const newEmployee = {
      name,
      email,
      phone,
      password,
      company: selectedCompany,
      gender,
      profilePic: profilePic || "https://via.placeholder.com/100", 
    };

    try {
      await addEmployee(newEmployee);
      Toast.show({
        type: "success",
        text1: "User Added",
        text2: `${name} has been successfully added.`,
      });
      navigation.navigate("ManageDashboard");

    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to add user. Please try again.",
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>ADD Users</Text>

        {/* صورة الملف الشخصي */}
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
            <Image
              source={{ uri: profilePic || "https://via.placeholder.com/100" }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
              <Icon name="photo-camera" size={18} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
          <Text style={styles.profileName}>{name || "User Name"}</Text>
        </View>

        {/* حقول الإدخال */}
        <TextInput 
          style={styles.input} 
          placeholder="Name" 
          placeholderTextColor="#999999" 
          onChangeText={setName} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          keyboardType="email-address" 
          placeholderTextColor="#999999" 
          onChangeText={setEmail} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Phone" 
          keyboardType="phone-pad" 
          placeholderTextColor="#999999" 
          onChangeText={setPhone} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          secureTextEntry 
          placeholderTextColor="#999999" 
          onChangeText={setPassword} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Confirm Password" 
          secureTextEntry 
          placeholderTextColor="#999999" 
          onChangeText={setConfirmPassword} 
        />

        {/* اختيار الشركة */}
        <TouchableOpacity 
          style={styles.inputContainer} 
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={[styles.inputText, !selectedCompany && styles.placeholder]}>
            {selectedCompany || "Choose a company"}
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
                    onPress={() => handleSelectCompany(item)}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity 
                style={styles.modalClose} 
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* اختيار الجنس */}
        <View style={styles.genderContainer}>
          <Text style={styles.label}>Select your gender</Text>
          <View style={styles.genderOptions}>
            {genders.map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.genderButton, gender === g && styles.selectedGender]}
                onPress={() => setGender(g)}
              >
                <View style={[styles.radio, gender === g && styles.radioSelected]}>
                  {gender === g && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.genderText}>{g === "male" ? "Man" : "Woman"}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* زر الحفظ */}
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
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "center",
    marginVertical: 30,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#1A1A1A",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
  },
  inputText: {
    fontSize: 16,
    color: "#1A1A1A",
  },
  placeholder: {
    color: "#999999",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color: "#1A1A1A",
    height: 50,
  },
  genderContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
  },
  genderOptions: {
    flexDirection: "row",
    gap: 20,
  },
  genderButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedGender: {
    borderColor: "#007AFF",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#007AFF",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  genderText: {
    fontSize: 16,
    color: "#1A1A1A",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#1A1A1A",
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalItemText: {
    fontSize: 16,
    color: "#1A1A1A",
  },
  modalClose: {
    marginTop: 15,
    alignSelf: "flex-end",
  },
  modalCloseText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
  signupButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 20,
  },
  signupText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddUsers;
