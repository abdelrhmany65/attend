import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getEmployees, updateEmployee } from '../../services/employeeService';
import Toast from 'react-native-toast-message';

const AddShifts = () => {
  const navigation = useNavigation();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [shiftDate, setShiftDate] = useState(new Date());
  const [shiftStart, setShiftStart] = useState(new Date());
  const [shiftEnd, setShiftEnd] = useState(new Date());
  const [showPicker, setShowPicker] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load employees',
      });
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(null);
    if (selectedDate) {
      switch (showPicker) {
        case 'date':
          setShiftDate(selectedDate);
          break;
        case 'start':
          setShiftStart(selectedDate);
          break;
        case 'end':
          setShiftEnd(selectedDate);
          break;
      }
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(' ', '');
  };

  const handleSubmit = async () => {
    if (!selectedEmployee) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please select an employee',
      });
      return;
    }

    const newShift = {
      date: shiftDate.toISOString().split('T')[0],
      start: formatTime(shiftStart),
      end: formatTime(shiftEnd),
      status: 'Scheduled'
    };

    try {
      const employee = employees.find(e => e.id === selectedEmployee);
      const updatedShifts = [...(employee.shifts || []), newShift];
      
      await updateEmployee(selectedEmployee, {
        ...employee,
        shifts: updatedShifts
      });

      Toast.show({
        type: 'success',
        text1: 'Shift Added',
        text2: `Shift for ${employee.name} added successfully`,
      });

      navigation.navigate('MainList');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add shift',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>ADD Shifts</Text>

      {/* Employee Selection */}
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={selectedEmployee}
          onValueChange={setSelectedEmployee}
        >
          <Picker.Item label="Select Employee" value="" />
          {employees.map(employee => (
            <Picker.Item 
              key={employee.id} 
              label={`${employee.name} (${employee.department})`} 
              value={employee.id} 
            />
          ))}
        </Picker>
      </View>

      {/* Date Picker */}
      <TouchableOpacity 
        style={styles.dateInput}
        onPress={() => setShowPicker('date')}
      >
        <Text style={styles.dateText}>
          {shiftDate.toLocaleDateString()}
        </Text>
        <Icon name="calendar-today" size={20} color="#666" />
      </TouchableOpacity>

      {/* Start Time Picker */}
      <TouchableOpacity 
        style={styles.dateInput}
        onPress={() => setShowPicker('start')}
      >
        <Text style={styles.dateText}>
          {formatTime(shiftStart)}
        </Text>
        <Icon name="access-time" size={20} color="#666" />
      </TouchableOpacity>

      {/* End Time Picker */}
      <TouchableOpacity 
        style={styles.dateInput}
        onPress={() => setShowPicker('end')}
      >
        <Text style={styles.dateText}>
          {formatTime(shiftEnd)}
        </Text>
        <Icon name="access-time" size={20} color="#666" />
      </TouchableOpacity>

      {/* DateTimePicker Modal */}
      {showPicker && (
        <DateTimePicker
          value={
            showPicker === 'date' ? shiftDate :
            showPicker === 'start' ? shiftStart :
            shiftEnd
          }
          mode={showPicker === 'date' ? 'date' : 'time'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity 
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Schedule Shift</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
 container: {
   flexGrow: 1,
   flex: 1,
   justifyContent: 'center',
   padding: 20,
   backgroundColor: '#fff'
 },
 header: {
   fontSize: 24,
   fontWeight: 'bold',
   textAlign: 'center',
   marginBottom: 20,
   color: '#1a1a1a'
 },
 inputContainer: {
   borderWidth: 1,
   borderColor: '#ddd',
   borderRadius: 8,
   marginBottom: 20
 },
 picker: {
   height: 50,
   color: '#333'
 },
 dateContainer: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginBottom: 20,
   gap: 10
 },
 dateInput: {
   flex: 1,
   borderWidth: 1,
   borderColor: '#ddd',
   borderRadius: 8,
   padding: 12,
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center'
 },
 dateText: {
   color: '#666',
   fontSize: 16
 },
 input: {
   borderWidth: 1,
   borderColor: '#ddd',
   borderRadius: 8,
   padding: 12,
   marginBottom: 20,
   fontSize: 16,
   color: '#333'
 },
 textArea: {
   height: 100,
   textAlignVertical: 'top'
 },
 button: {
   backgroundColor: '#007AFF',
   borderRadius: 8,
   padding: 13,
   alignItems: 'center'
 },
 buttonText: {
   color: '#fff',
   fontSize: 16,
   fontWeight: '600'
 }
});


export default AddShifts
