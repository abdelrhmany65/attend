import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatusBadge from './StatusBadge';

const EmployeeTable = ({ data, onEdit, onShift, onDelete }) => {
  const navigation = useNavigation();

  const handleDelete = (id) => {
    Alert.alert(
      "تأكيد الحذف",
      "هل أنت متأكد من رغبتك في حذف هذا الموظف؟",
      [
        { text: "إلغاء", style: "cancel" },
        { text: "حذف", onPress: () => onDelete(id), style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* رأس الجدول */}
      <View style={styles.header}>
        <Text style={[styles.headerCell, styles.nameHeader]}>الاسم</Text>
        <Text style={styles.headerCell}>بداية الشيفت</Text>
        <Text style={styles.headerCell}>نهاية الشيفت</Text>
        <Text style={styles.headerCell}>الحالة</Text>
      </View>

      {/* صفوف الجدول */}
      {data.map((employee) => (
        <View key={employee.id} style={styles.row}>
          {/* اسم الموظف */}
          <TouchableOpacity
            style={styles.nameCell}
            onPress={() => navigation.navigate('EmployeeDetailsScreen', { employeeId: employee.id })}
          >
            <Text style={styles.cellText} numberOfLines={1}>{employee.name || "غير متوفر"}</Text>
          </TouchableOpacity>

          {/* بيانات الشيفت */}
          {employee.shifts?.length > 0 ? (
            <>
              <Text style={styles.cell}>{employee.shifts[0].start || "غير متوفر"}</Text>
              <Text style={styles.cell}>{employee.shifts[0].end || "غير متوفر"}</Text>
              <View style={styles.statusCell}>
                <StatusBadge status={employee.shifts[0].status || "غير معروف"} />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.cell}>غير متوفر</Text>
              <Text style={styles.cell}>غير متوفر</Text>
              <View style={styles.statusCell}>
                <StatusBadge status="غير معروف" />
              </View>
            </>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: 'row-reverse', 
    backgroundColor: '#F8F9FA',
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: '#E9ECEF',
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#6C757D',
    textAlign: 'center',
    paddingHorizontal: 4,
    fontFamily: 'Cairo', 
  },
  nameHeader: {
    flex: 1,
    textAlign: 'right', 
  },
  row: {
    flexDirection: 'row-reverse', 
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  nameCell: {
    flex: 1,
    paddingHorizontal: 4,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#495057',
    paddingHorizontal: 4,
    textAlign: 'center',
    fontFamily: 'Cairo',
  },
  cellText: {
    fontSize: 14,
    color: '#495057',
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  statusCell: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
});

export default EmployeeTable;