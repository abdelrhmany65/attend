
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchFilter = ({ searchText, onSearchChange }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search employee..."
      placeholderTextColor="#999"
      value={searchText}
      onChangeText={onSearchChange}
    />
    <TouchableOpacity style={styles.filterButton}>
      <Text style={styles.filterText}>All Departments</Text>
      <Icon name="arrow-drop-down" size={20} color="#666" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40
  },
  filterText: {
    color: '#666',
    marginRight: 4
  }
});

export default SearchFilter;