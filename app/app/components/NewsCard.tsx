import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import newsData from '../assets/newsData.json';
export default function NewsCard() {
  return (
  <View>

{newsData.map((item, index) => (
          <View key={index} style={styles.card}>
          <Image source={{ uri: item.img }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.des}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        </View>
        ))}
    
  </View>
   
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  category: {
    fontSize: 12,
    color: '#999',
  },
});
