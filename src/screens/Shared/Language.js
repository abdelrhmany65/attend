
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const languages = [
    'Arabic',
    'English (US)',
    'English (UK)',
    'Mandarin',
    'Hindi',
    'Spanish',
    'French',
    'Russian',
    'Indonesian',
    'Vietnamese'
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Choose Language</Text>
      {languages.map((lang, index) => (
        <TouchableOpacity key={index} style={styles.langItem} onPress={() => setSelectedLanguage(lang)}>
          <Text style={[styles.langText, selectedLanguage === lang && styles.selectedLangText]}>
            {lang}
          </Text>
          {selectedLanguage === lang && <Text style={styles.checkMark}>✓</Text>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 28, fontWeight: '700', marginBottom: 20, color: '#1A1A1A' },
  langItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  langText: { fontSize: 18, color: '#333' },
  selectedLangText: { color: '#007AFF', fontWeight: '600' },
  checkMark: { fontSize: 18, color: '#007AFF' },
});

export default Language;
