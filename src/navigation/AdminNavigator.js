import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Admin Screens
import ManageDashboard from "../screens/Admin/ManageDashboard";
import MainList from "../screens/Admin/MainList";
import EmployeeDetailsScreen from "../screens/Admin/EmployeeDetailsScreen";
import AddShifts from "../screens/Admin/AddShifts";
import EditShifts from "../screens/Admin/EditShifts";
import AddUsers from "../screens/Admin/AddUsers";
import EditUsers from "../screens/Admin/EditUsers";

// Shared Screens
import ChangePassword from "../screens/User/ChangePassword";
import UserProfile from "../screens/User/Profile";
import Message from "../screens/User/Message";
import Calendar from "../screens/User/Calendar";
import LeaveRequest from "../screens/User/LeaveRequest";
import Contact from "../screens/Shared/Contact";
import Language from "../screens/Shared/Language";
import Notifications from "../screens/Shared/Notifications";
import Settings from "../screens/Shared/Settings";
import PrivacyPolicy from "../screens/Shared/PrivacyPolicy";

const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ManageDashboard" component={ManageDashboard} />
      <Stack.Screen name="MainList" component={MainList} />
      <Stack.Screen name="EmployeeDetailsScreen" component={EmployeeDetailsScreen} />
      <Stack.Screen name="AddShifts" component={AddShifts} />
      <Stack.Screen name="EditShifts" component={EditShifts} />
      <Stack.Screen name="AddUsers" component={AddUsers} />
      <Stack.Screen name="EditUsers" component={EditUsers} />
      

      {/* شاشات مشتركة */}
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="LeaveRequest" component={LeaveRequest} />

      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
