import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LoginButton from './Loginout';
import SearchBar from './Serch';

export default function More({ navigation }) {
  const categories = [
    { name: 'Breaking News', screen: 'BreakingNews' },
    { name: 'Business', screen: 'Business' },
    { name: 'Sports', screen: 'SportsScreen' }
  ];

  return (
    <View style={styles.container}>
      <LoginButton />
      <SearchBar />

      <Text style={styles.title}>Get better News</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.category}
            onPress={() => navigation.navigate(category.screen)}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
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
