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
      alert("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(changePasswordAction(user.id, currentPassword, newPassword));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Change Password</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Current Password" 
        secureTextEntry 
        value={currentPassword} 
        onChangeText={setCurrentPassword} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="New Password" 
        secureTextEntry 
        value={newPassword} 
        onChangeText={setNewPassword} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Confirm New Password" 
        secureTextEntry 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 28, fontWeight: "700", marginBottom: 20, color: "#1A1A1A", textAlign: "center" },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 15, marginBottom: 15 },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10, width: "100%" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default ChangePassword;
