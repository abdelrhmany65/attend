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
              text1: 'Error',
              text2: 'Shift not found',
            });
          }
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load shift data',
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
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).trim();
  };

  const handleSubmit = async () => {
    if (!employee) return;

    const updatedShift = {
      id: shiftId,
      date: shiftDate.toISOString().split('T')[0],
      start: formatTime(shiftStart),
      end: formatTime(shiftEnd),
      status: 'Scheduled'
    };

    try {
      const updatedShifts = employee.shifts.map(shift =>
        shift.id === shiftId ? updatedShift : shift
      );

      await updateEmployee(employeeId, { ...employee, shifts: updatedShifts });

      Toast.show({
        type: 'success',
        text1: 'Shift Updated',
        text2: 'Shift updated successfully!',
      });

      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update shift',
      });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Shift for {employee?.name}</Text>

      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowPicker('date')}
      >
        <Text style={styles.dateText}>{shiftDate.toDateString()}</Text>
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
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    color: '#666',
    fontSize: 16,
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
  },
});

export default EditShifts;
