import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import NewsCard from '../components/NewsCard';

export default function Home() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <NewsCard />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
