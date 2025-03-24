import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LeaveRequest = () => {

  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [name, setName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  
  // تحكم بانتقاء التواريخ
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);

  // تنسيق التاريخ للعرض
  const formatDate = (date) => {
    return date.toLocaleDateString('ar-SA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleDateChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || (type === 'from' ? fromDate : toDate);
    
    if (type === 'from') {
      setShowFromDate(false);
      setFromDate(currentDate);
      if (currentDate > toDate) setToDate(currentDate);
    } else {
      setShowToDate(false);
      setToDate(currentDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>طلب إجازة</Text>

      {/* اختيار نوع الإجازة */}
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={leaveType}
          style={styles.picker}
          onValueChange={setLeaveType}
        >
          <Picker.Item label="اختر نوع الإجازة" value="" />
          <Picker.Item label="إجازة سنوية" value="annual" />
          <Picker.Item label="إجازة مرضية" value="sick" />
          <Picker.Item label="إجازة عارضة" value="casual" />
        </Picker>
      </View>

      {/* اختيار التواريخ */}
      <View style={styles.dateContainer}>
        {/* من تاريخ */}
        <TouchableOpacity 
          style={styles.dateInput} 
          onPress={() => setShowFromDate(true)}
        >
          <Text style={styles.dateText}>
            {formatDate(fromDate)}
          </Text>
          <Icon name="calendar-today" size={20} color="#666" />
          
          {showFromDate && (
            <DateTimePicker
              value={fromDate}
              mode="date"
              display="default"
              onChange={(e, d) => handleDateChange(e, d, 'from')}
              minimumDate={new Date()}
            />
          )}
        </TouchableOpacity>

        {/* إلى تاريخ */}
        <TouchableOpacity 
          style={styles.dateInput} 
          onPress={() => setShowToDate(true)}
        >
          <Text style={styles.dateText}>
            {formatDate(toDate)}
          </Text>
          <Icon name="calendar-today" size={20} color="#666" />
          
          {showToDate && (
            <DateTimePicker
              value={toDate}
              mode="date"
              display="default"
              onChange={(e, d) => handleDateChange(e, d, 'to')}
              minimumDate={fromDate}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* الحقول الأخرى */}
      <TextInput
        style={styles.input}
        placeholder="الاسم"
        value={name}
        onChangeText={setName}
        textAlign="right"
      />
      
      <TextInput
        style={styles.input}
        placeholder="اسم الموظف"
        value={employeeName}
        onChangeText={setEmployeeName} 
        textAlign="right"
      />
      
      <TextInput
        style={styles.input}
        placeholder="رقم هاتف مقدم الطلب"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        textAlign="right"
      />
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="سبب الإجازة"
        multiline
        numberOfLines={4}
        value={reason}
        onChangeText={setReason}
        textAlign="right"
        textAlignVertical="top"
      />

      {/* زر الإرسال */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>إرسال</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// الأنماط تبقى كما هي دون تغيير
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
    color: '#1a1a1a',
    fontFamily: 'Cairo',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20
  },
  picker: {
    height: 50,
    color: '#333',
    textAlign: 'right',
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
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dateText: {
    color: '#666',
    fontSize: 16,
    fontFamily: 'Cairo',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    fontFamily: 'Cairo',
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
    fontWeight: '600',
    fontFamily: 'Cairo',
  }
});

export default LeaveRequest;