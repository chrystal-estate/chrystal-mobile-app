import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default function MapSearchField ({ searchValue, onSearchChange, onClear }) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchValue}
        onChangeText={onSearchChange}
      />
      {searchValue ? (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Ionicons name="close" size={20} color="#aaa" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
