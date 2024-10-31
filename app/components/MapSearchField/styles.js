import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginHorizontal: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    searchIcon: {
      marginRight: 5,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    clearButton: {
      padding: 5,
    },
  });

  export default styles;