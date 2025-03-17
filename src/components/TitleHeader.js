import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TitleHeader = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default TitleHeader;