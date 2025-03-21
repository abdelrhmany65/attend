import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import TitleHeader from '../../components/TitleHeader';
import SearchFilter from '../../components/Employee/SearchFilter';
import EmployeeTable from '../../components/Employee/EmployeeTable';
import Pagination from '../../components/Employee/Pagination';
import { getEmployees } from '../../services/employeeService';

const MainList = ({ navigation }) => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // جلب البيانات من API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setAllEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // تطبيق البحث والفلترة
  useEffect(() => {
    const filtered = allEmployees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesDepartment = selectedDepartment === 'All' || emp.department === selectedDepartment;
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

  return (
    <View style={styles.container}>
      <TitleHeader title="Main Employee List" />
      
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
              if (employee?.shifts?.length > 0) {
                navigation.navigate('EditShifts', { 
                  employeeId,
                  shiftId: employee.shifts[0].id 
                });
              }
            }}
            onDelete={(id) => console.log('Delete', id)}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
