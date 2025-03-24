import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getEmployeeById, deleteEmployee } from "../../services/employeeService";
import Toast from "react-native-toast-message";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

const EmployeeDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { employeeId } = route.params;
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(employeeId);
        setEmployee(data);
      } catch (error) {
        console.error("خطأ في جلب بيانات الموظف:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  const handleDelete = async () => {
    Alert.alert("تأكيد الحذف", "هل أنت متأكد من رغبتك في حذف هذا الموظف؟", [
      { text: "إلغاء", style: "cancel" },
      {
        text: "حذف",
        onPress: async () => {
          try {
            await deleteEmployee(employeeId);
            Toast.show({ type: "success", text1: "تم الحذف بنجاح" });
            navigation.goBack();
          } catch (error) {
            Toast.show({ type: "error", text1: "فشل الحذف" });
          }
        },
        style: "destructive",
      },
    ]);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#2E86C1" style={styles.loader} />;
  }

  if (!employee) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>لا توجد بيانات للموظف</Text>
      </View>
    );
  }

  const renderDetail = (icon, label, value) => (
    <View style={styles.detailContainer}>
      <Ionicons name={icon} size={22} color="#007BFF" />
      <Text style={styles.detail}>{label}: {value || "غير متوفر"}</Text>
    </View>
  );

  // استخراج آخر شيفت يحتوي على موقع
  const latestShift = employee.shifts?.length > 0 ? employee.shifts[employee.shifts.length - 1] : null;
  const latestLocation = latestShift?.location;

  return (
    <View style={styles.container}>
      {renderDetail("person-outline", "الاسم", employee.name)}
      {renderDetail("business-outline", "القسم", employee.department)}
      {renderDetail("mail-outline", "البريد الإلكتروني", employee.email)}
      {renderDetail("call-outline", "الهاتف", employee.phone)}

      {/* عرض الخريطة فقط إذا كان هناك موقع */}
      {latestLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latestLocation.latitude,
            longitude: latestLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: latestLocation.latitude,
              longitude: latestLocation.longitude,
            }}
            title="آخر موقع للموظف"
          />
        </MapView>
      ) : (
        renderDetail("location-outline", "الموقع", "غير متوفر")
      )}

      {employee.shifts?.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>الورديات:</Text>
          <FlatList
            data={employee.shifts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.shiftContainer}>
                {renderDetail("calendar-outline", "التاريخ", item.date)}
                {renderDetail("time-outline", "البداية", item.start)}
                {renderDetail("time-outline", "النهاية", item.end)}
              </View>
            )}
          />
        </>
      ) : (
        <Text style={styles.detail}>لا توجد ورديات مسجلة</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditUsers", { id: employeeId })}
        >
          <MaterialIcons name="edit" size={20} color="#fff" />
          <Text style={styles.buttonText}>تعديل</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shiftButton}
          onPress={() => navigation.navigate("EditShifts", { employeeId })}
        >
          <Ionicons name="time-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>تعديل الورديات</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <MaterialIcons name="delete" size={20} color="#fff" />
          <Text style={styles.buttonText}>حذف</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#FAFAFA", 
    paddingTop: 50 
  },
  loader: { 
    flex: 1, 
    justifyContent: "center" 
  },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 20, 
    color: "#007BFF",
    fontFamily: 'Cairo' 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: "600", 
    marginVertical: 15, 
    color: "#007BFF",
    textAlign: 'right',
    fontFamily: 'Cairo' 
  },
  detailContainer: { 
    flexDirection: "row-reverse", 
    alignItems: "center", 
    backgroundColor: "#FFF", 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10, 
    shadowColor: "#000", 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 3 
  },
  detail: { 
    fontSize: 16, 
    marginRight: 10, 
    color: "#333", 
    fontWeight: "500",
    fontFamily: 'Cairo',
    textAlign: 'right'
  },
  shiftContainer: { 
    backgroundColor: "#F0F8FF", 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 15 
  },
  errorText: { 
    fontSize: 18, 
    color: "red", 
    textAlign: "center",
    fontFamily: 'Cairo' 
  },
  buttonContainer: { 
    flexDirection: "row-reverse", 
    justifyContent: "space-around", 
    marginTop: 30 
  },
  editButton: { 
    flexDirection: "row-reverse", 
    alignItems: "center", 
    backgroundColor: "#007BFF", 
    padding: 12, 
    borderRadius: 8 
  },
  shiftButton: { 
    flexDirection: "row-reverse", 
    alignItems: "center", 
    backgroundColor: "#28A745", 
    padding: 12, 
    borderRadius: 8 
  },
  deleteButton: { 
    flexDirection: "row-reverse", 
    alignItems: "center", 
    backgroundColor: "#DC3545", 
    padding: 12, 
    borderRadius: 8 
  },
  buttonText: { 
    fontSize: 16, 
    color: "#fff", 
    marginRight: 8, 
    fontWeight: "bold",
    fontFamily: 'Cairo' 
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default EmployeeDetailsScreen;