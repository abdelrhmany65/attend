import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ManageDashboard = ({ navigation }) => {
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

  // عدد العناصر في كل صفحة
  const itemsPerPage = 2;

  // حالات إدارة الصفحات
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  // حساب بيانات الصفحة الحالية
  const indexOfLastItem = currentPage * itemsPerPage;        // آخر عنصر في الصفحة
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;   // أول عنصر في الصفحة
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
      {/* Header Section */}
      <View style={styles.headerList}>
        <Text style={styles.headerTitle}>
            Main Employee List
        </Text>
      </View>

      {/* Search and Filter Section */}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search employee..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>All Departments</Text>
          <Icon name="arrow-drop-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* 
        ScrollView الرئيسية مع justifyContent: 'center' 
        لجعل المحتوى في منتصف الصفحة عموديًا
      */}
      <ScrollView
        contentContainerStyle={styles.mainScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Horizontal Scroll Table */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tableScrollContainer}
        >
          <View>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { width: 160 }]}>Employee Name</Text>
              <Text style={[styles.headerCell, { width: 120 }]}>Department</Text>
              <Text style={[styles.headerCell, { width: 120 }]}>Shift Start</Text>
              <Text style={[styles.headerCell, { width: 120 }]}>Shift End</Text>
              <Text style={[styles.headerCell, { width: 100 }]}>Status</Text>
              <Text style={[styles.headerCell, { width: 150 }]}>Actions</Text>
            </View>

            {/* Table Rows (يعرض بيانات الصفحة الحالية فقط) */}
            {currentEmployees.map((employee) => (
              <View key={employee.id} style={styles.tableRow}>
                <Text style={[styles.cell, { width: 160 }]}>{employee.name}</Text>
                <Text style={[styles.cell, { width: 120 }]}>{employee.department}</Text>
                <Text style={[styles.cell, { width: 120 }]}>{employee.shiftStart}</Text>
                <Text style={[styles.cell, { width: 120 }]}>{employee.shiftEnd}</Text>

                {/* Status Badge */}
                <View style={[styles.statusCell, { width: 100 }]}>
                  <View
                    style={[
                      styles.statusBadge,
                      employee.status === 'Active'
                        ? styles.activeBadge
                        : styles.inactiveBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        employee.status === 'Active'
                          ? styles.activeText
                          : styles.inactiveText,
                      ]}
                    >
                      {employee.status}
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={[styles.actionCell, { width: 150 }]}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('EditName')}
                  >
                    <Icon name="edit" size={20} color="#4CAF50" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('EditShift')}
                  >
                    <Icon name="access-time" size={20} color="#2196F3" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => console.log('Delete', employee.id)}
                  >
                    <Icon name="delete" size={20} color="#F44336" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Pagination Controls */}
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={handlePrev}
            disabled={currentPage === 1}
          >
            <Text style={styles.paginationButtonText}>Previous</Text>
          </TouchableOpacity>

          <Text style={styles.paginationText}>
            Page {currentPage} / {totalPages}
          </Text>

          <TouchableOpacity
            style={styles.paginationButton}
            onPress={handleNext}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.paginationButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  /* الحاوية الرئيسية */
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },

  headerList:{
    marginTop: 50,
    marginBottom: 20,
  },
  headerTitle:{
    fontSize: 24,
    fontWeight: 'bold',
  },

  filterContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  filterText: {
    color: '#666',
    marginRight: 4,
  },


  mainScrollContent: {
    flexGrow: 1,
    justifyContent: 'center', 

  },

  /* تنسيق التمرير الأفقي للجدول */
  tableScrollContainer: {

  },


  tableHeader: {
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
    textAlign: 'left',
    paddingHorizontal: 8,
  },


  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  cell: {
    fontSize: 14,
    color: '#495057',
    paddingHorizontal: 8,
    textAlign: 'left',
  },

  /* حالة الموظف */
  statusCell: {
    paddingHorizontal: 8,
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeBadge: {
    backgroundColor: '#E8F5E9',
  },
  inactiveBadge: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeText: {
    color: '#4CAF50',
  },
  inactiveText: {
    color: '#F44336',
  },

  actionCell: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  iconButton: {
    padding: 8,
  },

 
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationButton: {
    backgroundColor: '#000',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 10,
  },
  paginationButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  paginationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default ManageDashboard;
