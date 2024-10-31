import React, { useState, useLayoutEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text, Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as NavigationService from '../../navigation/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import axios

import AnimatedBackground from "../../components/AnimatedBackground";
import BackButton from "../../components/BackButton";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import PhoneInput from "../../components/PhoneInput"; // Import your PhoneInput component
import FrontpageLayout from '../../layout/Frontpage';
import { theme } from "../../core/theme";
import { useAuth } from "../../context/AuthContext";
import { emailValidator } from "../../utils/emailValidator";
import { passwordValidator } from "../../utils/passwordValidator";
import { nameValidator } from "../../utils/nameValidator";
import { phoneValidator } from "../../utils/phoneValidator";

export default function CreateAccountScreen({ route, navigation }) {
  const [firstName, setFirstName] = useState({ value: "", error: "" });
  const [lastName, setLastName] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ countryCode: '+63', value: '', error: '', fullValue: '' });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { authState } = useAuth();
  const { accountType } = route.params;

  useLayoutEffect(() => {
    // Handle any necessary side effects
  }, []);

  const sendOTP = async (phone) => {
    try {
      const apiKey = '95b8201b'; // Your Vonage API key
      const apiSecret = 'JfftV0Acjh6fUhYr'; // Your Vonage API secret
      const from = 'Chrystal'; // Your Vonage sender name
  
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  
      // Send the OTP using the Vonage SMS API
      const response = await axios.post('https://rest.nexmo.com/sms/json', {
        api_key: apiKey,
        api_secret: apiSecret,
        to: phone,
        from: from,
        text: `Your OTP code is ${otp}`, // Customize message with the OTP
      });
  
      console.log("Response JSON:", response.data); // Log the JSON response for debugging
  
      if (response.data.messages[0].status === "0") {
        const messageId = response.data.messages[0]["message-id"];
        console.log(`OTP sent successfully to ${phone}`);
  
        // Store the OTP in AsyncStorage for verification in OTPVerificationScreen
        await AsyncStorage.setItem('otp', otp); // Store OTP temporarily (or remove if storing elsewhere)
        await AsyncStorage.setItem('messageId', messageId);
  
        return { success: true, messageId };
      } else {
        console.error("OTP Error:", response.data.messages[0].error_text);
        return { success: false, error: response.data.messages[0].error_text || "Failed to send OTP. Please try again." };
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
      return { success: false, error: "Failed to send OTP. Please try again." };
    }
  };
  

  const validateInputs = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const firstNameError = nameValidator(firstName.value);
    const lastNameError = nameValidator(lastName.value);
    const phoneError = phoneValidator(phone.fullValue);
    const confirmPasswordError = password.value !== confirmPassword.value ? "Passwords do not match" : "";

    if (emailError || passwordError || confirmPasswordError || firstNameError || lastNameError || phoneError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
      setFirstName({ ...firstName, error: firstNameError });
      setLastName({ ...lastName, error: lastNameError });
      setPhone({ ...phone, error: phoneError });
      return false;
    }
    return true;
  };

  const onSubmitPressed = async () => {
    if (!validateInputs()) return;

    console.log("All validations passed. Proceeding to OTP...");

    const otpResponse = await sendOTP(phone.fullValue);

    if (otpResponse.success) {
        console.log("OTP sent successfully!");
        navigation.navigate('OTPVerificationScreen', {
            messageId: otpResponse.messageId, // Pass messageId from OTP response
            phone: phone.fullValue, // Pass full phone value
            accountType,
            otp: otpResponse.otp // Pass the OTP from the response
        });
    } else {
        console.error("OTP Error:", otpResponse.error);
    }
};


  return (
      <AnimatedBackground>
        <BackButton goBack={navigation.goBack} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <Text style={styles.header}>Create Account</Text>
        <Text style={styles.subHeader}>
          Fill in the necessary information to register.
        </Text>
        <TextInput
          label="First Name"
          returnKeyType="next"
          value={firstName.value}
          onChangeText={(text) => setFirstName({ value: text, error: "" })}
          error={!!firstName.error}
          errorText={firstName.error}
          style={styles.input}
        />
        <TextInput
          label="Last Name"
          returnKeyType="next"
          value={lastName.value}
          onChangeText={(text) => setLastName({ value: text, error: "" })}
          error={!!lastName.error}
          errorText={lastName.error}
          style={styles.input}
        />
        <PhoneInput 
                phone={phone} 
                setPhone={setPhone}
                error={phone.error}
                style={styles.input}
            />
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
          returnKeyType="next"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
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
        <TextInput
          label="Confirm Password"
          returnKeyType="done"
          value={confirmPassword.value}
          onChangeText={(text) => setConfirmPassword({ value: text, error: "" })}
          error={!!confirmPassword.error}
          errorText={confirmPassword.error}
          secureTextEntry={!confirmPasswordVisible}
          style={styles.input}
          right={
            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              <Icon
                name={confirmPasswordVisible ? "eye-off" : "eye"}
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
              size={14}
            />
            <Text style={styles.text}>
              I agree with Krystal's{" "}
              <Text style={styles.link}>Terms</Text>{" "}and{" "}
              <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
          </View>
        </View>
        <Button mode="contained" onPress={onSubmitPressed} style={styles.loginButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </Button>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => NavigationService.navigate('LoginScreen', { someParam: 'high 5' })}>
            <Text style={styles.signUp}> LOGIN</Text>
          </TouchableOpacity>
        </View>
      </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  // Add your styles here
  logoContainer: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: "left",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  subHeader: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
  },
  input: {
    width: "100%", // Ensure inputs take full width
    marginBottom: -10,
    borderRadius: 50,
    height: 64,
    color: 'gray',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
  },
  text: {
    marginTop: 10,
    fontSize: 12,
  },
  link: {
    color: theme.colors.primary,
  },
  loginButton: {
    backgroundColor: "#7B61FF",
    borderRadius: 50,
    height: 60,
    justifyContent: "center",
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
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
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 19,
  },
});
