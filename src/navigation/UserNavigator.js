import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// User Screens
import Dashboard from "../screens/User/Dashboard";
import ChangePassword from "../screens/User/ChangePassword";
import UserProfile from "../screens/User/Profile";
import Message from "../screens/User/Message";
import Calendar from "../screens/User/Calendar";
import LeaveRequest from "../screens/User/LeaveRequest";

// Shared Screens
import Contact from "../screens/Shared/Contact";
import Language from "../screens/Shared/Language";
import Notifications from "../screens/Shared/Notifications";
import Settings from "../screens/Shared/Settings";
import PrivacyPolicy from "../screens/Shared/PrivacyPolicy";

const Stack = createStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      
      
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

export default UserNavigator;
