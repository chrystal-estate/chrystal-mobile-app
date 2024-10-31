import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import AnimatedBackground from "../../components/AnimatedBackground";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import OTPInput from "../../components/OTPInput";
import FrontpageLayout from '../../layout/Frontpage';
import { theme } from "../../core/theme";

export default function OTPVerificationScreen({ route, navigation }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const { accountType, phone, otp: generatedOtp, messageId } = route.params; // Retrieve accountType, phone, and requestId from route params

  // Log the OTP and requestId upon navigation to this page
  useEffect(() => {
    console.log("Navigated to OTPVerificationScreen");
    console.log("Phone:", phone);
    console.log("Message ID:", messageId);
    console.log("OTP:", generatedOtp);
  }, [phone, messageId, generatedOtp ]);

  const handleInputChange = (index, value) => {
    if (/^[0-9]*$/.test(value)) { 
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const otpValue = otp.join('');
    
    if (otpValue === generatedOtp) {
      console.log("OTP verified successfully!");
      navigation.replace('OTPSuccess', { accountType });
    } else {
      console.error('Error during OTP verification:', error);
      Alert.alert('Verification Failed', 'Invalid OTP. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <FrontpageLayout>
      <AnimatedBackground>
        <BackButton goBack={navigation.goBack} />
        <View style={styles.logoContainer}>
          {/* <Logo /> */}
        </View>
        <Text style={styles.header}>OTP Verification</Text>
        <Text style={styles.subHeader}>We have sent the verification code to your mobile number.</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <OTPInput
              key={index}
              index={index}
              value={digit}
              onChange={(value) => handleInputChange(index, value)}
            />
          ))}
        </View>

        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton} disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? 'Verifying...' : 'Submit'}</Text>
        </Button>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Didn’t receive the code?</Text>
          <TouchableOpacity onPress={() => Alert.alert("OTP already sent from CreateAccountScreen")}>
            <Text style={styles.resendOtp}> Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </AnimatedBackground>
    </FrontpageLayout>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "flex-start",
    marginBottom: 16,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#7B61FF",
    textAlign: "left",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    color: "#000",
    textAlign: "left",
    marginBottom: 24,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: "#7B61FF",
    borderRadius: 24,
    height: 58,
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  footer: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "center",
  },
  footerText: {
    fontSize: 18,
  },
  resendOtp: {
    color: "#0068C8",
    fontSize: 18,
  },
});
