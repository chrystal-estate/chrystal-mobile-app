import React, { useState, useLayoutEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { Text, Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from 'axios';

import AnimatedBackground from "../../components/AnimatedBackground";
import BackButton from "../../components/BackButton";
import Logo from "../../components/Logo"; // Your image-based logo
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import { useAuth } from "../../context/AuthContext";
import { emailValidator } from "../../utils/emailValidator";
import { passwordValidator } from "../../utils/passwordValidator";

export default function LoginScreen({ route, navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState({ value: "", error: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const { authState } = useAuth();
  const { someParam } = route.params;

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    try {
      // const response = await axios.post('https://chrystal.seqinstitute.com/api/login', {
      //   email: email.value, // Pass the email value as a string
      //   password: password.value, // Pass the password value as a string
      // });

      // console.log('Login successful:', response.data);
      
      // Automatically log in using authState
      await authState.login(email.value, password.value);
      //navigation.replace('HomeScreen'); // Navigate to HomeScreen after login

    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.response?.data || error.message);
      Alert.alert('Login Failed', error.response?.data?.message || 'Please try again.');
    }
  };

  return (
    <AnimatedBackground>
      {/* <BackButton goBack={navigation.goBack}/> */}
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <Text style={styles.header}>Welcome</Text>
      <Text style={styles.subHeader}>
        Fill in the necessary information to login.
      </Text>
      <TextInput
        label="Email Address"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        secureTextEntry={!passwordVisible}
        style={styles.input}
        right={
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="gray"
              style={{ marginRight: 8 }}
            />
          </TouchableOpacity>
        }
      />
      <View style={styles.row}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={rememberMe ? "checked" : "unchecked"}
            onPress={() => setRememberMe(!rememberMe)}
            color={theme.colors.primary}
          />
          <Text style={styles.rememberMe}>Remember me.</Text>
        </View> 
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed} style={styles.loginButton}>
         <Text style={styles.buttonText}>Login</Text>
       </Button>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.signUp}> SIGN UP</Text>
         </TouchableOpacity>
       </View> 
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "flex-start", // Align logo to the left
    marginBottom: 16,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#7B61FF",
    textAlign: "left", // Align text to the left
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 20,
    color: "#000000",
    textAlign: "left", // Align text to the left
    marginBottom: 24,
  },
  input: {
    width: "100%", // Ensure inputs take full width
    marginBottom: -10,
    borderRadius: 50,
    height: 64,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMe: {
    fontSize: 14,
    marginLeft: 0,
    color: "#0068C8",
  },
  forgotPassword: {
    color: "#0068C8",
    fontWeight: "regular",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#7B61FF",
    borderRadius: 50,
    height: 60,
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 19,
  },
  footer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center"
  },
  footerText: {
    fontSize: 18,
  },
  signUp: {
    fontWeight: "regular",
    color: "#0068C8",
    fontSize: 18,
    marginLeft: 5,
  },
});