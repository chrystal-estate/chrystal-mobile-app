import React from 'react';
import { View, StyleSheet } from 'react-native';
import SuccessImage from '../../components/SuccessImage'; // New component for the image
import MessageText from '../../components/MessageText'; // New component for the message text
import Button from '../../components/Button'; // Reuse the button component from LoginScreen
import { Text } from 'react-native-paper';
import FrontpageLayout from '../../layout/Frontpage';
import AnimatedBackground from '../../components/AnimatedBackground';

export default function ResetLinkScreen({ navigation }) {
  
  const handleOkayPress = () => {
    navigation.navigate('LoginScreen', { someParam: "yourValue" }); // Navigate to NewPasswordScreen
  };

  return (
    <FrontpageLayout>
      <AnimatedBackground>
        <View style={styles.container}>
        {/* Success Image */}
        <SuccessImage source={require('../../../assets/items/check.png')} />
        
        {/* Message Text */}
        <MessageText text={`Your registration has\n been successfully\n submitted.`} />
        <Text style={styles.subHeader}>
        Your registration is currently under review and will be verified within 24 hours.
      </Text>


        {/* Okay Button */}
        <Button mode="contained" onPress={handleOkayPress} style={styles.button}>
          Okay!
        </Button>
      </View>
      </AnimatedBackground>
    </FrontpageLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    marginTop: 30,
  },
  subHeader: {
    fontSize: 20,
    color: "#000000",
    textAlign: "center", // Align text to the left
    marginBottom: 24,
  },
});
