import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Auth Screens
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import VerificationCode from '../screens/Auth/VerificationCode';

// User Screens
import ChangePassword from '../screens/User/ChangePassword';
import Dashboard from '../screens/User/Dashboard';
import LeaveRequest from '../screens/User/LeaveRequest';
import UserProfile from '../screens/User/Profile'; 
import Message from '../screens/User/Message'; 
import Calendar from '../screens/User/Calendar'; 


// Admin Screens
import ManageDashboard from '../screens/Admin/ManageDashboard';
import MainList from '../screens/Admin/MainList';
import AddShifts from '../screens/Admin/AddShifts';
import EditShifts from '../screens/Admin/EditShifts';
import AddUsers from '../screens/Admin/AddUsers';
import EditUsers from '../screens/Admin/EditUsers';

// Shared  
import Contact from '../screens/Shared/Contact';
import Language from '../screens/Shared/Language';
import Notifications from '../screens/Shared/Notifications';
import Settings from '../screens/Shared/Settings';
import PrivacyPolicy from '../screens/Shared/PrivacyPolicy';



const Stack = createStackNavigator();

const AppNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Auth Screens */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />

      {/* User Screens */}
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Calendar" component={Calendar} />
      
      {/* Admin Screens */}
      <Stack.Screen name="ManageDashboard" component={ManageDashboard} />
      <Stack.Screen name="MainList" component={MainList} />
      <Stack.Screen name="AddShifts" component={AddShifts} />
      <Stack.Screen name="EditShifts" component={EditShifts} />
      <Stack.Screen name="AddUsers" component={AddUsers} />
      <Stack.Screen name="EditUsers" component={EditUsers} />

      {/* Shared Screens */}
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="LeaveRequest" component={LeaveRequest} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      
    </Stack.Navigator>
  );
  
};

export default AppNavigator;
