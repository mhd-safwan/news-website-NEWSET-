import React from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import BreakingCard from  '../components/BreaingCard'

export default function BreakingNews() {
  return (
    <ScrollView >

      
      <View style={styles.container}>
      < BreakingCard/>
      </View>

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
