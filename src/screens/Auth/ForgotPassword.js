import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ForgotPassword = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>نسيت كلمة المرور</Text>
      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        keyboardType="email-address"
        textAlign="right" // محاذاة النص لليمين
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('VerificationCode')}>
        <Text style={styles.buttonText}>إرسال رمز إعادة التعيين</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center',
    fontFamily: 'Cairo', 
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 20,
    textAlign: 'right', 
    fontFamily: 'Cairo', 
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16,
    fontFamily: 'Cairo', 
  },
});

export default ForgotPassword;