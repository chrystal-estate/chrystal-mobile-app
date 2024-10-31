import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import AnimatedBackground from "../../components/AnimatedBackground";
import BackButton from "../../components/BackButton";
import Logo from "../../components/Logo"; // If needed
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { emailValidator } from "../../utils/emailValidator";
import FrontpageLayout from '../../layout/Frontpage';


export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    navigation.navigate("ResetLinkScreen");
  };

  return (
    <AnimatedBackground>
      <BackButton goBack={navigation.goBack} />
      
      {/* Logo can be included if required */}
      <View style={styles.logoContainer}>
        {/* <Logo /> */}
      </View>
      
      <Text style={styles.header}>Forgot Password?</Text>
      <Text style={styles.subHeader}>
        That’s okay, it happens! Enter your email below to reset your password.
      </Text>

      <TextInput
        label="Enter Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        style={styles.input}
      />

      <Button mode="contained" onPress={sendResetPasswordEmail} style={styles.submitButton}>
        <Text style={styles.buttonText}>Submit</Text>
      </Button>
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
    marginTop: 5,
  },
  input: {
    width: "100%", // Ensure inputs take full width
    marginTop: -20,
    borderRadius: 50,
    height: 64,
  },
  submitButton: {
    backgroundColor: "#7B61FF",
    borderRadius: 50,
    height: 60,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 19,
  },
});
