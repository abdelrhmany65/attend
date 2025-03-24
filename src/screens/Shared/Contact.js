import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>اتصل بنا</Text>

      {/* حقل إدخال الاسم */}
      <TextInput
        style={styles.input}
        placeholder="اسمك"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        textAlign="right" 
      />

      {/* حقل إدخال البريد الإلكتروني */}
      <TextInput
        style={styles.input}
        placeholder="بريدك الإلكتروني"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        textAlign="right"
      />

      {/* حقل إدخال الرسالة */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="رسالتك"
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
        value={message}
        onChangeText={setMessage}
        textAlign="right"
        textAlignVertical="top"
      />

      {/* زر الإرسال */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>إرسال الرسالة</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1A1A1A',
    textAlign: 'right', 
    width: '100%',
    fontFamily: 'Cairo', 
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'right',
    fontFamily: 'Cairo', 
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    width: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Cairo', 
  },
});

export default Contact;