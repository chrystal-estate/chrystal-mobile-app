import React from 'react';
import { View, StyleSheet } from 'react-native';
import SuccessImage from '../../components/SuccessImage'; // New component for the image
import MessageText from '../../components/MessageText'; // New component for the message text
import Button from '../../components/Button'; // Reuse the button component from LoginScreen
import FrontpageLayout from '../../layout/Frontpage';
import AnimatedBackground from '../../components/AnimatedBackground';

export default function OTPSuccessScreen({ route, navigation }) {
  const { accountType } = route.params; // Get account type from route params

  const handleOkayPress = async () => {
    // Navigate based on account type
    if (accountType === 'Buyer') {
        await authState.login(email.value, password.value);
    } else if (accountType === 'Agent') {
      navigation.navigate('AgentRegistrationScreen', { accountType }); // Navigate to Agent Registration for agents
      console.log(accountType)
    } else {
      navigation.navigate('LoginScreen', { someParam: "yourValue" }); // Fallback navigation if accountType is not recognized
    }
  };

  return (
    <FrontpageLayout>
      <AnimatedBackground>
        <View style={styles.container}>
          {/* Success Image */}
          <SuccessImage source={require('../../../assets/items/check.png')} />
          
          {/* Message Text */}
          <MessageText text={`Verification\nSuccessful`} />

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
});
