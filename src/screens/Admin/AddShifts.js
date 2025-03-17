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
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddShifts = () => {
 // States
 const [leaveType, setLeaveType] = useState('');
 const [fromDate, setFromDate] = useState(new Date()); 
 const [toDate, setToDate] = useState(new Date()); 
 const [name, setName] = useState('');
 const [employeeName, setEmployeeName] = useState('');

 
 // Date Picker Controls
 const [openFromDate, setOpenFromDate] = useState(false);
 const [openToDate, setOpenToDate] = useState(false);

 // Format Date for Display
 const formatDate = (date) => {
   return date.toLocaleDateString('en-GB', {
     day: '2-digit',
     month: '2-digit',
     year: 'numeric'
   });
 };

 return (
   <ScrollView contentContainerStyle={styles.container}>
     <Text style={styles.header}>ADD Shifts</Text>

     {/*Input Name */}
     <TextInput
       style={styles.input}
       placeholder="Name"
       value={name}
       onChangeText={setName}
     />

     {/* Leave Type Picker */}
     <View style={styles.inputContainer}>
       <Picker
         selectedValue={leaveType}
         style={styles.picker}
         onValueChange={setLeaveType}
       >
         <Picker.Item label="Department" value="" />
         <Picker.Item label="Sales" value="Sales" />
         <Picker.Item label="Customer Service" value="Customer Service" />
         <Picker.Item label="user" value="user" />
       </Picker>
     </View>

     {/* Date Selection */}
     <View style={styles.dateContainer}>
       {/* From Date */}
       <TouchableOpacity 
         style={styles.dateInput} 
         // onPress={() => setOpenFromDate(true)}
       >
         <Text style={styles.dateText}>
           {formatDate(fromDate)}
         </Text>
         <Icon name="calendar-today" size={20} color="#666" />
         
         <DatePicker
           modal
           open={openFromDate}
           date={fromDate}
           mode="date"
           // onConfirm={(date) => {
           //   setOpenFromDate(false);
           //   setFromDate(date);
           // }}
           // onCancel={() => setOpenFromDate(false)}
         />
       </TouchableOpacity>

       {/* To Date */}
       <TouchableOpacity 
         style={styles.dateInput} 
         // onPress={() => setOpenToDate(true)}
       >
         <Text style={styles.dateText}>
           {formatDate(toDate)}
         </Text>
         <Icon name="calendar-today" size={20} color="#666" />
         
         <DatePicker
           modal
           open={openToDate}
           date={toDate}
           mode="date"
           minimumDate={fromDate}
           // onConfirm={(date) => {
           //   setOpenToDate(false);
           //   setToDate(date);
           // }}
           // onCancel={() => setOpenToDate(false)}
         />
       </TouchableOpacity>
     </View>

     {/* Submit Button */}
     <TouchableOpacity style={styles.button}>
       <Text style={styles.buttonText}>Submit</Text>
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
