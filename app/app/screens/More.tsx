import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import LoginButton from '../screens/Loginout';
import SearchBar from '../screens/Serch';

export default function More() {


  const categories = ['Breaking News', 'Business', 'Sports'];

  return (
    <View style={styles.container}>
      <LoginButton />
      <SearchBar />

      <Text style={styles.title}>Get better News </Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.category}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142B',
    padding: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    margin: 20,

  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  category: {
    backgroundColor: '#22223B',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
