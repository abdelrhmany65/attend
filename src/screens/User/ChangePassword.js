import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAction } from "../../redux/slices/authSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("يرجى ملء جميع الحقول");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }

    dispatch(changePasswordAction(user.id, currentPassword, newPassword));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>تغيير كلمة المرور</Text>
      <TextInput 
        style={styles.input} 
        placeholder="كلمة المرور الحالية" 
        secureTextEntry 
        value={currentPassword} 
        onChangeText={setCurrentPassword} 
        textAlign="right"
      />
      <TextInput 
        style={styles.input} 
        placeholder="كلمة المرور الجديدة" 
        secureTextEntry 
        value={newPassword} 
        onChangeText={setNewPassword} 
        textAlign="right"
      />
      <TextInput 
        style={styles.input} 
        placeholder="تأكيد كلمة المرور الجديدة" 
        secureTextEntry 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
        textAlign="right"
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>تأكيد</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20, 
    backgroundColor: "#fff" 
  },
  header: { 
    fontSize: 28, 
    fontWeight: "700", 
    marginBottom: 20, 
    color: "#1A1A1A", 
    textAlign: "center",
    fontFamily: "Cairo" 
  },
  input: { 
    width: "100%", 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 8, 
    padding: 15, 
    marginBottom: 15,
    textAlign: "right",
    fontFamily: "Cairo" 
  },
  button: { 
    backgroundColor: "#007AFF", 
    padding: 15, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: 10, 
    width: "100%" 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600",
    fontFamily: "Cairo" 
  },
});

export default ChangePassword;