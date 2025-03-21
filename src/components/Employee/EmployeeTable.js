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
      {/* Table Header */}
      <View style={styles.header}>
        <Text style={[styles.headerCell, { width: 160 }]}>Employee Name</Text>
        <Text style={[styles.headerCell, { width: 120 }]}>Department</Text>
        <Text style={[styles.headerCell, { width: 120 }]}>Shift Start</Text>
        <Text style={[styles.headerCell, { width: 120 }]}>Shift End</Text>
        <Text style={[styles.headerCell, { width: 100 }]}>Status</Text>
        <Text style={[styles.headerCell, { width: 150 }]}>Actions</Text>
      </View>

      {/* Table Rows */}
      {data.map((employee) => (
        <View key={employee.id} style={styles.row}>
          {/* Employee Details */}
          <Text style={[styles.cell, { width: 160 }]}>{employee.name || "N/A"}</Text>
          <Text style={[styles.cell, { width: 120 }]}>{employee.department || "N/A"}</Text>

          {/* Shifts */}
          {(employee.shifts && employee.shifts.length > 0) ? (
            employee.shifts.map((shift, index) => (
              <View key={index} style={styles.shiftRow}>
                <Text style={[styles.cell, { width: 120 }]}>{shift.start || "N/A"}</Text>
                <Text style={[styles.cell, { width: 120 }]}>{shift.end || "N/A"}</Text>
                <View style={[styles.statusCell, { width: 100 }]}>
                  <StatusBadge status={shift.status || "Unknown"} />
                </View>
              </View>
            ))
          ) : (
            // Default values if no shifts are provided
            <View style={styles.shiftRow}>
              <Text style={[styles.cell, { width: 120 }]}>N/A</Text>
              <Text style={[styles.cell, { width: 120 }]}>N/A</Text>
              <View style={[styles.statusCell, { width: 100 }]}>
                <StatusBadge status="Unknown" />
              </View>
            </View>
          )}

          {/* Actions */}
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
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: '#E9ECEF',
  },
  headerCell: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6C757D',
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  shiftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    fontSize: 14,
    color: '#495057',
    paddingHorizontal: 8,
  },
  statusCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
});

export default EmployeeTable;
