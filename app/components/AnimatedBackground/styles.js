import { StyleSheet } from 'react-native';
import { theme } from "../../core/theme";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    width: "100%",
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  scrollViewContent: {
    flexGrow: 1, // Ensures that the content takes up the full height
    justifyContent: "center", // Center content within the ScrollView
    paddingVertical: 150,
    paddingHorizontal: 20,
    height: "100vh",
    width: "100vw",
  },
});

export default styles;
