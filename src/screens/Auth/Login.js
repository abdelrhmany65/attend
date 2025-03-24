import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import Toast from "react-native-toast-message";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) {

      Toast.show({
        type: "error",
        text1: "خطأ في الإدخال",
        text2: "يرجى إدخال البريد الإلكتروني وكلمة المرور",
      });
      return;
    }

    dispatch(login(email, password));
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>مرحباً، أهلاً بعودتك! 👋</Text>

        {/* حقل البريد الإلكتروني */}
        <TextInput
          style={styles.input}
          placeholder="البريد الإلكتروني"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* حقل كلمة المرور */}
        <TextInput
          style={styles.input}
          placeholder="كلمة المرور"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* تذكرني واستعادة كلمة المرور */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.rememberMeContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checked]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>تذكرني</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.optionText}>هل نسيت كلمة المرور؟</Text>
          </TouchableOpacity>
        </View>

        {/* زر تسجيل الدخول */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>تسجيل الدخول</Text>
        </TouchableOpacity>

        {/* رابط إنشاء حساب جديد */}
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signUpText}>ليس لديك حساب؟ قم بإنشاء حساب</Text>
        </TouchableOpacity>
      </View>

      {/* مكون الرسائل التوضيحية */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  contentContainer: {
    padding: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    alignItems: "center",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#007bff",
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
  },
  rememberText: {
    color: "#007bff",
  },
  optionText: {
    color: "#007bff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUpText: {
    textAlign: "center",
    color: "#007bff",
  },
});

export default Login;
