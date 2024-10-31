  import React, { useState } from 'react';
  import { View, StyleSheet, Alert } from 'react-native';
  import { Button, Text } from 'react-native-paper';
  import TextInput from "../../components/TextInput";
  import AnimatedBackground from '../../components/AnimatedBackground';
  import BackButton from '../../components/BackButton';
  import FrontpageLayout from '../../layout/Frontpage';

  export default function AgentRegistrationScreen({ navigation }) {
    const [name, setName] = useState({ value: "", error: "" });
    const [licenseNumber, setLicenseNumber] = useState({ value: "", error: "" });
    const [address, setAddress] = useState({ value: "", error: "" });
    const [coverage, setCoverage] = useState({ value: "", error: "" });
    const [type, setType] = useState({ value: "", error: "" });
    const [company, setCompany] = useState(null);

    const validateInputs = () => {
      let valid = true;

      if (!name.value) {
        setName({ ...name, error: "Full Name is required" });
        valid = false;
      }

      if (!licenseNumber.value) {
        setLicenseNumber({ ...licenseNumber, error: "License Number is required" });
        valid = false;
      }

      if (!address.value) {
        setAddress({ ...address, error: "Address is required" });
        valid = false;
      }

      if (!coverage.value) {
        setCoverage({ ...coverage, error: "Coverage is required" });
        valid = false;
      }

      if (!type.value) {
        setType({ ...type, error: "Type is required" });
        valid = false;
      }

      if (company === null) {
        Alert.alert('Error', 'Please select if you are with a company');
        valid = false;
      }

      return valid;
    };

    const handleSubmit = () => {
      console.log("Submitting...");
      console.log(company);
      
      // Validate inputs first
      if (!validateInputs()) {
        console.log("Validation failed");
        return;
      }
    
      // Check the company selection and navigate accordingly
      if (company === 'Yes') {
        console.log("Navigating to CompanyDetailsScreen");
        navigation.navigate('CompanyDetailsScreen');
      } else if (company === 'No') {
        console.log("Navigating to AgentRegistrationSuccess");
        navigation.navigate('AgentRegistrationSuccess')
      } else {
        console.log("Company selection is not valid");
      }
    };
    

    return (
      <FrontpageLayout>
        <AnimatedBackground>
          <BackButton goBack={navigation.goBack} />
          <View style={styles.container}>
            <Text style={styles.header}>Agent Registration</Text>
            <Text style={styles.subHeader}>Complete your agent profile.</Text>

            <TextInput
              label="Full Name"
              returnKeyType="next"
              value={name.value}
              onChangeText={(text) => setName({ value: text, error: "" })}
              error={!!name.error}
              errorText={name.error}
              style={styles.input}
            />
            <TextInput
              label="License Number"
              returnKeyType="next"
              value={licenseNumber.value}
              onChangeText={(text) => setLicenseNumber({ value: text, error: "" })}
              error={!!licenseNumber.error}
              errorText={licenseNumber.error}
              style={styles.input}
            />
            <TextInput
              label="Address"
              returnKeyType="next"
              value={address.value}
              onChangeText={(text) => setAddress({ value: text, error: "" })}
              error={!!address.error}
              errorText={address.error}
              style={styles.input}
            />
            <TextInput
              label="Coverage"
              returnKeyType="next"
              value={coverage.value}
              onChangeText={(text) => setCoverage({ value: text, error: "" })}
              error={!!coverage.error}
              errorText={coverage.error}
              style={styles.input}
            />
            <Text style={styles.exampleText}>Example: rural, suburban, urban.</Text>

            <TextInput
              label="Type"
              returnKeyType="next"
              value={type.value}
              onChangeText={(text) => setType({ value: text, error: "" })}
              error={!!type.error}
              errorText={type.error}
              style={styles.input}
            />
            <Text style={styles.exampleText}>Example: house, townhouse, unit, land.</Text>

            <Text style={styles.companyText}>Are you with a company?</Text>
            <View style={styles.buttonGroup}>
            <Button
  mode={company === 'Yes' ? 'contained' : 'outlined'}
  onPress={() => {
    setCompany('Yes');
    console.log(`User selected: Yes`); // Log the selection directly
  }}
  style={[styles.optionButton, company === 'Yes' && styles.selectedButton]}
>
  <Text style={[styles.optionText, company === 'Yes' && styles.selectedText]}>Yes</Text>
</Button>
<Button
  mode={company === 'No' ? 'contained' : 'outlined'}
  onPress={() => {
    setCompany('No');
    console.log(`User selected: No`); // Log the selection directly
  }}
  style={[styles.optionButton, company === 'No' && styles.selectedButton]}
>
  <Text style={[styles.optionText, company === 'No' && styles.selectedText]}>No</Text>
</Button>

            </View>

            <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
              Register
            </Button>
          </View>
        </AnimatedBackground>
      </FrontpageLayout>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    header: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#7B61FF",
      textAlign: "left",
      marginBottom: 8,
    },
    subHeader: {
      fontSize: 20,
      color: "#000000",
      textAlign: "left",
      marginBottom: 24,
    },
    input: {
      width: "100%",
      marginBottom: -10,
      borderRadius: 50,
    },
    exampleText: {
      color: '#00000080',
      fontStyle: 'italic',
    },
    companyText: {
      textAlign: 'center',
      marginVertical: 10,
      fontSize: 16,
      color: "#000000",
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    optionButton: {
      width: '48%',
      backgroundColor: '#7B61FF',
    },
    optionText: {
      color: '#FFFFFF',
    },
    selectedButton: {
      backgroundColor: '#FFFFFF',
      borderColor: '#7B61FF',
      borderWidth: 1,
    },
    selectedText: {
      color: '#7B61FF',
    },
    submitButton: {
      backgroundColor: '#7B61FF',
      paddingVertical: 10,
    },
  });
