import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AnimatedBackground from "../../components/AnimatedBackground";
import BackButton from "../../components/BackButton";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import FrontpageLayout from '../../layout/Frontpage';

export default function CompanyDetailsScreen({ navigation }) {
  const [companyName, setCompanyName] = useState({ value: "", error: "" });
  const [numberOfLocations, setNumberOfLocations] = useState({ value: "", error: "" });
  const [address, setAddress] = useState({ value: "", error: "" });
  const [coverage, setCoverage] = useState({ value: "", error: "" });
  const [type, setType] = useState({ value: "", error: "" });

  const validateInputs = () => {
    let isValid = true;

    if (!companyName.value) {
      setCompanyName({ ...companyName, error: "Company name is required" });
      isValid = false;
    }
    if (!numberOfLocations.value) {
      setNumberOfLocations({ ...numberOfLocations, error: "Number of locations is required" });
      isValid = false;
    }
    if (!address.value) {
      setAddress({ ...address, error: "Address is required" });
      isValid = false;
    }
    if (!coverage.value) {
      setCoverage({ ...coverage, error: "Coverage is required" });
      isValid = false;
    }
    if (!type.value) {
      setType({ ...type, error: "Type is required" });
      isValid = false;
    }

    return isValid;
  };

  const onSubmitPressed = () => {
    if (validateInputs()) {
      console.log("All inputs validated successfully!");
      navigation.navigate("AgentRegistrationSuccess")
    }
  };

  return (
    <FrontpageLayout>
      <AnimatedBackground>
        <BackButton goBack={navigation.goBack} />
        <Text style={styles.header}>Company Details</Text>
        <Text style={styles.subHeader}>
            Complete your agent profile.
        </Text>

        <TextInput
          label="Company Name"
          returnKeyType="next"
          value={companyName.value}
          onChangeText={(text) => setCompanyName({ value: text, error: "" })}
          error={!!companyName.error}
          errorText={companyName.error}
          style={styles.input}
        />
        <TextInput
          label="No. of Locations"
          returnKeyType="next"
          value={numberOfLocations.value}
          onChangeText={(text) => setNumberOfLocations({ value: text, error: "" })}
          error={!!numberOfLocations.error}
          errorText={numberOfLocations.error}
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
          returnKeyType="done"
          value={type.value}
          onChangeText={(text) => setType({ value: text, error: "" })}
          error={!!type.error}
          errorText={type.error}
          style={styles.input}
        />
        <Text style={styles.exampleText}>Example: house, townhouse, unit, land.</Text>

        <Button mode="contained" onPress={onSubmitPressed} style={styles.submitButton}>
          <Text style={styles.buttonText}>Register</Text>
        </Button>
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
  submitButton: {
    backgroundColor: "#7B61FF",
    borderRadius: 24,
    marginTop: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
