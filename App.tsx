import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from './components/Header/Header';
import { UsateText } from './components/UsateText/UsateText';

export default function App() {
  return (
    <View style={styles.container}>
      <Header title="What do you think we..." />
      <UsateText />
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

  },
});
