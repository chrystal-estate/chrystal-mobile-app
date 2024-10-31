import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import styles from './styles'; // Import styles

const OTPInput = ({ index, value, onChange, onBackspace, nextInputRef }) => {
  const inputRef = useRef(null);

  return (
    <TextInput
      ref={inputRef}
      style={styles.otpInput}
      keyboardType="number-pad"
      maxLength={1}
      value={value}
      textContentType="oneTimeCode" // Keeps keyboard open
      onChangeText={(text) => {
        onChange(index, text);
        if (text && nextInputRef) {
          nextInputRef.current.focus(); // Auto focus on next input
        }
      }}
      onKeyPress={({ nativeEvent }) => {
        if (nativeEvent.key === 'Backspace' && value === '') {
          onBackspace(index);
        }
      }}
      returnKeyType="next"
      blurOnSubmit={false} // Prevents keyboard from closing on submit
    />
  );
};

export default OTPInput;
