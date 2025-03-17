
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.button, currentPage === 1 && styles.disabled]}
      onPress={onPrev}
      disabled={currentPage === 1}
    >
      <Text style={styles.buttonText}>Previous</Text>
    </TouchableOpacity>

    <Text style={styles.text}>Page {currentPage} / {totalPages}</Text>

    <TouchableOpacity
      style={[styles.button, currentPage === totalPages && styles.disabled]}
      onPress={onNext}
      disabled={currentPage === totalPages}
    >
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 10
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500'
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333'
  },
  disabled: {
    backgroundColor: '#666'
  }
});

export default Pagination;