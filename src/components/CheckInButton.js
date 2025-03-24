import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { checkInUser } from "../redux/slices/authSlice";

const CheckInButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleCheckIn = async () => {
    if (!user) return;

    try {
      // طلب إذن الموقع
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      // جلب الموقع الحالي
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // تحديث بيانات الحضور
      dispatch(checkInUser(user.id, latitude, longitude));
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.checkinButton} onPress={handleCheckIn}>
      <Icon name="fingerprint" size={50} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkinButton: {
    position: 'absolute',
    bottom: 100,
    left: '50%',
    marginLeft: -50,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});

export default CheckInButton;
