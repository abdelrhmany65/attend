import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getEmployeeById, updateEmployee } from '../../services/employeeService';
import Toast from 'react-native-toast-message';

const EditShifts = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { employeeId, shiftId } = route.params;

  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const [shiftDate, setShiftDate] = useState(new Date());
  const [shiftStart, setShiftStart] = useState(new Date());
  const [shiftEnd, setShiftEnd] = useState(new Date());
  const [showPicker, setShowPicker] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empData = await getEmployeeById(employeeId);
        setEmployee(empData);

        if (empData.shifts && empData.shifts.length > 0) {
          const targetShift = empData.shifts.find(s => s.id === shiftId);
          if (targetShift) {
            const [year, month, day] = targetShift.date.split('-');
            setShiftDate(new Date(year, month - 1, day));
            setShiftStart(new Date(`${targetShift.date}T${targetShift.start}`));
            setShiftEnd(new Date(`${targetShift.date}T${targetShift.end}`));
          } else {
            Toast.show({
              type: 'error',
              text1: 'خطأ',
              text2: 'الوردية غير موجودة',
            });
          }
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'خطأ',
          text2: 'فشل تحميل بيانات الوردية',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeId, shiftId]);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(null);
    if (selectedDate) {
      if (showPicker === 'date') setShiftDate(selectedDate);
      else if (showPicker === 'start') setShiftStart(selectedDate);
      else if (showPicker === 'end') setShiftEnd(selectedDate);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).trim();
  };

  const handleSubmit = async () => {
    if (!employee) return;

    const updatedShift = {
      id: shiftId,
      date: shiftDate.toISOString().split('T')[0],
      start: formatTime(shiftStart),
      end: formatTime(shiftEnd),
      status: 'مجدولة'
    };

    try {
      const updatedShifts = employee.shifts.map(shift =>
        shift.id === shiftId ? updatedShift : shift
      );

      await updateEmployee(employeeId, { ...employee, shifts: updatedShifts });

      Toast.show({
        type: 'success',
        text1: 'تم التحديث',
        text2: 'تم تحديث الوردية بنجاح!',
      });

      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'خطأ',
        text2: 'فشل تحديث الوردية',
      });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>تعديل وردية لـ {employee?.name}</Text>

      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowPicker('date')}
      >
        <Text style={styles.dateText}>
          {shiftDate.toLocaleDateString('ar-EG')}
        </Text>
        <Icon name="calendar-today" size={20} color="#666" />
      </TouchableOpacity>
      {showPicker === 'date' && (
        <DateTimePicker
          value={shiftDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowPicker('start')}
      >
        <Text style={styles.dateText}>{formatTime(shiftStart)}</Text>
        <Icon name="access-time" size={20} color="#666" />
      </TouchableOpacity>
      {showPicker === 'start' && (
        <DateTimePicker
          value={shiftStart}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowPicker('end')}
      >
        <Text style={styles.dateText}>{formatTime(shiftEnd)}</Text>
        <Icon name="access-time" size={20} color="#666" />
      </TouchableOpacity>
      {showPicker === 'end' && (
        <DateTimePicker
          value={shiftEnd}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>حفظ التغييرات</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1a1a1a',
    fontFamily: 'Cairo',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    color: '#666',
    fontSize: 16,
    fontFamily: 'Cairo',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 13,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Cairo',
  },
});

export default EditShifts;