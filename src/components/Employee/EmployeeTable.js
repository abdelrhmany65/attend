
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import StatusBadge from './StatusBadge';
import ActionButton from './ActionButton';

const EmployeeTable = ({ data, onEdit, onShift, onDelete }) => (
  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}
  >
    <View>
      <View style={styles.header}>
        <Text style={[styles.headerCell, { width: 160 }]}>Employee Name</Text>
        <Text style={[styles.headerCell, { width: 120 }]}>Department</Text>
        <Text style={[styles.headerCell, { width: 120 }]}>Shift Start</Text>
        <Text style={[styles.headerCell, { width: 120 }]}>Shift End</Text>
        <Text style={[styles.headerCell, { width: 100 }]}>Status</Text>
        <Text style={[styles.headerCell, { width: 150 }]}>Actions</Text>
      </View>

      {data.map(employee => (
        <View key={employee.id} style={styles.row}>
          <Text style={[styles.cell, { width: 160 }]}>{employee.name}</Text>
          <Text style={[styles.cell, { width: 120 }]}>{employee.department}</Text>
          <Text style={[styles.cell, { width: 120 }]}>{employee.shiftStart}</Text>
          <Text style={[styles.cell, { width: 120 }]}>{employee.shiftEnd}</Text>
          
          <View style={[styles.statusCell, { width: 100 }]}>
            <StatusBadge status={employee.status} />
          </View>

          <View style={[styles.actions, { width: 150 }]}>
            <ActionButton icon="edit" color="#4CAF50" onPress={() => onEdit(employee.id)} />
            <ActionButton icon="access-time" color="#2196F3" onPress={() => onShift(employee.id)} />
            <ActionButton icon="delete" color="#F44336" onPress={() => onDelete(employee.id)} />
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: '#E9ECEF'
  },
  headerCell: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6C757D',
    paddingHorizontal: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5'
  },
  cell: {
    fontSize: 14,
    color: '#495057',
    paddingHorizontal: 8
  },
  statusCell: {
    paddingHorizontal: 8
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8
  }
});

export default EmployeeTable;