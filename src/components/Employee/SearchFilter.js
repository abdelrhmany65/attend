import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchFilter = ({ 
  searchText, 
  onSearchChange,
  selectedDepartment,
  onDepartmentChange
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const departments = ['All', 'Seller', 'Merchant', 'Customer Service'];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search employee..."
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={onSearchChange}
      />
      
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.filterText}>{selectedDepartment}</Text>
        <Icon name={showDropdown ? 'arrow-drop-up' : 'arrow-drop-down'} size={20} color="#666" />
      </TouchableOpacity>

      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.dropdown}>
            {departments.map((dept) => (
              <TouchableOpacity
                key={dept}
                style={styles.dropdownItem}
                onPress={() => {
                  onDepartmentChange(dept);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownText}>{dept}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    position: 'relative',
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  filterText: {
    color: '#666',
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    width: 150,
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    color: '#333',
    fontSize: 14,
  },
});

export default SearchFilter;