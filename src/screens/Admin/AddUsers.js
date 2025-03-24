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
  const [role, setRole] = useState("user");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const companies = ["الشركة أ", "الشركة ب", "الشركة ج"];
  const genders = ["ذكر", "أنثى"];

  const navigation = useNavigation();

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setIsModalVisible(false);
  };

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("مطلوب إذن", "يجب السماح بالوصول إلى الصور");
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
        text1: "تم التحديث",
        text2: "تم تحديث صورة الملف الشخصي بنجاح",
      });
    }
  };

  const handleSave = async () => {
    if (!name || !email || !phone || !password || !confirmPassword || !selectedCompany || !gender) {
      Toast.show({
        type: "error",
        text1: "معلومات ناقصة",
        text2: "يرجى ملء جميع الحقول",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "عدم تطابق",
        text2: "كلمات المرور غير متطابقة",
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
      role,
      profilePic: profilePic || "https://via.placeholder.com/100",
    };

    try {
      await addEmployee(newEmployee);
      Toast.show({
        type: "success",
        text1: "تم الإضافة",
        text2: `تمت إضافة ${name} بنجاح`,
      });
      navigation.navigate("ManageDashboard");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "خطأ",
        text2: "فشل إضافة المستخدم. يرجى المحاولة مرة أخرى",
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>إضافة مستخدم</Text>

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
          <Text style={styles.profileName}>{name || "اسم المستخدم"}</Text>
        </View>

        {/* حقول الإدخال */}
        <TextInput 
          style={styles.input} 
          placeholder="الاسم" 
          placeholderTextColor="#999999" 
          onChangeText={setName} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="البريد الإلكتروني" 
          keyboardType="email-address" 
          placeholderTextColor="#999999" 
          onChangeText={setEmail} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="الهاتف" 
          keyboardType="phone-pad" 
          placeholderTextColor="#999999" 
          onChangeText={setPhone} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="كلمة المرور" 
          secureTextEntry 
          placeholderTextColor="#999999" 
          onChangeText={setPassword} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="تأكيد كلمة المرور" 
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
            {selectedCompany || "اختر شركة"}
          </Text>
          <Icon name="arrow-drop-down" size={24} color="#666" />
        </TouchableOpacity>

        {/* مودال اختيار الشركة */}
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
                style={[styles.genderButton, gender === g && styles.selectedGender]}
                onPress={() => setGender(g)}
              >
                <View style={[styles.radio, gender === g && styles.radioSelected]}>
                  {gender === g && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.genderText}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* اختيار الدور */}
        <View style={styles.genderContainer}>
          <Text style={styles.label}>اختر الدور</Text>
          <View style={styles.genderOptions}>
            {["مدير", "مستخدم"].map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.genderButton, role === r && styles.selectedGender]}
                onPress={() => setRole(r)}
              >
                <View style={[styles.radio, role === r && styles.radioSelected]}>
                  {role === r && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.genderText}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* زر الحفظ */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSave}>
          <Text style={styles.signupText}>حفظ التغييرات</Text>
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
    fontFamily: 'Cairo',
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
    left: 0,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#1A1A1A",
    fontFamily: 'Cairo',
  },
  inputContainer: {
    flexDirection: "row-reverse",
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
    fontFamily: 'Cairo',
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
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  genderContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
    fontFamily: 'Cairo',
    textAlign: 'right',
  },
  genderOptions: {
    flexDirection: "row-reverse",
    gap: 20,
  },
  genderButton: {
    flexDirection: "row-reverse",
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
    fontFamily: 'Cairo',
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
    fontFamily: 'Cairo',
    textAlign: 'right',
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalItemText: {
    fontSize: 16,
    color: "#1A1A1A",
    fontFamily: 'Cairo',
    textAlign: 'right',
  },
  modalClose: {
    marginTop: 15,
    alignSelf: "flex-start",
  },
  modalCloseText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: 'Cairo',
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
    fontFamily: 'Cairo',
  },
});

export default AddUsers;