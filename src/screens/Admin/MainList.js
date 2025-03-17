import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TitleHeader from '../../components/TitleHeader';
import SearchFilter from '../../components/Employee/SearchFilter';
import EmployeeTable from '../../components/Employee/EmployeeTable';
import Pagination from '../../components/Employee/Pagination';

const MainList = ({ navigation }) => {
  // بيانات الموظفين
  const employees = [
    { 
      id: 1, 
      name: 'Jane Cooper', 
      department: 'Sales', 
      shiftStart: '08:00 AM', 
      shiftEnd: '05:00 PM', 
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Floyd Miles', 
      department: 'Sales', 
      shiftStart: '08:00 AM', 
      shiftEnd: '05:00 PM', 
      status: 'Inactive' 
    },
    { 
      id: 3, 
      name: 'Ronald Richards', 
      department: 'Customer Service', 
      shiftStart: '08:00 AM', 
      shiftEnd: '05:00 PM', 
      status: 'Inactive' 
    },
    { 
      id: 4, 
      name: 'Marvin McKinney', 
      department: 'Customer Service', 
      shiftStart: '08:00 AM', 
      shiftEnd: '05:00 PM', 
      status: 'Active' 
    },
    { 
      id: 5, 
      name: 'Jerome Bell', 
      department: 'Manager', 
      shiftStart: '08:00 AM', 
      shiftEnd: '05:00 PM', 
      status: 'Active' 
    },
  ];

  // حالة البحث
  const [searchText, setSearchText] = useState('');

  // عدد العناصر في كل صفحة
  const itemsPerPage = 2;

  // حالات إدارة الصفحات
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  // حساب بيانات الصفحة الحالية
  const indexOfLastItem = currentPage * itemsPerPage; 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

  // الدوال للتحكم في الصفحات
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TitleHeader title="Main Employee List" />
      
      <SearchFilter 
        searchText={searchText}
        onSearchChange={setSearchText}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <EmployeeTable
          data={currentEmployees} 
          onEdit={(id) => navigation.navigate('EditUsers', { id })}
          onShift={(id) => navigation.navigate('EditShifts', { id })}
          onDelete={(id) => console.log('Delete', id)}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF'
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default MainList;
