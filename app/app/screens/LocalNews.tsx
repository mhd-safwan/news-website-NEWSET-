import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import newsData from '../assets/newsData.json';

export default function BreakingCard() {
  return (
    <View style={styles.container}>
      {newsData.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.contentContainer}>
            <Image source={{ uri: item.img }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{item.des}</Text>
              </View>
              <View style={styles.footer}>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eaeaea',
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#888',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 120,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    paddingLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  category: {
    fontSize: 12,
    color: '#007bff',
    fontWeight: 'bold',
  },
  source: {
    fontSize: 12,
    color: '#999',
  },
});
