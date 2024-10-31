import React, { useState, useLayoutEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AnimatedBackground from '../../components/AnimatedBackground';
import FrontpageLayout from '../../layout/Frontpage';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput'; // Reuse TextInput
import { theme } from '../../core/theme'; // Ensure to use consistent theme

export default function NewPasswordScreen({ navigation }) {
  const [newPassword, setNewPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError(''); // Reset any previous error

    // Validate passwords
    if (newPassword.value.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword.value !== confirmPassword.value) {
      setError('Passwords do not match.');
      return;
    }

    // Simulated password reset logic
    console.log('Passwords match, proceed to reset');

    // Navigate to the success screen or show a success message
    navigation.navigate('SuccessScreen'); // Adjust this route as needed
  };

  useLayoutEffect(() => {
    // Optional: Handle side effects if needed
  }, []);

  return (
    <FrontpageLayout>
      <AnimatedBackground>
        {/* Title Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subHeader}>
            You can now enter your new password.
          </Text>
        </View>

        {/* Input Fields */}
        <TextInput
          label="New Password"
          secureTextEntry={!passwordVisible}
          value={newPassword.value}
          onChangeText={(text) => setNewPassword({ value: text, error: '' })}
          style={styles.input}
          error={!!error}
          right={
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Icon
                name={passwordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
                style={{ marginRight: 8 }}
              />
            </TouchableOpacity>
          }
        />
        <TextInput
          label="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword.value}
          onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
          style={styles.input}
          error={!!error}
          right={
            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              <Icon
                name={confirmPasswordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
                style={{ marginRight: 8 }}
              />
            </TouchableOpacity>
          }
        />

        {/* Error Message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Submit Button */}
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit
        </Button>
      </AnimatedBackground>
    </FrontpageLayout>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#7B61FF',
    textAlign: 'left',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'left',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    marginBottom: -10,
    borderRadius: 50,
  },
  button: {
    backgroundColor: '#7B61FF',
    borderRadius: 30,
    height: 48,
    justifyContent: 'center',
    marginTop: 40,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
});
