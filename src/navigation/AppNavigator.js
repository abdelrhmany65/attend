import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";

const AppNavigator = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth); // جلب حالة تسجيل الدخول من Redux

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthNavigator /> // إذا لم يتم تسجيل الدخول، انتقل إلى شاشات المصادقة
      ) : user?.role === "admin" ? (
        <AdminNavigator /> // إذا كان المستخدم مديرًا، انتقل إلى شاشات المدير
      ) : (
        <UserNavigator /> // إذا كان المستخدم عاديًا، انتقل إلى شاشات المستخدم
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
