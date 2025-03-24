import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TitleHeader from '../../components/TitleHeader';
import SearchFilter from '../../components/Employee/SearchFilter';
import EmployeeTable from '../../components/Employee/EmployeeTable';
import Pagination from '../../components/Employee/Pagination';
import { getEmployees, deleteEmployee } from '../../services/employeeService';
import Toast from 'react-native-toast-message';

const MainList = ({ navigation }) => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('الكل');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // دالة لجلب بيانات الموظفين
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setAllEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      console.error("خطأ في جلب بيانات الموظفين:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEmployees();
    }, [])
  );

  // البحث والفلترة
  useEffect(() => {
    const filtered = allEmployees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesDepartment = selectedDepartment === 'الكل' || emp.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
    setFilteredEmployees(filtered);
    setCurrentPage(1);
  }, [searchText, selectedDepartment, allEmployees]);

  // حساب الباجينيشن
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

  // دالة حذف الموظف
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees(); 
      Toast.show({
        type: "success",
        text1: "تم الحذف",
        text2: "تم حذف الموظف بنجاح",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "فشل الحذف",
        text2: "حدث خطأ أثناء محاولة حذف الموظف",
      });
    }
  };

  return (
    <View style={styles.container}>
      <TitleHeader title="القائمة الرئيسية للموظفين" />
      
      <SearchFilter 
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <EmployeeTable
            data={currentEmployees} 
            onEdit={(id) => navigation.navigate('EditUsers', { id })}
            onShift={(employeeId) => {
              const employee = allEmployees.find(e => e.id === employeeId);
              
              if (!employee?.shifts || employee.shifts.length === 0) {
                Toast.show({
                  type: "info",
                  text1: "لا يوجد ورديات",
                  text2: "يرجى إنشاء وردية جديدة قبل التعديل",
                });
                return;
              }
            
              navigation.navigate('EditShifts', { 
                employeeId,
                shiftId: employee.shifts[0].id 
              });
            }}
            
            onDelete={handleDelete}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            onNext={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          />
        </ScrollView>
      )}
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